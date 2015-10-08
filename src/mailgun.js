const Mailgun = require('mailgun').Mailgun;
const config = require('./config').mailgun;
const Promise = require('bluebird');

const mg = new Mailgun(config.key);

const sendMail = function(recipient, subject, text) {
  return new Promise((resolve, reject) => {
    mg.sendText(config.sender, [recipient], subject, text, (err) => {
      if(err) {
        reject(err);
      }
      resolve();
    });
  });
};

module.exports = {
  sendMail: sendMail
};
