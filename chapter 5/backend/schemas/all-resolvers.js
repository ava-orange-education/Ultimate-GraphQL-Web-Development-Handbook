// Import necessary libraries for generating dummy data
import { signUpGoogle } from "../auth/signup-google.js";
import { checkLogin } from "../auth/checkLogin.js";
import VideoStream from "./mongo/video-stream.js";

// GraphQL resolvers
const resolvers = {
  Mutation: {
    signUpGoogle: signUpGoogle,
    uploadVideoStream: async (_, { input }) => {
      return await VideoStream.uploadStream(input);
    },
  },
  Query: {
    // Resolver function for the "hello" query
    checkLogin: checkLogin,
    videoStreamsByAdmin: async (_, { userId }) => {
      return await VideoStream.findByUserId(userId);
    },
  },
};

export default resolvers; // Export the resolvers object
