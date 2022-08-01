// calling all typeDefs (schema)
const authTypes = require('./authTypeDefs');
const itemTypes = require('./itemTypeDefs'); 
const favoriteTypes= require('./favoriteTypeDefs');

const schemasArrays = [authTypes, itemTypes, favoriteTypes];

module.exports = schemasArrays;
