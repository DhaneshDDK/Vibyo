const OTP = require('../../Models/OTP');

exports.InsertOTP = async (userId,otp)=>{
   try {
      const existingOTP = await OTP.findOne({user : userId});
      if(existingOTP){
        existingOTP.otp = otp;
        existingOTP.expires_at = new Date(Date.now() + 5*60*1000);
        await existingOTP.save();
      }else{
      const newOTP = new OTP({
      user: userId,
      otp: otp,
      expires_at: new Date(Date.now() + 5*60*1000) // 5 min
      });
      await newOTP.save();
      }
      return;
   } catch (error) {
     console.error("Error inserting token:", error);
     throw error;
   }
}

exports.fetchOTP = async (userId)=>{
   try {
      const existingOTP = await OTP.findOne({user : userId});
      return existingOTP;
   } catch (error) {
      console.error("Error fetching token:", error);
      throw error;
   }
}

exports.deleteOTP = async(userId)=>{
    try {
      const deletedOTP = await OTP.findOneAndDelete({user : userId});
      if (!deletedOTP) {
            throw new Error("Refresh token not found");
        }  
      return deletedOTP.otp;
   } catch (error) {
      console.error("Error fetching token:", error);
      throw error;
   }
}