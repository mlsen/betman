var express = require('express');
// var bookshelf = require('./bookshelf');

const User = require('./models/user');
var app = express();

app.get('/:id', function (req, res) {
  User.where('id', req.params.id).fetch().then(user => {
    res.json(user);
  });
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Exaple app listenssing at http://%s:%s', host, port);
});
