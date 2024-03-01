const axios = require('axios').default;
const API_URL = process.env.API_URL;

console.log('api_url:'+API_URL);

const createOrder = (dataEntry)=>{
    var config = {
        method: "post",    
        url:API_URL,
        headers: {
            'Content-Type': 'application/json'
          },
        data: dataEntry,
    };
    axios(config)
        .then(function(response){
            console.log(JSON.stringify(response.data))
        })
        .catch(function(error){
            console.log(error)
        })
}

module.exports = {createOrder};

