const kue = require('kue');
const redis = require('../config').redis;

const queue = kue.createQueue({
  redis: {
    host: redis.host,
    port: redis.port,
    db: redis.db
  }
});

module.exports = queue;
