/**
 * @author Robins Gupta
 * @email robgpta@gmail.com
 * @create date 2024-04-27 20:12:38
 * @modify date 2024-04-27 20:12:38
 * @desc [description]
 */
import mongoose from "mongoose";

const videoStreamSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  genre: {
    type: [String],
    required: true,
    index: true,
  },
  thumbnailUrl: {
    type: String,
    required: true,
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  totalRating: { type: Number, default: 0 },
  numberOfRaters: { type: Number, default: 0 },
  averageRating: { type: Number, default: 0 },
  createdDate: {
    type: Date,
    default: Date.now,
    index: true,
  },
  updatedDate: {
    type: Date,
    default: Date.now,
  },
});

// Update the 'updatedDate' field before saving the document
videoStreamSchema.pre("save", function (next) {
  this.updatedDate = new Date();
  next();
});

videoStreamSchema.statics.findByUserId = async function (
  userId,
  offset = 0,
  limit = 10
) {
  try {
    const videoStreams = await this.find({ uploadedBy: userId })
      .skip(offset)
      .limit(limit)
      .populate("uploadedBy");

    return videoStreams;
  } catch (error) {
    throw new Error(`Failed to fetch video streams: ${error.message}`);
  }
};

videoStreamSchema.statics.genresWithTopVideos = async function (
  genreLimit = 10,
  videoLimit = 10
) {
  const allGenres = await this.distinct("genre");
  return allGenres.slice(0, genreLimit).map((genre) => {
    const topVideos = this.findVideosByGenre(genre, videoLimit);
    return {
      genre,
      topVideos,
    };
  });
};

videoStreamSchema.statics.findVideosByGenre = async function (
  genre,
  limit = 10
) {
  try {
    // Fetch video streams uploaded by the specified admin user
    const videoStreams = await this.find({ genre }).limit(limit);
    return videoStreams;
  } catch (error) {
    throw new Error(`Failed to fetch video streams: ${error.message}`);
  }
};

videoStreamSchema.statics.findRecentlyUploadedVideos = async function (
  limit = 10
) {
  try {
    // Fetch video streams uploaded by the specified admin user
    const videoStreams = await this.find()
      .limit(limit)
      .sort({ createdDate: -1 });
    return videoStreams;
  } catch (error) {
    throw new Error(`Failed to fetch video streams: ${error.message}`);
  }
};

videoStreamSchema.statics.findRecentlyWatchedVideos = async function (
  loggeduserId,
  limit = 10
) {
  try {
    // Fetch video streams uploaded by the specified admin user
    const videoStreams = await this.find()
      .limit(limit)
      .sort({ createdDate: -1 });
    return videoStreams;
  } catch (error) {
    throw new Error(`Failed to fetch video streams: ${error.message}`);
  }
};

videoStreamSchema.statics.uploadStream = async function (input) {
  try {
    // Validate input data

    // Create a new VideoStream document
    const genre = input.genre?.map((item) => {
      return item.trim();
    });
    input = {
      ...input,
      genre,
    };

    const newVideoStream = await this.create(input);
    return newVideoStream;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to upload video stream: ${error.message}`);
  }
};

const VideoStream = mongoose.model("VideoStream", videoStreamSchema);

export default VideoStream;
