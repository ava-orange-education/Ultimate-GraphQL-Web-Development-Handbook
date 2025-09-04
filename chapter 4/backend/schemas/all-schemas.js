// GraphQL schema definition
const schema = `#graphql
  type Mutation {
    # Mutation to create a new post
    createPost(input: PostInput!): Post
    
    # Mutation to create a new comment
    createComment(input: CommentInput!): Comment
  }

  # Input type for creating a new post
  input PostInput {
    title: String! # Title of the post (required)
    body: String! # Body of the post (required)
    authorId: ID! # ID of the author creating the post (required)
  }

  # Input type for creating a new comment
  input CommentInput {
    text: String! # Text of the comment (required)
    postId: ID! # ID of the post the comment is associated with (required)
    authorId: ID! # ID of the author creating the comment (required)
  }

  type Query {
    hello: String # Query to return a simple greeting string
    
    # Query to retrieve a list of all authors
    allAuthors: [Author]
    
    # Query to retrieve a list of all posts
    allPosts: [Post]
    
    # Query to retrieve a specific post by ID
    post(id: ID!): Post
  }

  # Type definition for an Author
  type Author {
    id: ID! # Unique identifier for the author
    name: String! # Name of the author
    email: String! # Email of the author
    posts: [Post] # List of posts authored by this author
  }
  
  # Type definition for a Post
  type Post {
    id: ID! # Unique identifier for the post
    title: String! # Title of the post
    body: String! # Body of the post
    author: Author! # Author of the post
    comments: [Comment] # List of comments associated with this post
  }
  
  # Type definition for a Comment
  type Comment {
    id: ID! # Unique identifier for the comment
    text: String! # Text of the comment
    author: Author # Author of the comment
    post: Post # Post associated with the comment
  }
`;

export default schema; // Export the GraphQL schema
