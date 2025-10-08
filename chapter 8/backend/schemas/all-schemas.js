// GraphQL schema definition
const schema = `#graphql
  type Mutation {
    signUpGoogle(accessToken: String!): AuthResponse
    # Upload a new VideoStream
    uploadVideoStream(input: UploadVideoStreamInput!): VideoStream!
    createOrUpdateRating(input: CreateOrUpdateRatingInput!): Rating!
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

    # Fetch video by Id
    fetchVideobyId(id: ID!): VideoStream
    fetchRating(videoId: ID!): Rating # Fetch a user's rating for a specific video

    getSimilarVideos(videoId: ID!, limit: Int): [VideoStream!]!
    getPersonalizedVideos(limit: Int): [VideoStream!]!

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
    totalRating: Float!
    numberOfRaters: Int!
    averageRating: Float!
    createdDate: String
    updatedDate: String
  }


  type Rating {
    _id: ID!
    videoId: ID!
    userId: ID!
    rating: Int!
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

  input CreateOrUpdateRatingInput {
    videoId: ID!
    rating: Int!
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
