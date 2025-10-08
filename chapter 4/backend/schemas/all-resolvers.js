// Import necessary libraries for generating dummy data
import { faker } from "@faker-js/faker"; // Library for generating fake data
import { v4 as uuidv4 } from "uuid"; // Library for generating UUIDs

// Dummy data for authors, posts, and comments
const authors = Array.from({ length: 5 }, (_, index) => ({
  id: String(index + 1),
  name: faker.person.fullName(), // Generate a fake author name
  email: faker.internet.email(), // Generate a fake email
}));

const posts = Array.from({ length: 10 }, (_, index) => ({
  id: String(index + 1),
  title: faker.lorem.sentence(), // Generate a fake post title
  body: faker.lorem.paragraph(), // Generate a fake post body
  authorId: String(Math.floor(Math.random() * 5) + 1), // Assign a random author ID
}));

const comments = Array.from({ length: 20 }, (_, index) => ({
  id: String(index + 1),
  text: faker.lorem.sentence(), // Generate a fake comment text
  authorId: String(Math.floor(Math.random() * 5) + 1), // Assign a random author ID
  postId: String(Math.floor(Math.random() * 10) + 1), // Assign a random post ID
}));

// GraphQL resolvers
const resolvers = {
  Mutation: {
    // Resolver function for creating a new post
    createPost: (_, { input }, {}) => {
      const post = {
        id: uuidv4(), // Generate a UUID for the new post
        title: input.title, // Extract title from input
        body: input.body, // Extract body from input
        authorId: input.authorId, // Extract author ID from input
      };
      posts.unshift(post); // Add the new post to the beginning of the posts array
      return post; // Return the newly created post
    },
    // Resolver function for creating a new comment
    createComment: (_, { input }, {}) => {
      const comment = {
        id: uuidv4(), // Generate a UUID for the new comment
        text: input.text, // Extract text from input
        postId: input.postId, // Extract post ID from input
        authorId: input.authorId, // Extract author ID from input
      };
      comments.push(comment); // Add the new comment to the comments array
      return comment; // Return the newly created comment
    },
  },
  Query: {
    // Resolver function for the "hello" query
    hello: () => "world",
    // Resolver function for fetching all authors
    allAuthors: () => authors,
    // Resolver function for fetching all posts
    allPosts: () => posts,
    // Resolver function for fetching a post by ID
    post: (_, { id }) => posts.find((post) => post.id === id),
  },
  Author: {
    // Resolver function for fetching posts by author
    posts: (author) => posts.filter((post) => post.authorId === author.id),
  },
  Post: {
    // Resolver function for fetching the author of a post
    author: (post) => authors.find((author) => author.id === post.authorId),
    // Resolver function for fetching comments on a post
    comments: (post) =>
      comments.filter((comment) => comment.postId === post.id),
  },
  Comment: {
    // Resolver function for fetching the author of a comment
    author: (comment) =>
      authors.find((author) => author.id === comment.authorId),
    // Resolver function for fetching the post of a comment
    post: (comment) => posts.find((post) => post.id === comment.postId),
  },
};

export default resolvers; // Export the resolvers object
