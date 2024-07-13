const {gql} = require("apollo-server");

const typeDefs = gql`

input CreateUserInput {
    name: String!
    username: String!
    age: Int = 18
    nationality: Nationality = BRAZIL
  }

    enum Nationality {
        CANADA
        BRAZIL
        INDIA
        GERMANY
        CHILE
    }

    type User {
        id: ID!
        name: String!,
        username: String!
        age: Int!
        nationality: Nationality!
        friends: [User!]
        favoriteMovies: [Movie!]
    }

    type Movie {
        id: ID!
        name: String!
        yearOfPublication: Int!
        isInTheaters: Boolean!
    }

    type Query {
        users: [User!]!
        user(id: ID!): User!
        movies: [Movie!]!
        movie(name: String!): Movie!
    }

    type Mutation {
        createUser(user: CreateUserInput!): User!
    }
`

module.exports = {typeDefs}