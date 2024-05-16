const nodemailer = require("nodemailer");

class Mailer {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "techJoyMailer22@gmail.com",
        pass: "sbkjkcwyjkuhldze",
      },
    });
  }

  sendEmail(To, subject, text, html) {
    const mailOptions = {
      from: "techJoyMailer22@gmail.com",
      to: To,
      subject,
      text,
      html,
    };

    this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }
}

module.exports = Mailer;
