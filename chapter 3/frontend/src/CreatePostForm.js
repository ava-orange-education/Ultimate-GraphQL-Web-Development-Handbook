import React, { useState } from "react";
import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";
import "./CreatePostForm.css"; // Import CSS file

const CREATE_POST = gql`
  mutation CreatePost($input: PostInput!) {
    createPost(input: $input) {
      body
      id
      title
      author {
        email
        id
        name
      }
    }
  }
`;

const GET_AUTHORS = gql`
  query {
    allAuthors {
      id
      name
    }
  }
`;

const CreatePostForm = ({ setShowForm }) => {
  const {
    loading: authorsLoading,
    error: authorsError,
    data: authorsData,
  } = useQuery(GET_AUTHORS);
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    authorId: "",
  });

  const GET_POSTS = gql`
    query GetAllPosts {
      allPosts {
        id
        body
        title
        author {
          id
          name
        }
      }
    }
  `;

  const [createPost, { loading: createLoading, error: createError }] =
    useMutation(CREATE_POST, {
      refetchQueries: [{ query: GET_POSTS }], // Refetch blog list after a new post is created
    });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPost({ variables: { input: formData } });
      setFormData({
        title: "",
        body: "",
        authorId: "",
      });
      // Show the blog list now...
      setShowForm();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='create-post-form'>
      <div className='form-group'>
        <label>Title:</label>
        <input
          type='text'
          name='title'
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className='form-group'>
        <label>Body:</label>
        <textarea
          name='body'
          value={formData.body}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      <div className='form-group'>
        <label>Author:</label>
        {authorsLoading ? (
          <p>Loading authors...</p>
        ) : authorsError ? (
          <p>Error loading authors: {authorsError.message}</p>
        ) : (
          <select
            name='authorId'
            value={formData.authorId}
            onChange={handleChange}
            required
          >
            <option value=''>Select an author</option>
            {authorsData.allAuthors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
        )}
      </div>
      <button type='submit' disabled={createLoading}>
        {createLoading ? "Creating..." : "Create Post"}
      </button>
      {createError && <p>Error: {createError.message}</p>}
    </form>
  );
};

export default CreatePostForm;
