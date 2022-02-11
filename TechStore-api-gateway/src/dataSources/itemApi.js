const { RESTDataSource }= require('apollo-datasource-rest');
const serverConfig      = require('../server');


class ItemAPI extends RESTDataSource {

    constructor(){
        super();
        this.baseURL = serverConfig.item_api_url;
    }

    async createItem(item){
        item = new Object(JSON.parse(JSON.stringify(item)));
        return await this.post('/items', item)
    }

    async itemById(itemRef){
        return await this.get(`/items/id/${itemRef}`);
    }

    async itemByCategory(category){
        return await this.get(`/items/categories/${category}`);
    }

    async itemsInHome(nItems){
        return await this.get(`/items/home/${nItems}`);
    }

    async updateItem(item){
        item = new Object(JSON.parse(JSON.stringify(item)));
        return await this.put('/items/update', item);
    }

    async deleteItem(itemRef){
        return await this.delete(`/items/delete/${itemRef}`);
    }

    async createFavorite(favorite){
        favorite = new Object(JSON.parse(JSON.stringify(favorite)));
        return await this.post('/favorites', favorite);
    }

    async favoriteById(favoriteId){
        return await this.get(`/favorites/id/${favoriteId}`);
    }

    async favoriteByUsername(username){
        return await this.get(`/favorites/${username}`);
    }

    async updateFavorite(favorite){
        favorite = new Object(JSON.parse(JSON.stringify(favorite)));
        return await this.put('/favorites/update', favorite);
    }

    async deleteFavorite(favoriteId){
        return await this.delete(`/favorites/delete/${favoriteId}`);
    }
}

module.exports = ItemAPI;