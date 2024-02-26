// En app/index.js
const flowClient = require('./client_flow/client.flow');
const flowNoClient = require('./noclient_flow/noclient.flow');
const flowRegister = require('./register_flow/register.flow');
const catalogFlow = require('./shopping_flow/shopping.flow');
const flowPrincipal = require('../flows/welcome_flow/welcome.flow');

module.exports = {
  flowClient,
  flowNoClient,
  flowRegister,
  catalogFlow,
  flowPrincipal
};
