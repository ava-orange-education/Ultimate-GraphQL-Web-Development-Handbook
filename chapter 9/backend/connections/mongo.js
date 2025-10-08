// Import necessary modules
import mongoose from "mongoose";
import "../config.js";

// MongoDB connection URL
const MONGODB_URI = process.env.MONGODB_URI; // Use environment variable for MongoDB URI

// Function to connect to MongoDB using Mongoose
const connectToMongoDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {});
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

// Export the function to connect to MongoDB
export default connectToMongoDB;
