const catalogFlow = require('./shopping_flow/shopping.flow');
const {flowPrincipal, onFlow, offFlow} = require('../flows/welcome_flow/welcome.flow');
const {logoutFlow, timeoutFlow, sessionExpiredFlow} = require('../flows/exit_flow/exit.flow');
const {advisorFlow} = require('../flows/advisor_flow/advisor.flow');
const {orderFlow} = require('../flows/order_flow/order.flow');
const localpickupFlow = require('./localpickup_flow/localpickup.flow');

const flows = [
    onFlow,
    offFlow,
    catalogFlow,
    flowPrincipal,
    logoutFlow,
    timeoutFlow,
    sessionExpiredFlow,
    advisorFlow,
    orderFlow,
    localpickupFlow
]
module.exports = {
    flows
};


/*
const fs = require("fs");
const {join} = require("path");

let filesFound = []

const initFlows = (pathFlow) => {

    // Lee el contenido del pathFlow
    const files = fs.readdirSync(pathFlow);

    // Itera sobre cada archivo
    const archivos = files.map((file) => join(pathFlow, file));

    // Itera sobre cada archivo
    archivos.forEach((file) => {
        // Si es un directorio, vuelve a llamar a la función
        if (fs.statSync(file).isDirectory()) {
            initFlows(file);
        } else {
            // Si es un archivo, lo agrega al array
            if (file.endsWith('flow.js')) {
                filesFound.push(file);
            }
        }
    })
}
const flujos =()=> filesFound.map((file) => require(join(process.cwd(),file)));
 */
