// import mg from 'mailgun-js';
var mg = require('mailgun-js');
const mailgun = () =>
  mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  });

module.exports = { mailgun };
