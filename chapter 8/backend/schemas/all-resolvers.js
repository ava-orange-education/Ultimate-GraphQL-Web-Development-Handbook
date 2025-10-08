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
  return VideoStream.findRecentlyUploadedVideos(limit);
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

const recentlyWatchedVideos = async (_, { arg }, { user }) => {
  // Step 1: Fetch the user's most recent ratings
  const recentlyRatedVideos = await Rating.find({
    userId: user._id,
  })
    .sort({ createdDate: -1 }) // Sort by most recent ratings
    .limit(10); // Limit to the last 10 ratings

  // Extract video IDs from the recently rated videos
  const videoIds = recentlyRatedVideos.map((rating) => rating.videoId);

  // Step 2: Fetch video details using the extracted video IDs
  const videos = await VideoStream.find({
    _id: { $in: videoIds },
  });

  // Step 3: Reorder videos to match the order of videoIds
  const videoMap = new Map(
    videos.map((video) => [video._id.toString(), video])
  );
  const orderedVideos = videoIds.map((id) => videoMap.get(id.toString()));

  // Return the ordered videos
  return orderedVideos;
};

const fetchPersonalizedVideos = async (_, arg, { user }) => {
  const { limit = 10 } = arg;

  // Step 1: Fetch the user's highly rated videos
  const mostRatedVideos = await Rating.find({
    userId: user._id,
    rating: { $gte: 4 },
  })
    .sort({ createdDate: -1 })
    .limit(10);

  if (!mostRatedVideos || mostRatedVideos?.length === 0) {
    return [];
  }

  const recentLikedVideoIds = mostRatedVideos?.map((rating) => rating.videoId);

  // Step 2: Find other users who have rated these videos highly
  const similarUserIds = await Rating.aggregate([
    {
      $match: {
        videoId: { $in: recentLikedVideoIds },
        userId: { $ne: user._id }, // Exclude the current user
        rating: { $gte: 4 },
      },
    },
    {
      $group: {
        _id: "$userId",
      },
    },
  ]).then((result) => result.map((user) => user._id));

  // Step 3: Fetch videos rated highly by similar users, excluding already liked videos
  const otherVideos = await Rating.aggregate([
    {
      $match: {
        userId: { $in: similarUserIds },
        videoId: { $nin: recentLikedVideoIds }, // Exclude already liked videos
        rating: { $gte: 4 },
      },
    },
    {
      $group: {
        _id: "$videoId", // Group by videoId
        ratingCount: { $sum: 1 }, // Count how many users rated this video highly
      },
    },
    {
      $lookup: {
        from: "videostreams", // Collection name for VideoStream
        localField: "_id",
        foreignField: "_id",
        as: "videoDetails",
      },
    },
    {
      $unwind: "$videoDetails", // Flatten the videoDetails array
    },
    {
      $sort: { "videoDetails.createdDate": -1 }, // Sort by createdDate in descending order
    },
    {
      $limit: limit, // Limit the results to the specified number
    },
  ]);

  // Step 4: Extract video details to return
  return otherVideos.map((video) => video.videoDetails);
};

const fetchSimilarVideos = async (_, arg, ctx) => {
  const { videoId, limit = 10 } = arg;
  const currentVideo = await VideoStream.findById(videoId);
  if (!currentVideo) {
    throw new Error("Video not found");
  }
  // Query for similar videos with the same genre
  const similarVideos = await VideoStream.find({
    genre: {
      $in: currentVideo.genre,
    },
    _id: { $ne: videoId }, // Exclude the current video
  })
    .sort({ averageRating: -1 }) // Sort by highest ratings
    .limit(limit);
  return similarVideos;
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
    recentlyWatchedVideos: checkAccess(
      ROLES.authenticated,
      recentlyWatchedVideos
    ),
    recentlyUploadedVideos: checkAccess(
      ROLES.authenticated,
      recentlyUploadedVideos
    ),
    videosByGenre: checkAccess(ROLES.authenticated, videosByGenre),
    genresWithTopVideos: checkAccess(ROLES.authenticated, genresWithTopVideos),
    fetchVideobyId: checkAccess(ROLES.authenticated, fetchVideoById),
    getSimilarVideos: checkAccess(ROLES.authenticated, fetchSimilarVideos),
    getPersonalizedVideos: checkAccess(
      ROLES.authenticated,
      fetchPersonalizedVideos
    ),
  },
};

export default resolvers; // Export the resolvers object
