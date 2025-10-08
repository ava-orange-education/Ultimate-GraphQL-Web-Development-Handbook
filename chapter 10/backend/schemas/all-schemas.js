// GraphQL schema definition
const schema = `#graphql
  # Cache Control Directive for Apollo Server v5
  directive @cacheControl(
    maxAge: Int
    scope: CacheControlScope
  ) on FIELD_DEFINITION | OBJECT | INTERFACE | UNION

  enum CacheControlScope {
    PUBLIC
    PRIVATE
  }

  type Mutation {
    signUpGoogle(accessToken: String!): AuthResponse
    # Upload a new VideoStream
    uploadVideoStream(input: UploadVideoStreamInput!): VideoStream!
    createOrUpdateRating(input: CreateOrUpdateRatingInput!): Rating!
  }

  type Query {
    checkLogin: AdminUser
    # Updated to support pagination with caching
    videoStreamsByAdmin(offset: Int, limit: Int): [VideoStream] @cacheControl(maxAge: 60, scope: PRIVATE)

    # Storefront Queries with appropriate caching
    recentlyWatchedVideos: [VideoStream]! @cacheControl(maxAge: 30, scope: PRIVATE)
    recentlyUploadedVideos(limit: Int = 10): [VideoStream]! @cacheControl(maxAge: 300, scope: PUBLIC)
    videosByGenre(genre: String!, limit: Int = 10): [VideoStream]! @cacheControl(maxAge: 600, scope: PUBLIC)
    genresWithTopVideos(genreLimit: Int = 5, videoLimit: Int = 10): [GenreWithVideos]! @cacheControl(maxAge: 900, scope: PUBLIC)

    # Fetch video by Id
    fetchVideobyId(id: ID!): VideoStream @cacheControl(maxAge: 300, scope: PUBLIC)
    fetchRating(videoId: ID!): Rating @cacheControl(maxAge: 60, scope: PRIVATE)

    getSimilarVideos(videoId: ID!, limit: Int): [VideoStream!]! @cacheControl(maxAge: 600, scope: PUBLIC)
    getPersonalizedVideos(limit: Int): [VideoStream!]! @cacheControl(maxAge: 120, scope: PRIVATE)
  }

  type Subscription {
    # Real-time subscription for new video uploads
    videoUploaded(genre: String): VideoStream!
    
    # Real-time subscription for rating updates
    ratingUpdated(videoId: ID!): Rating!
  }


  type GenreWithVideos {
    genre: String!
    topVideos: [VideoStream]!
  }


  type VideoStream @cacheControl(maxAge: 300, scope: PUBLIC) {
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
