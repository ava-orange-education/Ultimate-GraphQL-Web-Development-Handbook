// src/components/VideoCard.js
import React from "react";
import { Link } from "react-router-dom";
import "./VideoCard.css";

const VideoCard = ({ video }) => {
  const { _id, title, description, thumbnailUrl } = video;
  return (
    <div className='video-card'>
      <Link className='video-link' to={`/video/${_id}`}>
        <img src={thumbnailUrl} alt={title} className='video-thumbnail' />
        <div className='video-details'>
          <h3 className='video-title'>{title}</h3>
          <p className='video-description'>{description}</p>
        </div>
      </Link>
    </div>
  );
};

export default VideoCard;
