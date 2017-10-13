
const Twitter = require('twitter');

const { consumer_key, consumer_secret, access_token_key, access_token_secret } = require('./config');

const client = new Twitter({
  consumer_key,
  consumer_secret,
  access_token_key,
  access_token_secret
});

module.exports = client;
