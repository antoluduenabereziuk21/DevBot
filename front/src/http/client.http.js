const {api} = require('./config');
const ENV = require('../utils/enviroments.util');
const {postSlack} = require("./slack.http");
const chalk = require("chalk");
const {ENDPOINT_CLIENT} = ENV();

const createClient = async(dataEntry)=>{
    try {
        const response = await api.post(ENDPOINT_CLIENT, dataEntry, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response.data)
    }catch (error){
        console.log(chalk.bgRed(error.message));
        await postSlack({
            text: `Error en el axios createClient: ${error.message}`
        })
    }
}

module.exports = {createClient};