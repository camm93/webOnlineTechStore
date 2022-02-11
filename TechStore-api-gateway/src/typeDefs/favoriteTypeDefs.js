const { gql } = require('apollo-server');

const favoriteTypes = gql `
    type Favorite {
        id          : String!
        username    : String!
        prodRef     : Int!
        prodName    : String!
        prodCategory: String!
        prodPrice   : Int!
        prodUnits   : Int!
        date        : String!
        image       : String!
    }

    input FavoriteInput {
        username    : String!
        prodRef     : Int!
        prodName    : String!
        prodCategory: String!
        prodPrice   : Int!
        prodUnits   : Int! 
        image       : String!  
    }
    
    input FavoriteUpdate {
        id       : String!
        prodUnits: Int!   
    }

    extend type Query {
        favoriteByUsername(username: String!): [Favorite]
        favoriteById(id: String!): Favorite
    }

    extend type Mutation{
        createFavorite(favorite:FavoriteInput!): Favorite
        updateFavorite(favorite:FavoriteUpdate): Favorite
        deleteFavorite(id:String!): String
    }
`;

module.exports = favoriteTypes;