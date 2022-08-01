const favoriteResolver = {
    Query: {
        favoriteById: async(_, {id}, {dataSources, tokenUserId}) => {
            tokenUsername = (await dataSources.authAPI.getUser(tokenUserId)).username;
            const favorite = await dataSources.itemAPI.favoriteById(id);
            favoriteUsername = favorite.username;

            if (tokenUsername == favoriteUsername) {
                return favorite;
            }
            else{
                return null;
            }
        },

        favoriteByUsername: async(_, {username}, {dataSources, tokenUserId}) => {
            tokenUsername = (await dataSources.authAPI.getUser(tokenUserId)).username;
            if (username == tokenUsername){
                return await dataSources.itemAPI.favoriteByUsername(username);
            }
            else {
                return null;
            }
        },
    },
    Mutation: {
        createFavorite: async (_, {favorite}, {dataSources, tokenUserId}) => {
            tokenUsername = (await dataSources.authAPI.getUser(tokenUserId)).username;
            if (favorite.username == tokenUsername){
                return await dataSources.itemAPI.createFavorite(favorite);
            }
            else {
                return null;
            }
        },

        deleteFavorite: async (_, {id}, {dataSources, tokenUserId}) => {
            tokenUsername = (await dataSources.authAPI.getUser(tokenUserId)).username;
            favoriteUsername = (await dataSources.itemAPI.favoriteById(id)).username;
            if (tokenUsername == favoriteUsername){
                return await dataSources.itemAPI.deleteFavorite(id);
            }
            else {
                return null;
            }
        },

        updateFavorite: async (_, {favorite}, {dataSources, tokenUserId}) => {
            tokenUsername = (await dataSources.authAPI.getUser(tokenUserId)).username;
            favoriteUsername = (await dataSources.itemAPI.favoriteById(favorite.id)).username;
            if (favoriteUsername == tokenUsername) {
                return await dataSources.itemAPI.updateFavorite(favorite);
            }
            else {
                return null;
            }
        },
    }
};

module.exports = favoriteResolver;
