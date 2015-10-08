'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');


const User = require('./models/user');
let app = express();

app.use(bodyParser.json());

routes.register(app);

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('App listensing at http://%s:%s', host, port);
});
