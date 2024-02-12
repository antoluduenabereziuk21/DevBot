// En flows/index.js

const flowClient = require('./flowClient');
const flowNoClient = require('./flowNoClient');
const flowRegister = require('./flowRegister');
const flowWelcome = require('./flowWelcome');

module.exports = {
  flowClient,
  flowNoClient,
  flowRegister,
  flowWelcome,
};
