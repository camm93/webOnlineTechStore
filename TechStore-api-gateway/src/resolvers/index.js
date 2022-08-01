const authResolver = require('./authResolver') 
const itemResolver = require('./itemResolver')
const favoriteResolver = require('./favoriteResolver')
const lodash = require('lodash')

const resolvers = lodash.merge(authResolver, itemResolver, favoriteResolver);
module.exports = resolvers;
