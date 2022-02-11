const usersResolver = {
    Query: {
        userDetailById: async (_, { userId }, { dataSources, userIdToken }) => {
            if (userId == userIdToken){
                return await dataSources.authAPI.getUser(userId);
            }
            else{
                return null;
            }
        }
    },
    Mutation: {
        signUpUser: async (_, { userInput }, { dataSources }) => {
            return await dataSources.authAPI.createUser(userInput);
        },

        logIn: async (_, { credentials }, { dataSources }) => {
            return await dataSources.authAPI.authRequest(credentials);
        },

        refreshToken: async (_, { refresh }, { dataSources }) => {
            return await dataSources.authAPI.refreshToken(refresh);
        },

        updateUser: async(_, { user }, { dataSources, userIdToken }) => {
            if (user.id == userIdToken){
                return await dataSources.authAPI.updateUser(user);
            }
            else {
                return null;
            }
        },
        
        deleteUser: async(_, { userId }, { dataSources, userIdToken }) => {
            if (userId == userIdToken){
                return await dataSources.authAPI.deleteUser(userId);
            }
            else{
                return null;
            }
        },

    }
};

module.exports = usersResolver;