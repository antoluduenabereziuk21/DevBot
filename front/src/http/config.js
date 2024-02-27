const axios = require('axios').default;
const ENV = require('../utils/enviroments.util');

const { URL_BASE } = ENV();

const api = axios.create({
    baseURL : URL_BASE
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