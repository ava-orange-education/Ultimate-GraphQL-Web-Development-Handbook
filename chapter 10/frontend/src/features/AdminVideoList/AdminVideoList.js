// VideoList.js
import React from "react";
import truncate from "lodash/truncate";
import "./AdminVideoList.css";
import { useNavigate } from "react-router-dom";
import { getYoutubeVideoId } from "../../utils";

const VideoList = ({ videos, loadMoreVideos }) => {
  const navigate = useNavigate();

  const handleUploadClick = () => {
    navigate("/admin/upload");
  };
  // Check if videos array is empty
  if (videos.length === 0) {
    return (
      <div className='video-list'>
        <h2>No Videos Found</h2>
        <p>Upload Videos</p>
        {/* Render an upload button here */}
        <button onClick={handleUploadClick} className='empty-screen-btn-upload'>
          Upload Video
        </button>
      </div>
    );
  }

  return (
    <div className='video-list'>
      <h2>Uploaded Videos</h2>
      <div className='video-grid'>
        {videos.map((video) => (
          <div key={video.id} className='video-item'>
            <div className='video-wrapper'>
              <iframe
                title={video.title}
                width='100%'
                height='315'
                src={`https://www.youtube.com/embed/${getYoutubeVideoId(
                  video.videoUrl
                )}`}
                frameborder='0'
                allowfullscreen
              ></iframe>
            </div>
            <div className='video-details'>
              <h3 className='video-title'>
                {truncate(video.title, { length: 25 })}
              </h3>
              <p className='video-description'>
                {truncate(video.description, { length: 100 })}
              </p>
              <p className='video-genre'>
                Genre:
                {video.genre.map((genre) => {
                  return <span key={genre}>{genre}</span>;
                })}
              </p>
              {/* Add more video details as needed */}
            </div>
          </div>
        ))}
      </div>
      {/* Load More Button */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button onClick={loadMoreVideos} className='load-more-btn'>
          Load More Videos
        </button>
      </div>
    </div>
  );
};

// // Function to extract YouTube video ID from URL
// const getYoutubeVideoId = (videoUrl) => {
//   const videoIdRegex =
//     /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
//   const match = videoUrl.match(videoIdRegex);
//   return match ? match[1] : "";
// };

export default VideoList;
