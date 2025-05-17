const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_APP_EMAIL,
    pass: process.env.NODEMAILER_APP_PASSWORD,
  },
});


exports.sendEmail = async (email, subject, message) => {
  try {
    const info = await transporter.sendMail({
      to: email,
      subject: subject,
      html: message,
    });

    console.log("✅ Email sent:", info.response);
    return info;
  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw error;
  }
};

