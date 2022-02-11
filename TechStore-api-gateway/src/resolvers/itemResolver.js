const itemResolver = {
    Query: {
        itemByReference: async (_, { ref }, { dataSources }) => {
            return await dataSources.itemAPI.itemById(ref);
        },

        itemByCategory: async (_, { category }, { dataSources }) => {
            return await dataSources.itemAPI.itemByCategory(category);
        },

        itemsInHome: async (_, { nItems }, { dataSources }) => {
            return await dataSources.itemAPI.itemsInHome(nItems);
        },

    },
    Mutation: {
        createItem: async (_, { item }, { dataSources }) => {
            return await dataSources.itemAPI.createItem(item);
        },

        updateItem: async (_, { item }, { dataSources }) => {
            return await dataSources.itemAPI.updateItem(item);
        },

        deleteItem: async (_, { ref }, { dataSources }) => {
            return await dataSources.itemAPI.deleteItem(ref);
        },

    }
};

module.exports = itemResolver;