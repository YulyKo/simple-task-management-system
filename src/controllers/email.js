const nodemailer = require('nodemailer');
const { user, pass } = require('../../config/auth.config');
const { default: formTemplate } = require('../utils/formTemplate');

const transport = nodemailer.createTransport({
  service: 'TRASH-MAIL',
  auth: {
    user: user,
    pass: pass,
  },
});

module.exports.sendEmail = (name, email, confirmationCode) {
  transport.sendEmail({
    from: user,
    to: email,
    subject: "TMS - confirm your account",
    html: formTemplate(user, process.env.CONFIRN_PAGE_URL, confirmationCode),
  })
};
/*
Creately
One last thing to get you started!	
Hi juliakotenko.forstudy@gmail.com
Notification	Just one last step before you can draw some amazing diagrams. This will only take a few seconds, we promise :)
Confirm Email
This is an Auto-Generated mail. Do not reply to this.
You're receiving this email because you signed up for the Creately.com service.
Please go to help.creately.com for questions, help and suggestions.
*/