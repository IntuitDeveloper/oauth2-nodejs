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
      const response = await sgMail.send(msg);
      if(!response === false){
        return true;
      }
      return false;
  };
