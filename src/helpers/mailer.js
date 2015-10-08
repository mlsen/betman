const Mailgun = require('mailgun').Mailgun;
const config = require('../config').mailgun;
const Promise = require('bluebird');
const queue = require('./kue');

const mg = new Mailgun(config.key);

queue.process('email', function(job, done) {
  mg.sendText(config.sender, [job.data.recipient], job.data.subject, job.data.text, (err) => {
    done(err);
  });
});

function email(data) {
  queue.create('email', {
    recipient: data.recipient,
    subject: data.subject,
    text: data.text
  }).save();
}

module.exports = email;
