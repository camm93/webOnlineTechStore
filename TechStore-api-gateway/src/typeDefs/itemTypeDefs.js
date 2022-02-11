const { gql } = require('apollo-server');

const itemTypes = gql `
    type Item {
        ref     : Int!
        name    : String!
        category: String!
        price   : Int!
        inStock : Int!
        warranty: String!
        details : String!
        image   : String!
    }

    input ItemCreate {
        ref     : Int!
        name    : String!
        category: String!
        price   : Int!
        inStock : Int!
        warranty: String!
        details : String!
        image   : String!
    }

    input ItemUpdate {
        ref     : Int!
        price   : Int!
        inStock : Int
    }

    extend type Query {
        itemByReference(ref: Int!): Item
        itemByCategory(category: String!): [Item]
        itemsInHome(nItems: Int!): [Item]
    }

    extend type Mutation{
        createItem(item:ItemCreate!): Item
        updateItem(item:ItemUpdate): Item
        deleteItem(ref:Int!): String
    }
`;

module.exports = itemTypes;