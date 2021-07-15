var config = require('../config.json')
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(config.sendGrid_API)

module.exports =  sendEmail = async (receiver, source, subject, content) => {

      const msg = {
        to: receiver,
        from: source,
        subject,
        html: content,
      };
     await sgMail.send(msg)
          .then(() => {
            console.log('Email sent')
            return "Success"
          })
          .catch((error) => {
            console.error(error)
            return error
          })
  };
