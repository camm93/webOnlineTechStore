const { ApolloServer } = require('apollo-server')

const AuthAPI = require('./dataSources/authApi')
const authentication = require('./utils/authentication')
const ItemAPI = require('./dataSources/itemApi')
const resolvers = require('./resolvers')
const typeDefs = require('./typeDefs')

const server = new ApolloServer({
    context: authentication,
    typeDefs,
    resolvers,
    dataSources: () => ({
        authAPI: new AuthAPI(),
        itemAPI: new ItemAPI()
    }),
    introspection: true,
    playground: true
});

server.listen(process.env.PORT || 4000).then(({ url }) => {
    console.log(`Server ready at ${ url }`)
});
