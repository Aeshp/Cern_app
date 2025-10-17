require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const crypto = require('crypto'); 
const Conversation = require('./models/Conversation'); 

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Successfully connected to MongoDB Atlas!'))
  .catch(err => console.error('Connection error', err));

const app = express();
const PORT = 8000;

app.use(cors()); 
app.use(express.json()); 

app.get('/', (req, res) => {
  res.send('Cern Logic Backend is running!');
});

app.post('/api/chat', async (req, res) => {
  try {

    let { sessionId, userPrompt } = req.body;
    let conversation;

    
    if (!sessionId) {
      sessionId = crypto.randomUUID(); 
      conversation = new Conversation({
        sessionId,
        messages: [],
      });
    } else {
    
      conversation = await Conversation.findOne({ sessionId });
      
      if (!conversation) {
        conversation = new Conversation({ sessionId, messages: [] });
      }
    }

    conversation.messages.push({ role: 'user', content: userPrompt });

    
    const cernResponseContent = "This is a test response from the new backend!";
    
    conversation.messages.push({ role: 'cern', content: cernResponseContent });

    await conversation.save();

    res.json({
      cern_response: cernResponseContent,
      thought_process: "I am testing the new database connection.",
      sessionId: conversation.sessionId 
    });

  } catch (error) {
    console.error("Error in /api/chat:", error);
    res.status(500).json({ error: "Something went wrong on the server." });
  }
});


app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
  
});
