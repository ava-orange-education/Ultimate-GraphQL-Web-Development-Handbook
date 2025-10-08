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
    ref: "AdminUser",
    required: true,
    index: true,
  },
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

videoStreamSchema.statics.findByUserId = async function (userId) {
  try {
    // Fetch video streams uploaded by the specified admin user
    const videoStreams = await this.find({ uploadedBy: userId }).populate(
      "uploadedBy"
    );
    return videoStreams;
  } catch (error) {
    throw new Error(`Failed to fetch video streams: ${error.message}`);
  }
};

videoStreamSchema.statics.uploadStream = async function (input) {
  try {
    // Validate input data

    // Create a new VideoStream document
    const newVideoStream = await this.create(input);
    return newVideoStream;
  } catch (error) {
    throw new Error(`Failed to upload video stream: ${error.message}`);
  }
};

const VideoStream = mongoose.model("VideoStream", videoStreamSchema);

export default VideoStream;
