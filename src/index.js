'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const Mailgun = require('mailgun').Mailgun;

const User = require('./models/user');
let app = express();

app.use(bodyParser.json());
app.set('mailgun', new Mailgun(require('./config').mailgun.key));

routes.register(app);

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  const mailgun = app.get('mailgun');
  mailgun.sendText('betman@mlsn.me', ['mluecksen@gmail.com'], 'Hallo Mailgun', 'Ja das ist es.');

  console.log(process.env);

  console.log('App listensing at http://%s:%s', host, port);
});
