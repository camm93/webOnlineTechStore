const usersResolver = {
    Query: {
        userDetailById: async (_, { userId }, { dataSources, tokenUserId }) => {
            if (userId == tokenUserId){
                return await dataSources.authAPI.getUser(userId);
            }
            else{
                return null;
            }
        }
    },
    Mutation: {
        deleteUser: async(_, { userId }, { dataSources, tokenUserId }) => {
            if (userId == tokenUserId){
                return await dataSources.authAPI.deleteUser(userId);
            }
            else{
                return null;
            }
        },

        logIn: async (_, { credentials }, { dataSources }) => {
            return await dataSources.authAPI.authRequest(credentials);
        },

        refreshToken: async (_, { refresh }, { dataSources }) => {
            return await dataSources.authAPI.refreshToken(refresh);
        },

        signUpUser: async (_, { userInput }, { dataSources }) => {
            return await dataSources.authAPI.createUser(userInput);
        },

        updateUser: async(_, { user }, { dataSources, tokenUserId }) => {
            if (user.id == tokenUserId){
                return await dataSources.authAPI.updateUser(user);
            }
            else {
                return null;
            }
        },
    }
};

module.exports = usersResolver;
