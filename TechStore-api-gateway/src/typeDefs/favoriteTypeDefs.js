const { gql } = require('apollo-server');

const favoriteTypes = gql `
    type Favorite {
        id: String!
        username: String!
        prodRef: Int!
        prodName: String!
        prodCategory: String!
        prodPrice: Int!
        prodUnits: Int!
        date: String!
        image: String!
    }

    input FavoriteInput {
        username: String!
        prodRef: Int!
        prodName: String!
        prodCategory: String!
        prodPrice: Int!
        prodUnits: Int! 
        image: String!  
    }
    
    input FavoriteUpdate {
        id: String!
        prodUnits: Int!   
    }

    extend type Mutation{
        createFavorite(favorite: FavoriteInput!): Favorite
        deleteFavorite(id: String!): String
        updateFavorite(favorite: FavoriteUpdate): Favorite
    }

    extend type Query {
        favoriteById(id: String!): Favorite
        favoriteByUsername(username: String!): [Favorite]
    }
`;

module.exports = favoriteTypes;