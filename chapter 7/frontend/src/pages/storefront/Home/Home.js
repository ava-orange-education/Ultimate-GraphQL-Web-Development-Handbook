// src/pages/storefront/HomePage.js

import React from "react";
// Imported Components..
import EmptyScreen from "../../../elements/EmptyScreen";
import Header from "../../../features/Header/Header";
import VideoCard from "../../../elements/VideoCard/VideoCard";

import "./HomePage.css";

const HomePage = ({ data }) => {
  const { genresWithTopVideos, recentlyUploadedVideos, recentlyWatchedVideos } =
    data;
  return (
    <>
      <Header />
      <div className='container homepage'>
        <main className='main-content'>
          {recentlyWatchedVideos && recentlyWatchedVideos.length > 0 && (
            <section className='featured'>
              <h2 className='video-title'>Recently Watched</h2>
              <EmptyScreen
                message={"No featured videos available at the moment."}
              />
            </section>
          )}

          {genresWithTopVideos &&
            genresWithTopVideos.length > 0 &&
            genresWithTopVideos?.map(({ genre, topVideos }, index) => {
              return (
                <section key={index} className='categories'>
                  <h2 className='video-title'>{genre} Videos</h2>
                  <div className='video-container'>
                    {topVideos.map((video) => {
                      return (
                        <VideoCard key={video._id} video={video}></VideoCard>
                      );
                    })}
                  </div>
                </section>
              );
            })}

          {recentlyUploadedVideos && recentlyUploadedVideos.length > 0 && (
            <section className='categories'>
              <h2 className='video-title'>Recently Uploaded</h2>
              <div className='video-container'>
                {recentlyUploadedVideos.map((video) => {
                  return <VideoCard key={video._id} video={video}></VideoCard>;
                })}
              </div>
            </section>
          )}
        </main>
        <footer className='footer'>
          <p>&copy; 2024 Streamify. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
};

export default HomePage;
