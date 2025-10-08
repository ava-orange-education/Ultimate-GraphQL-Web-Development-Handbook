// Import necessary modules
import { ApolloServer } from "@apollo/server"; // Apollo Server class for creating an instance of Apollo Server
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer"; // Plugin for draining the HTTP server
import { ApolloServerPluginCacheControl } from "@apollo/server/plugin/cacheControl";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { PubSub } from "graphql-subscriptions";
import typeDefs from "../schemas/all-schemas.js"; // GraphQL schema definitions
import resolvers from "../schemas/all-resolvers.js"; // GraphQL resolvers
import createUserLoader from "../loaders/userLoader.js";
import {
  createVideoLoader,
  createVideosByGenreLoader,
} from "../loaders/videoLoader.js";

// Create PubSub instance for subscriptions
export const pubsub = new PubSub();

// Function to start Apollo Server
const startApolloServer = async (httpServer) => {
  // Create executable schema for WebSocket server
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  console.log(
    "✅ Using Apollo Server v5 with HTTP cache headers for CDN/browser caching"
  );

  // Set up WebSocket server for subscriptions
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });

  // Configure WebSocket server with GraphQL subscriptions
  const serverCleanup = useServer(
    {
      schema,
      context: async (ctx, msg, args) => {
        // You can add authentication logic here for subscriptions
        return {
          pubsub,
          userLoader: createUserLoader(),
          videoLoader: createVideoLoader(),
          videosByGenreLoader: createVideosByGenreLoader(),
        };
      },
    },
    wsServer
  );

  // Set up Apollo Server with type definitions, resolvers, and plugins
  const apolloServer = new ApolloServer({
    schema,
    // No server-side cache needed - CDNs and browsers handle HTTP caching
    plugins: [
      // Cache Control Plugin - generates HTTP cache headers for CDN/browser caching
      ApolloServerPluginCacheControl({
        defaultMaxAge: 60, // Default cache time in seconds
        calculateCacheControlHeaders: true, // Send cache headers to client
      }),

      // HTTP Server drain plugin
      ApolloServerPluginDrainHttpServer({ httpServer }),

      // WebSocket cleanup plugin
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  // Start Apollo Server
  await apolloServer.start();

  // Return the Apollo Server instance
  return apolloServer;
};

// Export the function to start Apollo Server
export default startApolloServer;
