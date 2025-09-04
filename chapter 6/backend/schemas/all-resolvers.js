// Import necessary libraries for generating dummy data
import { signUpGoogle } from "../auth/signup-google.js";
import { checkLogin } from "../auth/checkLogin.js";
import VideoStream from "./mongo/video-stream.js";
import { checkAccess, ROLES } from "../auth/acl.js";

const uploadVideoStream = async (_, { input }) => {
  return await VideoStream.uploadStream(input);
};

const videoStreamsByAdmin = async (_, { userId }) => {
  return await VideoStream.findByUserId(userId);
};

const recentlyUploadedVideos = async (_, arg, ctx) => {
  const { req, res, user } = ctx;
  const { limit } = arg;
  return VideoStream.findRecentlyWatchedVideos(limit);
};
const videosByGenre = async (_, arg, ctx) => {
  const { req, res, user } = ctx;
  const { genre, limit } = arg;
  return VideoStream.findVideosByGenre(genre, limit);
};
const genresWithTopVideos = async (_, arg, ctx) => {
  const { req, res, user } = ctx;
  const { genreLimit, videoLimit } = arg;
  return VideoStream.genresWithTopVideos(genreLimit, videoLimit);
};

// GraphQL resolvers
const resolvers = {
  Mutation: {
    signUpGoogle: checkAccess(ROLES.unauthenticated, signUpGoogle),
    uploadVideoStream: checkAccess(ROLES.admin, uploadVideoStream),
  },
  Query: {
    // Resolver function for the "hello" query
    checkLogin: checkAccess(ROLES.admin, checkLogin),
    videoStreamsByAdmin: checkAccess(ROLES.authenticated, videoStreamsByAdmin),
    recentlyWatchedVideos: () => {
      // TODO: We will write this in chapter 8
      return [];
    },
    recentlyUploadedVideos: checkAccess(
      ROLES.authenticated,
      recentlyUploadedVideos
    ),
    videosByGenre: checkAccess(ROLES.authenticated, videosByGenre),
    genresWithTopVideos: checkAccess(ROLES.authenticated, genresWithTopVideos),
  },
};

export default resolvers; // Export the resolvers object
