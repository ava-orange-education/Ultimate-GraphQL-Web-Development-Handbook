// Import necessary modules
import { ApolloServer } from "@apollo/server"; // Apollo Server class for creating an instance of Apollo Server
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer"; // Plugin for draining the HTTP server
import typeDefs from "../schemas/all-schemas.js"; // GraphQL schema definitions
import resolvers from "../schemas/all-resolvers.js"; // GraphQL resolvers

// Function to start Apollo Server
const startApolloServer = async (httpServer) => {
  // Set up Apollo Server with type definitions, resolvers, and plugins
  const apolloServer = new ApolloServer({
    typeDefs, // GraphQL type definitions
    resolvers, // GraphQL resolvers
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })], // Plugin for draining HTTP server
  });

  // Start Apollo Server
  await apolloServer.start();

  // Return the Apollo Server instance
  return apolloServer;
};

// Export the function to start Apollo Server
export default startApolloServer;
