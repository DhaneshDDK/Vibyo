const axios = require('axios')

exports.sendEmail = async (email)=>{
    console.log(email)
  try {
    const emailService = ` http://localhost:4000/sendEmail`;
    await axios.post(emailService, email, {
    headers: { 
        'Content-Type': 'application/x-www-form-urlencoded', 
    }
   });
   console.log("Email request sent");
   return;
  } catch (error) {
    console.log(error);
    return;
  }
}
