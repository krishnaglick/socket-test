
const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const [,,force] = process.argv;

//Edit me to add configs! I should be run as part of CI.
const configTemplate = {
  consumer_key: process.env.CONSUMER_KEY || '',
  consumer_secret: process.env.CONSUMER_SECRET || '',
  access_token_key: process.env.ACCESS_TOKEN_KEY || '',
  access_token_secret: process.env.ACCESS_TOKEN_SECRET || '',
  app_port: process.env.APP_PORT || 80,
  socket_port: process.env.SOCKET_PORT || 8080
};

let currentConfig = {};
try {
  currentConfig = require('./config');
}
catch(x) {}

if(currentConfig) {
  _.forEach(Object.keys(configTemplate), key => currentConfig[key] = currentConfig[key] || configTemplate[key]);
  fs.writeFileSync(path.resolve('./config.json'), JSON.stringify(currentConfig, null, 2), { encoding: 'UTF8' });
}
if(force)
  fs.writeFileSync(path.resolve('./config.json'), JSON.stringify(configTemplate, null, 2), { encoding: 'UTF8' });
