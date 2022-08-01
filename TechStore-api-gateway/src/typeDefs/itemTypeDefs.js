const { gql } = require('apollo-server');

const itemTypes = gql `
    type Item {
        ref: Int!
        name: String!
        category: String!
        price: Int!
        inStock: Int!
        warranty: String!
        details: String!
        image: String!
    }

    input ItemCreate {
        ref: Int!
        name: String!
        category: String!
        price: Int!
        inStock: Int!
        warranty: String!
        details: String!
        image: String!
    }

    input ItemUpdate {
        ref: Int!
        price: Int!
        inStock: Int
    }

    extend type Mutation{
        createItem(item: ItemCreate!): Item
        deleteItem(ref: Int!): String
        updateItem(item: ItemUpdate): Item
    }

    extend type Query {
        itemByCategory(category: String!): [Item]
        itemByReference(ref: Int!): Item
        itemsInHome(nItems: Int!): [Item]
    }
`;

module.exports = itemTypes;
