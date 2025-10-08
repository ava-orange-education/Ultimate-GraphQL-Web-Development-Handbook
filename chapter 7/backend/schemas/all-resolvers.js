// Import necessary libraries for generating dummy data
import { signUpGoogle } from "../auth/signup-google.js";
import { checkLogin } from "../auth/checkLogin.js";
import VideoStream from "./mongo/video-stream.js";
import { checkAccess, ROLES } from "../auth/acl.js";
import Rating from "./mongo/rating.js";

const fetchRating = async (_, { videoId }, { user }) => {
  if (!user) {
    throw new Error("Unauthorized. Please log in.");
  }
  return Rating.findOne({ videoId, userId: user._id });
};

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

const fetchVideoById = (_, arg, ctx) => {
  const { req, res, user } = ctx;
  const { id } = arg;
  return VideoStream.findById(id);
};

// Resolver functions
const createOrUpdateRating = async (_, { input }, { user }) => {
  const { videoId, rating } = input;
  // Check if the user has already rated the video
  const existingRating = await Rating.findOne({ videoId, userId: user._id });
  if (existingRating) {
    const updatedRating = await Rating.updateUserRating(
      videoId,
      rating,
      existingRating
    );
    return updatedRating;
  }

  // Create a new rating for the video
  const newRating = await Rating.createUserRating(videoId, user._id, rating);
  return newRating;
};

// GraphQL resolvers
const resolvers = {
  Mutation: {
    signUpGoogle: checkAccess(ROLES.unauthenticated, signUpGoogle),
    uploadVideoStream: checkAccess(ROLES.admin, uploadVideoStream),
    createOrUpdateRating: checkAccess(
      ROLES.authenticated,
      createOrUpdateRating
    ),
  },
  Query: {
    // Resolver function for the "hello" query
    checkLogin: checkAccess(ROLES.authenticated, checkLogin),
    videoStreamsByAdmin: checkAccess(ROLES.authenticated, videoStreamsByAdmin),
    fetchRating: checkAccess(ROLES.authenticated, fetchRating),
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
    fetchVideobyId: checkAccess(ROLES.authenticated, fetchVideoById),
  },
};

export default resolvers; // Export the resolvers object
