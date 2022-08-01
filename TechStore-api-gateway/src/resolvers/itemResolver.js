const itemResolver = {
    Query: {
        itemByCategory: async (_, { category }, { dataSources }) => {
            return await dataSources.itemAPI.itemByCategory(category);
        },

        itemByReference: async (_, { ref }, { dataSources }) => {
            return await dataSources.itemAPI.itemById(ref);
        },

        itemsInHome: async (_, { nItems }, { dataSources }) => {
            return await dataSources.itemAPI.itemsInHome(nItems);
        },
    },
    Mutation: {
        createItem: async (_, { item }, { dataSources }) => {
            return await dataSources.itemAPI.createItem(item);
        },

        deleteItem: async (_, { ref }, { dataSources }) => {
            return await dataSources.itemAPI.deleteItem(ref);
        },

        updateItem: async (_, { item }, { dataSources }) => {
            return await dataSources.itemAPI.updateItem(item);
        },
    }
};

module.exports = itemResolver;
