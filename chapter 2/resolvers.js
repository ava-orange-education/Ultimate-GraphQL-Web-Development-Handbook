// Import any necessary libraries for generating dummy data
import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";

// Dummy data for authors, posts, and comments
const authors = Array.from({ length: 5 }, (_, index) => ({
  id: String(index + 1),
  name: faker.person.fullName(),
  email: faker.internet.email(),
}));

const posts = Array.from({ length: 10 }, (_, index) => ({
  id: String(index + 1),
  title: faker.lorem.sentence(),
  body: faker.lorem.paragraph(),
  authorId: String(Math.floor(Math.random() * 5) + 1),
}));

const comments = Array.from({ length: 20 }, (_, index) => ({
  id: String(index + 1),
  text: faker.lorem.sentence(),
  authorId: String(Math.floor(Math.random() * 5) + 1),
  postId: String(Math.floor(Math.random() * 10) + 1),
}));

const resolvers = {
  Mutation: {
    createPost: (_, { input }, {}) => {
      const post = {
        id: uuidv4(),
        title: input.title,
        body: input.body,
        authorId: input.authorId,
      };
      posts.push(post);
      return post;
    },
    createComment: (_, { input }, {}) => {
      const comment = {
        id: uuidv4(),
        text: input.text,
        postId: input.postId,
        authorId: input.authorId,
      };
      comments.push(comment);
      return comment;
    },
  },
  Query: {
    hello: () => "world",
    allAuthors: () => authors,
    allPosts: () => posts,
    post: (_, { id }) => posts.find((post) => post.id === id),
  },
  Author: {
    posts: (author) => posts.filter((post) => post.authorId === author.id),
  },
  Post: {
    author: (post) => authors.find((author) => author.id === post.authorId),
    comments: (post) =>
      comments.filter((comment) => comment.postId === post.id),
  },
  Comment: {
    author: (comment) =>
      authors.find((author) => author.id === comment.authorId),
    post: (comment) => posts.find((post) => post.id === comment.postId),
  },
};

export default resolvers;
