const { gql } = require("apollo-server");

const typeDefs = gql`
  type Launch {
    # field: type
    id: ID! # can never be null
    site: String
    mission: Mission
    rocket: Rocket
    isBooked: Boolean! # can never be null. Think required!
  }

  type User {
    id: ID!
    email: String!
    trips: [Launch]! # can be empty since that's not null
    token: String
  }

  type Rocket {
    id: ID!
    name: String
    type: String
  }

  type Mission {
    name: String
    missionPatch(size: PatchSize): String
  }

  enum PatchSize {
    SMALL
    LARGE
  }

  type Query {
    launches(
      """
      Number of results to show >= 1. Default = 20
      """
      pageSize: Int
      after: String # Cursor
    ): LaunchConnection
    launch(id: ID!): Launch
    me: User
  }

  type LaunchConnection {
    cursor: String!
    hasMore: Boolean!
    launches: [Launch]!
  }

  type Mutation {
    bookTrips(launchIds: [ID]!): TripUpdateResponse!
    cancelTrip(launchId: ID!): TripUpdateResponse!
    login(email: String): User
  }

  type TripUpdateResponse {
    success: Boolean!
    message: String
    launches: [Launch]
  }
`;

module.exports = typeDefs;
