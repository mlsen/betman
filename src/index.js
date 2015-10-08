'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const kue = require('kue');
const routes = require('./routes');


const User = require('./models/user');
let app = express();

app.use(bodyParser.json());

routes.register(app);

var server = app.listen(3000, function () {
  kue.app.listen(3001, function() {
    console.log('Kue running on port 3001.');
  });

  var host = server.address().address;
  var port = server.address().port;

  console.log('App listensing at http://%s:%s', host, port);
});
