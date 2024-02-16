// En app/index.js
const flowClient = require('./client_flow/client.flow');
const flowNoClient = require('./noclient_flow/noclient.flow');
const flowRegister = require('./register_flow/register.flow');

module.exports = {
  flowClient,
  flowNoClient,
  flowRegister
};
