const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  contact_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  nickname: String,
  is_muted: { type: Boolean, default: false },
  is_blocked: { type: Boolean, default: false }
}, { _id: false });

const UserSchema = new mongoose.Schema({
    username : { type: String, required:true, unique: true, sparse: true },
    email: { type: String, required:true, unique: true, sparse: true },
    verifed : {type : Boolean, default : false},
    phone_number: { type: String, unique: true, default: null },
    password: { type: String, required:true},
    display_name: {type: String, default: function(){return this.username}},
    profile_photo_url: {type:String, default: function(){return `https://api.dicebear.com/5.x/initials/svg?seed=${this.username}`}},
    bio: {type: String, default: 'Hey there! I am using this Vibyo.'},
    is_online: { type: Boolean, default: false },
    last_seen: { type: Date, default: Date.now },
    contacts: [ContactSchema],
    blocked_users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    is_discoverable: { type: Boolean, default: true },
    settings: {
    privacy: {
      last_seen: { type: String, enum: ['everyone', 'contacts', 'nobody'], default: 'everyone' },
      profile_photo: { type: String, enum: ['everyone', 'contacts', 'nobody'], default: 'everyone' }
    },
    notifications: {
      message: { type: String, enum: ['enabled', 'muted'], default: 'enabled' }
    },
    device_info: {
    device_type: { type: String, enum: ['web', 'android', 'ios'], default: 'web' },
    last_active: Date
    },
    stories: [{
    media_url: String,
    media_type: { type: String, enum: ['image', 'video'] },
    caption: String,
    posted_at: { type: Date, default: Date.now },
    viewers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    expires_at: Date
  }],
  saved_messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }]
},
})

const User = mongoose.model('User', UserSchema);
module.exports = User;