const { gql } = require('apollo-server-express');

const typeDefs = gpl`
    type Query{
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(bookData: SaveBookInput!): User
        removeBook(bookId: ID!): User
    }

    type User{
        _id: ID!
        username: String!
        email: String!
        bookCount: Int
        savedBooks: [Book]
    }

    input SaveBookInput{
        author: [String]
        description: String!
        title: String! 
        bookId: String
        image: String
        link: String
    }

    type Auth{
        token: ID!
        user: User
    }

    type Book{
        bookId: String
        authors: [String]
        description: String!
        title: String!
        link: String
        image: String
    }
`

module.exports = typeDefs;