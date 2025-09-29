import React, { useState } from "react";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import "./Upload.css";
import { getJsonFromLocalStorage } from "../../../utils";
import { useNavigate } from "react-router-dom";
import Header from "../../../features/Header/Header";

const user = getJsonFromLocalStorage("user");

const UPLOAD_VIDEO_STREAM = gql`
  mutation UploadVideoStream($input: UploadVideoStreamInput!) {
    uploadVideoStream(input: $input) {
      _id
      createdDate
      description
      genre
      thumbnailUrl
      updatedDate
      videoUrl
      title
    }
  }
`;

const UploadVideoForm = () => {
  const userId = user?.id;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    genre: [],
    thumbnailUrl: "",
    videoUrl: "",
    uploadedBy: userId,
  });

  const [uploadVideoStream, { loading, error }] =
    useMutation(UPLOAD_VIDEO_STREAM);

  const navigateHomePage = () => {
    navigate("/admin/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "genre" ? value.split(",") : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formValues = { ...formData };
      const { data } = await uploadVideoStream({
        variables: {
          input: formValues,
        },
      });
      // Resetting the fields..
      setFormData({
        title: "",
        description: "",
        genre: [],
        thumbnailUrl: "",
        videoUrl: "",
        uploadedBy: userId,
      });
      console.log("Video uploaded successfully:", data.uploadVideoStream);
      navigateHomePage();
      // Optionally, redirect the user to a different page or perform other actions
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };

  return (
    <>
      <Header />
      <div className='form-container'>
        <h2>Upload Video Stream</h2>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='title'>Title:</label>
            <input
              type='text'
              name='title'
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <label>Description:</label>
            <textarea
              name='description'
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <label>Genre:</label>
            <input
              type='text'
              name='genre'
              value={formData.genre}
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <label>Thumbnail URL:</label>
            <input
              type='text'
              name='thumbnailUrl'
              value={formData.thumbnailUrl}
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <label>Video URL:</label>
            <input
              type='text'
              name='videoUrl'
              value={formData.videoUrl}
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <button type='submit' disabled={loading}>
              {loading ? "Uploading..." : "Upload Video"}
            </button>
            {error && <p>Error: {error.message}</p>}
          </div>
        </form>
      </div>
    </>
  );
};

export default UploadVideoForm;
