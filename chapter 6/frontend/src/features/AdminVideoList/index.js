// Import necessary dependencies
import React from "react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import VideoList from "./AdminVideoList";
import { getJsonFromLocalStorage } from "../../utils";

const user = getJsonFromLocalStorage("user");

// Define the GraphQL query operation
const VIDEO_STREAMS_QUERY = gql`
  query Query($userId: ID!) {
    videoStreamsByAdmin(userId: $userId) {
      _id
      createdDate
      description
      genre
      thumbnailUrl
      updatedDate
      uploadedBy {
        firstName
        id
        lastName
      }
      videoUrl
      title
    }
  }
`;

const VideoListContainer = () => {
  const userId = user?.id;
  // Call the useQuery hook to fetch data from the GraphQL server
  const { loading, error, data } = useQuery(VIDEO_STREAMS_QUERY, {
    variables: { userId },
    fetchPolicy: "cache-and-network",
  });

  // Handle loading and error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log("VideoData", data);
  // Render the VideoList component with the fetched data
  return <VideoList videos={data.videoStreamsByAdmin} />;
};

export default VideoListContainer;
