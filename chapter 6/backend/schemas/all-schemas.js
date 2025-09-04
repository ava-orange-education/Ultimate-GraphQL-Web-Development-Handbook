// GraphQL schema definition
const schema = `#graphql
  type Mutation {
    signUpGoogle(accessToken: String!): AuthResponse
    # Upload a new VideoStream
    uploadVideoStream(input: UploadVideoStreamInput!): VideoStream!
  }

  type Query {
    checkLogin: AdminUser
    # Fetch a list of VideoStreams uploaded by AdminUser
    videoStreamsByAdmin(userId: ID!): [VideoStream]

    # Storefront Queries
    recentlyWatchedVideos: [VideoStream]!
    recentlyUploadedVideos(limit: Int = 10): [VideoStream]!
    videosByGenre(genre: String!, limit: Int = 10): [VideoStream]!
    genresWithTopVideos(genreLimit: Int = 5, videoLimit: Int = 10): [GenreWithVideos]!
  }


  type GenreWithVideos {
    genre: String!
    topVideos: [VideoStream]!
  }


  type VideoStream {
    _id: ID!
    title: String!
    description: String
    videoUrl: String!
    genre: [String!]
    thumbnailUrl: String
    uploadedBy: AdminUser
    createdDate: String
    updatedDate: String
  }

  type AdminUser {
    id: ID!,
    firstName: String,
    lastName: String,
    email: String,
    isAdmin: Boolean
  }


  type AuthResponse {
      accessToken:String!
      user: AdminUser
  }

  input UploadVideoStreamInput {
    title: String!
    description: String!
    videoUrl: String!
    genre: [String!]!
    thumbnailUrl: String!
    uploadedBy: ID!
  }

`;

export default schema; // Export the GraphQL schema
