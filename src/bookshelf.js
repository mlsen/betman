const dbConfig = require('./knexfile');

const knex = require('knex')(dbConfig.development);

module.exports = require('bookshelf')(knex);
