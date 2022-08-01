const { ApolloError } = require('apollo-server');
const fetch = require('node-fetch');
const serverConfig = require('../server');

const authentication = async ({req}) => {
    const token = req.headers.authorization || '';

    if (token == ''){
        return {tokenUserId: null}
    }
    else {
        try {
            let requestOptions = {
                method: 'POST', 
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({token}), 
                redirect: 'follow'
            };

            let response = await fetch(
                `${serverConfig.auth_api_url}/verifyToken/`,
                requestOptions
            )

            if (response.status != 200){
                console.log(response)
                throw new ApolloError(`Invalid Session - ${401}` + response.status, 401)
            }

            return {tokenUserId: (await response.json()).UserId}
        }
        catch (error) {
            throw new ApolloError(`Error in token validation: ${500}: ${error}`, 500);
        }
    }
}

module.exports = authentication;
