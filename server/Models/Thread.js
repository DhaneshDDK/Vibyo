const mongoose = require('mongoose');

const ThreadSchema = new mongoose.Schema({
  root_message: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }]
});

const Thread = mongoose.model('Thread', ThreadSchema);  
module.exports = Thread;