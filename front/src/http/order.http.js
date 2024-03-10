const {api} = require('./config');
const ENV = require('../utils/enviroments.util');
const {postSlack} = require("./slack.http");
const chalk = require("chalk");
const {ENDPOINT_ORDER} = ENV();

const createOrder = async (dataEntry)=>{
    try{

        const response = await api.post(ENDPOINT_ORDER, JSON.stringify(dataEntry), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    }catch (error){
        console.log(chalk.bgRed(error.message));
        await postSlack({
            text: `Error en el axios createOrder: ${error.message}`
        })
    }
}

module.exports = {createOrder};

