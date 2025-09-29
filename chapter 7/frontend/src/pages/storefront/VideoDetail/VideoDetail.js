import React, { useState } from "react";
import "./VideoDetail.css";
import { getYoutubeVideoId } from "../../../utils";
import Header from "../../../features/Header/Header";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

const CREATE_OR_UPDATE_RATING = gql`
  mutation Mutation($input: CreateOrUpdateRatingInput!) {
    createOrUpdateRating(input: $input) {
      _id
      rating
      userId
      videoId
    }
  }
`;

const VideoDetail = ({ data, myRating }) => {
  const [selectedRating, setSelectedRating] = useState(myRating?.rating || 0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [createOrUpdateRating] = useMutation(CREATE_OR_UPDATE_RATING);

  const handleRatingSubmit = async (selectedRating) => {
    try {
      await createOrUpdateRating({
        variables: {
          input: {
            videoId: data._id,
            rating: selectedRating,
          },
        },
      });
      setSelectedRating(selectedRating);
    } catch (err) {
      console.error("Error submitting rating:", err);
      alert("Failed to submit the rating. Please try again.");
    }
  };

  if (!data) {
    return <div className='video-detail-container'>Loading...</div>;
  }

  const { title, description, genre, averageRating, numberOfRaters, videoUrl } =
    data;

  const videoId = getYoutubeVideoId(videoUrl);

  return (
    <>
      <Header />
      <div className='video-detail-page'>
        <div className='video-frame'>
          {videoId ? (
            <iframe
              title={title}
              width='100%'
              height='100%'
              src={`https://www.youtube.com/embed/${videoId}`}
              frameBorder='0'
              allowFullScreen
            ></iframe>
          ) : (
            <p>Invalid YouTube URL</p>
          )}
        </div>
        <div className='video-info'>
          <h1 className='video-title'>{title}</h1>
          <p className='video-description'>{description}</p>
          <div className='video-genre'>
            {genre.map((g, index) => (
              <span key={index} className='genre-badge'>
                {g}
              </span>
            ))}
          </div>
          <div className='video-rating'>
            <div className='rating-stat'>
              <span>Average Rating:</span>
              {/* <span>{averageRating} / 5</span> */}
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${averageRating >= star ? "active" : ""}`}
                >
                  ★
                </span>
              ))}
            </div>
            <div className='rating-stat'>
              <span>Number of Raters:</span>
              <span>{numberOfRaters}</span>
            </div>
          </div>
          <div className='rating-input'>
            <p>Rate this video:</p>
            <div className='stars' onMouseLeave={() => setHoveredRating(0)}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${
                    (hoveredRating || selectedRating) >= star ? "active" : ""
                  }`}
                  onMouseEnter={() => setHoveredRating(star)}
                  onClick={() => handleRatingSubmit(star)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoDetail;
