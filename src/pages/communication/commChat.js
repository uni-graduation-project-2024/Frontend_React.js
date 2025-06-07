import React, { useEffect, useState, useRef } from 'react';
import * as signalR from '@microsoft/signalr';
import axios from 'axios';
import './commChat.css';

const CommChat = () => {
  const [connection, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(`User${Math.floor(Math.random() * 1000)}`);
  const [message, setMessage] = useState('');
  const fileId = 2023; // Adjust as needed (e.g., from route or props)
  const chatEndRef = useRef(null);

  // Scroll to bottom
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Load chat history
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/comments?fileId=${fileId}`) // Update if needed
      .then((res) => {
        const formatted = res.data.map((c) => ({
          user: c.userName,
          message: c.text,
          timestamp: c.timestamp,
        }));
        setMessages(formatted);
      })
      .catch((err) => console.error('Loading messages failed:', err));
  }, []);

  // Setup SignalR connection
  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5000/chatHub')
      .withAutomaticReconnect()
      .build();
    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          console.log('Connected to SignalR hub');
          connection.on('ReceiveMessage', (userName, text) => {
            setMessages((prev) => [
              ...prev,
              { user: userName, message: text, timestamp: new Date().toISOString() },
            ]);
          });
        })
        .catch((err) => console.error('SignalR error:', err));
    }
  }, [connection]);

  useEffect(scrollToBottom, [messages]);

  // Send chat message
  const sendMessage = async () => {
    if (message.trim() && connection) {
      try {
        // SignalR send
        await connection.invoke('SendMessage', user, message);

        // Axios post to DB
        await axios.post('http://localhost:5000/api/comments/add', {
          fileId: fileId,
          userId: user.toLowerCase(),
          userName: user,
          text: message,
          timestamp: new Date().toISOString(),
        });

        setMessage('');
      } catch (err) {
        console.error('Send message failed:', err);
      }
    }
  };

  return (
    <div className="chat-container">
      <h2 className="chat-title">CommChat</h2>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.user === user ? 'self' : 'other'}`}
          >
            <span className="chat-user">{msg.user}:</span>
            <span className="chat-text">{msg.message}</span>
            <span className="chat-time">
              {new Date(msg.timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          placeholder="Type a message..."
          className="chat-input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button className="chat-send-btn" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default CommChat;
