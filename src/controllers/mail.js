const nodemailer = require('nodemailer');
const { user, pass } = require('../../config/auth.config');
const { template } = require('../utils/formTemplate');
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config.json')[env];

const transport = nodemailer.createTransport({
  service: 'Gmail',
  // host: 'google.com', // hostname
  secure: false, // use SSL
  port: 25, // port for secure SMTP
  auth: {
    user: user,
    pass: pass,
  },
  tls: {
    rejectUnauthorized: false
  },
});

const mailOptions = (name, email, confirmationCode) => {
  const url = env === 'production' ? process.env.CONFIRM_PAGE_URL : config.confirm_page_url;
  return  {
    from: user,
    to: email,
    subject: 'TMS - confirm your account',
    html: template(name, url, confirmationCode),
  };
};

module.exports.sendMail = (name, email, confirmationCode) => {
  transport.sendMail(
    mailOptions(name, email, confirmationCode),
    function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    }
  );
};
/* email reference:
Creately
One last thing to get you started!	
Hi juliakotenko.forstudy@gmail.com
Notification	Just one last step before you can draw some amazing diagrams. This will only take a few seconds, we promise :)
Confirm Email
This is an Auto-Generated mail. Do not reply to this.
You're receiving this email because you signed up for the Creately.com service.
Please go to help.creately.com for questions, help and suggestions.
*/