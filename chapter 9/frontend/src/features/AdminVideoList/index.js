// Import necessary dependencies
import React from "react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import VideoList from "./AdminVideoList";
import { getJsonFromLocalStorage } from "../../utils";

const user = getJsonFromLocalStorage("user");

// Define the GraphQL query operation
const VIDEO_STREAMS_QUERY = gql`
  query VideoStreamsByAdmin($offset: Int, $limit: Int) {
    videoStreamsByAdmin(offset: $offset, limit: $limit) {
      _id
      title
      videoUrl
      thumbnailUrl
      description
      genre
      createdDate
      updatedDate
      uploadedBy {
        id
        firstName
        lastName
      }
    }
  }
`;

const VideoListContainer = () => {
  // const userId = user?.id;
  // Call the useQuery hook to fetch data from the GraphQL server
  const { loading, error, data, fetchMore } = useQuery(VIDEO_STREAMS_QUERY, {
    variables: { offset: 0, limit: 5 },
  });

  const loadMoreVideos = () => {
    fetchMore({
      variables: {
        offset: data?.videoStreamsByAdmin?.length || 0,
        limit: 5,
      },
    });
  };

  // Handle loading and error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log("VideoData", data);
  // Render the VideoList component with the fetched data
  return (
    <VideoList
      videos={data.videoStreamsByAdmin}
      loadMoreVideos={loadMoreVideos}
    />
  );
};

export default VideoListContainer;
