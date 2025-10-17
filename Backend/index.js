require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const crypto = require('crypto');
const Conversation = require('./models/Conversation');
const axios = require('axios');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('successfully connected to mongoDB'))
  .catch(err => console.error('connection error', err));

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Cern Backend is running!');
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

    const historyForAI = conversation.messages.map(({ role, content }) => ({
      role,
      content,
    }));

    const hfApiResponse = await axios.post(process.env.HF_BACKEND_API_URL, {
      history: historyForAI,
      user_prompt: userPrompt
    });


    const { cern_response, thought_process } = hfApiResponse.data
    conversation.messages.push({ role: 'cern', content: cern_response });

    await conversation.save();

    res.json({
      cern_response: cern_response,
      thought_process: thought_process,
      sessionId: conversation.sessionId
    });

  } catch (error) {
    console.error("Error in /api/chat:", error);
    res.status(500).json({ error: "Something went wrong on the server." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});