const bookshelf = require('../bookshelf');
const Checkit = require('checkit');
const bcrypt = require('bcrypt-nodejs');
const Promise = require('bluebird');
const mailgun = require('../mailgun');

const User = bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,

  constructor: function() {
    bookshelf.Model.apply(this, arguments);
    this.on('saving', this.validate, this);
    this.on('creating', this.hashPassword, this);
  },

  validations: {
    name: ['required'],
    email: ['required', 'email'],
    password: ['required']
  },

  validate: function() {
    return new Checkit(this.validations).run(this.toJSON());
  },

  hashPassword: function(model, attrs, options) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(model.attributes.password, null, null, function(err, hash) {
        if(err) {
          reject(err);
        }
        model.set('password', hash);
        resolve(hash);
      });
    });
  },

  checkPassword: function(password) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, this.attributes.password, function(err, result) {
        if(err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },

  sendMail: function(subject, text) {
    return mailgun.sendMail(this.attributes.email, subject, text);
  }
});

module.exports = User;
