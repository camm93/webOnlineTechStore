// calling all typeDefs (schema)
const authTypes     = require('./authTypeDefs');
const itemTypes     = require('./itemTypeDefs'); 
const favoriteTypes = require('./favoriteTypeDefs');

// Join
const schemasArrays = [authTypes, itemTypes, favoriteTypes];

// Export
module.exports = schemasArrays;