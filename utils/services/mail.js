import nodemailer from "nodemailer";

export async function sendMail(subject, toEmail, html) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PW,
    },
  });

  var mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: toEmail,
    subject: subject,
    html: html,
  };

  await new Promise((res, rej) => {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        rej(error);
        throw new Error(error);
      } else {
        res(info);
        console.log("Email Sent");
        return true;
      }
    });
  });
}
