const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  is_group: { type: Boolean, default: false },
  is_public: { type: Boolean, default: false },
  type: { type: String, enum: ['private', 'group', 'channel'], default: 'private' },
  name: String,
  description: String,
  group_photo_url: String,
  invite_link: String,
  admins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  pinned_message: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

const Chat = mongoose.model('Chat', ChatSchema);
module.exports = Chat;