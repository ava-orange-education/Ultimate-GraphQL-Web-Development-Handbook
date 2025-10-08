// backend/schemas/mongo/rating.js
import mongoose from "mongoose";
import VideoStream from "./video-stream.js";

const ratingSchema = new mongoose.Schema({
  videoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "VideoStream",
    required: true,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
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

// Index to ensure a user can rate a video only once
ratingSchema.index({ videoId: 1, userId: 1 }, { unique: true });

// Rating model methods
ratingSchema.statics.createUserRating = async function (
  videoId,
  userId,
  ratingValue
) {
  // Create a new rating for the user and video
  const newRating = await this.create({ videoId, userId, rating: ratingValue });
  // Fetch the current video document
  const video = await VideoStream.findById(videoId);
  if (!video) return;
  const totalRating = video.totalRating;
  const numberOfRaters = video.numberOfRaters;
  await VideoStream.findByIdAndUpdate(
    videoId,
    {
      $inc: { totalRating: ratingValue, numberOfRaters: 1 },
      $set: {
        averageRating: (totalRating + ratingValue) / (numberOfRaters + 1),
      },
    },
    { new: true }
  );

  return newRating;
};

ratingSchema.statics.updateUserRating = async function (
  videoId,
  ratingValue,
  oldRatingObj
) {
  const previousRatingValue = oldRatingObj.rating;
  oldRatingObj.rating = ratingValue;
  await oldRatingObj.save();
  // Update Video Stream..
  // Fetch the current video document
  const video = await VideoStream.findById(videoId);
  if (!video) return;
  const totalRating = video.totalRating;
  video.totalRating = totalRating + (ratingValue - previousRatingValue);
  const numberOfRaters = video.numberOfRaters;
  video.averageRating = video.totalRating / numberOfRaters;

  await video.save();

  return oldRatingObj;
};

export default mongoose.model("Rating", ratingSchema);
