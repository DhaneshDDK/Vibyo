const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  chat_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: {
    text: String,
    media_url: String,
    media_type: { type: String, enum: ['image', 'video', 'audio', 'file', null], default: null }
  },
  reply_to: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
  thread_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Thread' },
  reactions: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    emoji: String,
    reacted_at: { type: Date, default: Date.now }
  }],
  is_deleted_for_everyone: { type: Boolean, default: false },
  deleted_for: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  edited_at: Date,
  is_scheduled: { type: Boolean, default: false },
  scheduled_at: Date,
  expires_at: Date,
  created_at: { type: Date, default: Date.now }
});
MessageSchema.index({ expires_at: 1 }, { expireAfterSeconds: 0 });
MessageSchema.index({ chat_id: 1, created_at: -1 });

const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;