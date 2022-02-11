const { gql } = require('apollo-server');

const authTypes = gql `
    type Tokens {
        refresh: String!
        access: String!
    }

    type Access {
        access: String!
    }

    input CredentialsInput {
        username: String!
        password: String!
    }

    input SignUpInput {
        username: String!
        password: String!
        name: String!
        surname: String!
        email: String!
    }

    type UserDetail {
        id      : Int!
        username: String!
        name    : String!
        surname : String!
        email   : String!
    }

    input UserUpdate {
        id      : Int!
        password: String!
        username: String!
        name    : String!
        surname : String!
        email   : String!
    }

    type Query {
        userDetailById(userId: Int!):UserDetail!
    }

    type Mutation {
        signUpUser(userInput:SignUpInput)   :Tokens!
        logIn(credentials:CredentialsInput!):Tokens!
        refreshToken(refresh:String!)  :Access!
        updateUser(user:UserUpdate!)        : UserDetail!
        deleteUser(userId:Int!)          : String!
    }
    `;

module.exports = authTypes;
