const axios = require('axios').default;
const ENV = require('../utils/enviroments.util');

const api = axios.create({
    baseURL : process.env.API_URL
});
api.interceptors.request.use((config) => {
    config.headers = {
        ...config.headers,
        //'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
    //config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
})
module.exports = {api};