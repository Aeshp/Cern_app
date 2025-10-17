const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['user', 'cern'],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const conversationSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true, 
  },
  messages: [messageSchema], 
}, { timestamps: true }); 

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;

