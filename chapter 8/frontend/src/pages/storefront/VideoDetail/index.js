import VideoDetail from "./VideoDetail";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useParams } from "react-router";

const VideoDetailQuery = gql`
  query FetchVideobyId($videoId: ID!, $limit: Int) {
    fetchVideobyId(id: $videoId) {
      _id
      averageRating
      description
      genre
      numberOfRaters
      thumbnailUrl
      title
      totalRating
      videoUrl
    }
    getSimilarVideos(videoId: $videoId, limit: $limit) {
      _id
      averageRating
      description
      genre
      numberOfRaters
      thumbnailUrl
      title
      totalRating
      videoUrl
    }
    getPersonalizedVideos {
      _id
      averageRating
      description
      genre
      numberOfRaters
      thumbnailUrl
      title
      totalRating
      videoUrl
    }
    fetchRating(videoId: $videoId) {
      _id
      rating
      userId
      videoId
    }
  }
`;

const VideoDetailWithData = () => {
  const params = useParams();

  const { loading, data } = useQuery(VideoDetailQuery, {
    variables: { videoId: params.videoId, limit: 10 },
  });
  if (!loading && data?.fetchVideobyId) {
    return (
      <VideoDetail
        data={data?.fetchVideobyId}
        similarVideos={data?.getSimilarVideos}
        getPersonalizedVideos={data?.getPersonalizedVideos}
        myRating={data?.fetchRating}
      />
    );
  }
  return <div>Loading...</div>;
};

export default VideoDetailWithData;
