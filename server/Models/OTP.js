const mongoose = require('mongoose');

const OTPSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  otp : { type: String, required: true },
  device_info: {
    device_type: { type: String, enum: ['web', 'android', 'ios'], default: 'web' },
  },
  created_at: { type: Date, default: Date.now },
  expires_at: { type: Date }
});
OTPSchema.index({ expires_at: 1 }, { expireAfterSeconds: 0 });


const OTP = mongoose.model('OTP', OTPSchema);
module.exports = OTP;