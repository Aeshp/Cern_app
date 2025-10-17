import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [history, setHistory] = useState([
    {
      role: 'cern',
      content: "Hello! Welcome to Regime. I'm Cern, your product specialist. How can I assist you today?",
      thought: "Initial greeting message for the user."
    }
  ]);
  const [userPrompt, setUserPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [visibleThoughtIndex, setVisibleThoughtIndex] = useState(null);
  const [sessionId, setSessionId] = useState(null);

  const chatWindowRef = useRef(null);

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const existingSessionId = localStorage.getItem('cernSessionId');
    if (existingSessionId) {
      setSessionId(existingSessionId);
    }
  }, []); 

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!userPrompt.trim() || isLoading) return;

    const newUserMessage = { role: 'user', content: userPrompt };
    const currentHistory = [...history, newUserMessage];
    setHistory(currentHistory);

    setIsLoading(true);
    setUserPrompt('');

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: sessionId, 
          userPrompt: userPrompt
        })
      });

      if (!response.ok) {
        if (response.status >= 500) {
            throw new Error("Server error. Please try again later.");
        } else if (response.status >= 400) {
            throw new Error("There was a problem with your request. Please try rephrasing.");
        }
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();

      const cernMessage = {
        role: 'cern',
        content: data.cern_response,
        thought: data.thought_process
      };

      setHistory([...currentHistory, cernMessage]);

      // save seisson id
      if (data.sessionId) {
        setSessionId(data.sessionId);
        // saving in browser cache for next time
        localStorage.setItem('cernSessionId', data.sessionId);
      }

    } catch (error) {
      console.error("Failed to fetch from API:", error);
      const errorResponse = { role: 'cern', content: error.message || "I'm sorry, I'm having trouble connecting to my systems right now. Please try again in a moment." };
      
      setHistory(prevHistory => [...prevHistory, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleThoughtVisibility = (index) => {
    setVisibleThoughtIndex(visibleThoughtIndex === index ? null : index);
  };


  return (
    <div className="App">
      <header className="chat-header">
        <div className="header-content">
          <span className="sparkle left">✦</span>
          <div className="logo-container">
            <svg className="logo-icon" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="48" height="48" rx="12" fill="#1E40AF"/>
              <circle cx="24" cy="18" r="3" fill="white"/>
              <rect x="18" y="28" width="4" height="8" rx="1" fill="white"/>
              <rect x="24" y="28" width="4" height="8" rx="1" fill="white"/>
              <rect x="30" y="28" width="4" height="8" rx="1" fill="white"/>
            </svg>
            <h1>Cern</h1>
          </div>
          <span className="sparkle right">✦</span>
        </div>
      </header>

      <div className="chat-window" ref={chatWindowRef}>
        {history.map((message, index) => (
          <div key={index} className={`message-wrapper ${message.role}`}>
            <div className="message-bubble">{message.content}</div>

            {message.role === 'cern' && message.thought && (
              <button onClick={() => toggleThoughtVisibility(index)} className="thought-toggle-button">
                {visibleThoughtIndex === index ? 'Hide Thought' : 'Show Thought'}
              </button>
            )}

            {visibleThoughtIndex === index && message.thought && (
              <div className="thought-bubble">
                <strong>Cern's Thought Process:</strong>
                <p>{message.thought}</p>
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="message-wrapper cern">
            <div className="message-bubble">
              <div className="dot-flashing"></div>
            </div>
          </div>
        )}
      </div>

      <div className="chat-input-container">
        <form onSubmit={handleSubmit} className="chat-input-form">
          <input
            type="text"
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            placeholder="What do you want to ask CERN?"
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading || !userPrompt.trim()} title="Send Message">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
