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


exports.sendEmail = async (req,res) => {
  try {
    const {email, subject, message} = req.body;
    console.log('*****************************',email,subject,message,req.body);
    const info = await transporter.sendMail({
      from : "Vibyo",
      to: email,
      subject: subject,
      html: message,
    });

    console.log("✅ Email sent:", info.response);
    return res.status(200).json({
      message : "Email sent",
      data : info
    })
  } catch (error) {
    console.error("❌ Error sending email:", error);
    return res.status(500).json({
      message : "Error sending email",
      error : error.message
    })
  }
};

