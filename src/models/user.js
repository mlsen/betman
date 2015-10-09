const bookshelf = require('../helpers/bookshelf');
const Checkit = require('checkit');
const bcrypt = require('bcrypt-nodejs');
const Promise = require('bluebird');
const email = require('../helpers/mailer');
const utils = require('../helpers/utils');

const User = bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,

  constructor: function() {
    bookshelf.Model.apply(this, arguments);
    this.on('saving', this.validate, this);
    this.on('creating', this.hashPassword, this);
    this.on('creating', this.createActivationKey, this);
    this.on('created', this.sendActivationEmail, this);
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

  email: function(data) {
    return email({
      recipient: this.attributes.email,
      subject: data.subject,
      text: data.text
    });
  },

  createActivationKey: function(model) {
    const key = utils.makeRandomString(15);
    model.set('activation_key', key);
  },

  sendActivationEmail: function(model) {
    model.email({
      subject: 'Activate your account',
      text: 'Here you go: ' + model.attributes.activation_key
    });
  }

});

module.exports = User;
