const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // 2) Define the email option
  const mailOptions = {
    from: "Rashad Stack <sayhello@rashadstack.com",
    to: options.email,
    subject: options.subject,
    text: options.body,

    // html:
  };

  // 3) Finally send the Email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
