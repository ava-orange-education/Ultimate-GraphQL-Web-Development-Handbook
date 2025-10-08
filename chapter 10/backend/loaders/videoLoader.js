import DataLoader from "dataloader";
import VideoStream from "../schemas/mongo/video-stream.js";

/**
 * DataLoader for batching VideoStream queries
 * Useful for fetching multiple videos efficiently
 */
const createVideoLoader = () => {
  return new DataLoader(async (videoIds) => {
    try {
      // Batch query all videos by their IDs
      const videos = await VideoStream.find({ _id: { $in: videoIds } });

      // Create a map for O(1) lookup
      const videoMap = new Map();
      videos.forEach((video) => videoMap.set(video._id.toString(), video));

      // Return videos in the same order as requested videoIds
      return videoIds.map((id) => videoMap.get(id.toString()) || null);
    } catch (error) {
      console.error("Error in videoLoader:", error);
      // Return array of errors matching the input array length
      return videoIds.map(() => error);
    }
  });
};

/**
 * DataLoader for batching video queries by genre
 * Useful for fetching similar videos efficiently
 */
const createVideosByGenreLoader = () => {
  return new DataLoader(async (genres) => {
    try {
      // Create a map to store results by genre
      const resultMap = new Map();

      // Query videos for all unique genres
      const uniqueGenres = [...new Set(genres)];

      for (const genre of uniqueGenres) {
        const videos = await VideoStream.find({
          genre: { $in: [genre] },
        }).limit(10);
        resultMap.set(genre, videos);
      }

      // Return results in the same order as requested genres
      return genres.map((genre) => resultMap.get(genre) || []);
    } catch (error) {
      console.error("Error in videosByGenreLoader:", error);
      return genres.map(() => error);
    }
  });
};

export { createVideoLoader, createVideosByGenreLoader };
