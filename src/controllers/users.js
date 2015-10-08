const User = require('../models/user');
const _ = require('lodash');

const create = function(req, res) {
  User.forge({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }).save().then(user => {
    res.json(_.omit(user.toJSON(), 'password'));
  }).catch(err => {
    res.status(500).json(err);
  });
};

const list = function(req, res) {
  User.fetchAll().then(users => {
    users = users.map(user => {
      return _.omit(user.toJSON(), 'password');
    });
    res.json(users);
  });
};

const detail = function(req, res) {
  User.where('id', req.params.id).fetch().then(user => {
    if(!user) {
      return res.status(404).end();
    }

    res.json(_.omit(user.toJSON(), 'password'));
  }).catch(err => {
    res.status(500).json(err);
  });
};

const destroy = function(req, res) {
  User.where('id', req.params.id).fetch().then(user => {
    if(!user) {
      return res.status(404).end();
    }

    user.destroy().then(() => {
      res.status(204).end();
    }).catch(err => {
      res.status(500).json(err);
    });
  });
};

module.exports = {
  create: create,
  list: list,
  detail: detail,
  destroy: destroy
};
