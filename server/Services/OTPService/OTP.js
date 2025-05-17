const crypto = require('crypto');
const {sendEmail} = require('../MailServices/Email')
const {InsertOTP,fetchOTP} = require('../DBServices/OTP');
const OTPTemplate = require('../MailServices/EmailTemplates/OTP');

function generateOtp() {
  const otp = crypto.randomInt(100000, 1000000); // min inclusive, max exclusive
  return otp.toString();
}

exports.SendOTP = async (email,userId)=>{
    try {
      const otp = generateOtp();
      const insertedOTP = await InsertOTP(userId,otp);
      sendEmail(email,"Vibyo: Email Verification", OTPTemplate(otp));
    } catch (error) {
      console.log("Error while sending OTP", error);
      throw error;
    }
}

exports.FetchOTP = async(userId)=>{
   try {
      const otp = await fetchOTP(userId);
      return otp;
   } catch (error) {
      console.log(error);
      throw error;
   }
}