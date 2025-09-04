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
