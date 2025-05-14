const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  refresh_token: { type: String, required: true },
  device_info: {
    device_type: { type: String, enum: ['web', 'android', 'ios'], default: 'web' },
  },
  created_at: { type: Date, default: Date.now },
  expires_at: { type: Date }
});
TokenSchema.index({ expires_at: 1 }, { expireAfterSeconds: 0 });


const Token = mongoose.model('Token', TokenSchema);
module.exports = Token;