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
    verified : {type : Boolean, default : false},
    phone_number: { type: String, default: null },
    password: { type: String, required:true},
    display_name: {type: String, default: function(){return this.username}},
    profile_photo_url: {type:String, default: function(){return `https://api.dicebear.com/5.x/initials/svg?seed=${this.username}`}},
    bio: {type: String, default: 'Hey there! I am using this Vibyo.'},
    is_online: { type: Boolean, default: false },
    last_seen: { type: Date, default: Date.now },
    contacts: [ContactSchema],
    blocked_contacts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    is_discoverable: { type: Boolean, default: true },
    settings: {
    privacy: {
    last_seen: {
      type: String,
      enum: ['everyone', 'contacts', 'nobody'],
      default: 'everyone'
    },
    profile_photo: {
      type: String,
      enum: ['everyone', 'contacts', 'nobody'],
      default: 'everyone'
    },
    read_receipts: {
      type: Boolean,
      default: true
    },
    status_visibility: {
      type: String,
      enum: ['everyone', 'contacts', 'nobody'],
      default: 'contacts'
    },
    },
      notifications: {
    message: {
      type: String,
      enum: ['enabled', 'muted'],
      default: 'enabled'
    },
    call: {
      type: String,
      enum: ['enabled', 'muted'],
      default: 'enabled'
    },
    vibration: {
      type: Boolean,
      default: true
    },
    sound: {
      type: String,
      default: 'default'
    }
  },

  appearance: {
    theme: {
      type: String,
      enum: ['light', 'dark', 'system'],
      default: 'system'
    },
    font_size: {
      type: String,
      enum: ['small', 'medium', 'large'],
      default: 'medium'
    }
  },

  chat: {
    enter_to_send: {
      type: Boolean,
      default: true
    },
    media_auto_download: {
      wifi: { type: Boolean, default: true },
      mobile_data: { type: Boolean, default: false }
    },
    chat_backup: {
      enabled: { type: Boolean, default: false },
      frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly'],
        default: 'weekly'
      },
      last_backup: Date
    }
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