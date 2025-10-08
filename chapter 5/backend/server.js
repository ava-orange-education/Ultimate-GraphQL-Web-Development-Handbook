// Import necessary modules
import { expressMiddleware } from "@as-integrations/express4"; // Middleware for integrating Apollo Server with Express
import express from "express"; // Import Express framework
import cors from "cors"; // CORS (Cross-Origin Resource Sharing) middleware for Express
import bodyParser from "body-parser"; // Middleware to parse request bodies
import startApolloServer from "./connections/apollo.js"; // Function to start Apollo Server
import connectToMongoDB from "./connections/mongo.js"; // Import the function to connect to MongoDB
import http from "http"; // HTTP module for creating HTTP server
import authenticate from "./auth/authenticate.js";
import cookieParser from "cookie-parser";

// Create an Express app
const app = express();

// Create an HTTP server instance using Express app
const httpServer = http.createServer(app);
// Connect to MongoDB
await connectToMongoDB();
// Start Apollo Server
const apolloServer = await startApolloServer(httpServer);

// Use middleware: CORS, JSON body parser, and Apollo Server's Express middleware
app.use(
  cors(),
  cookieParser(),
  bodyParser.json(),
  expressMiddleware(apolloServer, {
    context: async ({ req, res }) => {
      const user = await authenticate(req);
      return {
        req,
        res,
        user: user,
      };
    },
  })
);

// Start the HTTP server and listen on port 4000
await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Streamify API Server ready on http://localhost:4000`);
