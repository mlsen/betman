const User = require('../models/user');
const _ = require('lodash');

const activate = function(req, res) {
  const id = req.params.id;
  const key = req.params.key || req.body.key

  User.where({
    id: id,
    activation_key: key
  }).fetch().then(user => {
    if(!user) {
      return res.status(404).end();
    }
    user.set('activation_key', null);
    user.set('active', true);
    user.save().then(() => {
      res.json(_.omit(user, ['password', 'activation_key']));
    }).catch(err => {
      res.status(500).json(err);
    });
  }).catch(err => {
    res.status(500).json(err);
  });
};

module.exports = {
  activate: activate
};
