const dbConfig = require('./config').database;

module.exports = {

  development: dbConfig,
  staging: dbConfig,
  production: dbConfig

};
