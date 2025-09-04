const schema = `#graphql
  type Mutation {
    createPost(input: PostInput!): Post
    createComment(input: CommentInput!): Comment
  }

  input PostInput {
    title: String!
    body: String!
    authorId: ID!
  }

  input CommentInput {
    text: String!
    postId: ID!
    authorId: ID!
  }

  type Query {
    hello: String

    # Retrieve a list of all authors
    allAuthors: [Author]

    # Retrieve a list of all posts
    allPosts: [Post]

    # Retrieve a specific post by ID
    post(id: ID!): Post
  }

  type Author {
    id: ID!
    name: String!
    email: String!
    posts: [Post]
  }
  
  type Post {
    id: ID!
    title: String!
    body: String!
    author: Author!
    comments: [Comment]
  }
  
  type Comment {
    id: ID!
    text: String!
    author: Author
    post: Post
  }
`;

export default schema;
