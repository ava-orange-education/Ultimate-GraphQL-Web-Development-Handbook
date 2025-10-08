import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import React from "react";

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

const DisplayPosts = () => {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data.allPosts.map(({ id, body, title, author: { name } }) => (
    <div key={id} className='post'>
      <div className='post-title'>{title}</div>
      <div className='post-body'>{body}</div>
      <div className='post-author'>Author: {name}</div>
    </div>
  ));
};

export default DisplayPosts;
