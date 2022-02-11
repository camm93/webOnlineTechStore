const favoriteResolver = {
    Query: {
        favoriteByUsername: async(_, { username }, {dataSources, userIdToken}) => {
            usernameToken = (await dataSources.authAPI.getUser(userIdToken)).username;
            if (username == usernameToken){
                return await dataSources.itemAPI.favoriteByUsername(username);
            }
            else {
                return null;
            }
        },
        favoriteById: async(_, { id }, {dataSources, userIdToken}) => {
            usernameToken = (await dataSources.authAPI.getUser(userIdToken)).username;
            const favorite = await dataSources.itemAPI.favoriteById(id);
            usernameFavorite = favorite.username;

            if (usernameToken == usernameFavorite) {
                return favorite;
            }
            else{
                return null;
            }
        }
    },
    Mutation: {
        createFavorite: async (_, { favorite }, { dataSources, userIdToken }) => {
            usernameToken = (await dataSources.authAPI.getUser(userIdToken)).username;            
            if (favorite.username == usernameToken){
                return await dataSources.itemAPI.createFavorite( favorite );
            }
            else {
                return null;
            }
        },

        updateFavorite: async (_, { favorite }, { dataSources, userIdToken }) => {
            usernameToken = (await dataSources.authAPI.getUser(userIdToken)).username;
            usernameFavorite = (await dataSources.itemAPI.favoriteById(favorite.id)).username;
            if (usernameFavorite == usernameToken) {
                return await dataSources.itemAPI.updateFavorite(favorite);
            }
            else {
                return null;
            }
        },

        deleteFavorite: async (_, { id }, { dataSources, userIdToken }) => {
            usernameToken = (await dataSources.authAPI.getUser(userIdToken)).username;
            usernameFavorite = (await dataSources.itemAPI.favoriteById(id)).username;
            if (usernameToken == usernameFavorite){
                return await dataSources.itemAPI.deleteFavorite(id);
            }
            else {
                return null;
            }
        }       
    }
};

module.exports = favoriteResolver;