// Import necessary dependencies
import React from "react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import Home from "./Home";

const HomePageQuery = gql`
  query ($genreLimit: Int, $limit: Int) {
    recentlyWatchedVideos {
      _id
      createdDate
      description
      thumbnailUrl
      updatedDate
      title
    }
    recentlyUploadedVideos(limit: $limit) {
      _id
      createdDate
      description
      thumbnailUrl
      updatedDate
      title
    }
    genresWithTopVideos(genreLimit: $genreLimit) {
      genre
      topVideos {
        _id
        createdDate
        description
        thumbnailUrl
        updatedDate
        title
      }
    }
  }
`;

const HomePage = () => {
  // Call the useQuery hook to fetch data from the GraphQL server
  const { loading, error, data } = useQuery(HomePageQuery, {
    variables: { genreLimit: 10, limit: 10 },
  });

  // Handle loading and error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log("VideoData", data);

  return <Home data={data}></Home>;
};

export default HomePage;
