import React, { useEffect, useRef, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { getAuthToken } from "../../services/auth";
import * as signalR from '@microsoft/signalr';
import linkhost from "../..";
import { useUserInfoStore } from '../../hooks/useUserInfo.js';


const DEFAULT_AVATAR = '/images/default-profile-avatar.jpg';


const UserChat = () => {
  const { userId: recipientId } = useParams();
  const location = useLocation();
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const connectionRef = useRef(null);
  const messagesEndRef = useRef(null);


  const { user, token } = getAuthToken();
  const senderId = user?.nameid;

  const recipientName =
    location.state?.userName ||
    new URLSearchParams(location.search).get('userName') ||
    recipientId;

  const recipientImage = location.state?.userImage ||
  new URLSearchParams(location.search).get('recipientImage') ||
  recipientId;

  const { userInformation } = useUserInfoStore();
  const senderImage = userInformation?.profileImage || DEFAULT_AVATAR;


  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory]);


  useEffect(() => {
    if (!senderId || !recipientId) return;

    fetchChatHistory();
    setupSignalRConnection();

    return () => {
      if (connectionRef.current) {
        connectionRef.current.stop();
      }
    };
  }, [senderId, recipientId]);

  

  const setupSignalRConnection = async () => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${linkhost}/ChatHub`, {
        accessTokenFactory: () => token,
      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

      connection.on("ReceiveMessage", (message) => {
        if (
          (message.senderId === senderId && message.receiverId === recipientId) ||
          (message.senderId === recipientId && message.receiverId === senderId)
        ) {
          // Prevent duplicates (based on content + timestamp)
          setChatHistory((prev) => {
            const exists = prev.some(
              (m) =>
                m.content === message.content &&
                m.senderId === message.senderId &&
                m.sentAt === message.sentAt
            );
            return exists ? prev : [...prev, message];
          });
        }
      });
      

    try {
      await connection.start();
      connectionRef.current = connection;
    } catch (error) {}
  };

  const fetchChatHistory = async () => {
    try {
      const res = await fetch(`${linkhost}/api/Chat/history/${senderId}/${recipientId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': '*/*',
        },
      });

      const data = await res.json();
      setChatHistory(data || []);
    } catch (error) {}
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSendMessage = async (inputText) => {
    const trimmedInput = (inputText ?? userInput).trim();
    if (!trimmedInput) return;

    setUserInput('');

    try {
      await fetch(`${linkhost}/api/Chat/send`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          senderId: senderId,
          receiverId :recipientId,
          content: trimmedInput,
          sentAt: new Date().toISOString()  
        }),
      });
    } catch (error) {} 
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div style={{ width: '100%', padding: '0 20px' }}>
      <h2 style={{ margin: '2px 0' }}>
      <img
        src={recipientImage || DEFAULT_AVATAR}
        alt={recipientName}
        className="user-avatar"
      />
        <strong style={{ color: 'var(--primary-color, #FF68AC)' }}>
          {recipientName}
        </strong>
      </h2>

      <div className="learntendo-communication-container" style={{ width: '100%' }}>
        <div className="learntendo-chat-box" >
        {chatHistory.map((chat, index) => {
          const isSender = chat?.senderId === senderId;
          const avatarUrl = isSender ? senderImage : recipientImage || DEFAULT_AVATAR;

          return (
            <div
              key={index}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: isSender ? 'flex-end' : 'flex-start',
                alignItems: 'flex-start',
                marginBottom: '12px',
              }}
            >
              {/* Avatar */}
              {!isSender && (
                <img
                  src={avatarUrl}
                  alt="avatar"
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    marginRight: '8px',
                  }}
                />
              )}

              {/* Message block */}
              <div style={{ maxWidth: '75%' }}>
                <div
                  style={{
                    fontSize: '23px',
                    fontWeight: 'bold',
                    marginBottom: '2px',
                    textAlign: isSender ? 'right' : 'left',
                  }}
                >
                  {/* Sender name */}
                  {isSender ? 'You' : recipientName}
                </div>

                <div
                  style={{
                    padding: '10px',
                    borderRadius: '16px',
                    wordBreak: 'break-word',
                    width: 'fit-content',
                    maxWidth: '100%',
                  }}
                  className={
                    isSender ? 'learntendo-user-message' : 'learntendo-bot-message'
                  }
                >
                  <p style={{fontSize: "20px"}}>{chat?.content}</p>

                  <div
                    style={{
                      fontSize: '15px',
                      color: '#eee',
                      opacity: 0.8  ,
                      marginTop: '6px',
                      textAlign: 'right',
                    }}
                  >
                    {new Date(chat.sentAt).toLocaleString([], {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}

                  </div>
                </div>
              </div>

              {isSender && (
                <img
                  src={avatarUrl}
                  alt="avatar"
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    marginLeft: '8px',
                  }}
                />
              )}
              <div ref={messagesEndRef} />
            </div>
          );
        })}



        </div>

        <div className="learntendo-input-container">
          <input
            type="text"
            className="learntendo-input"
            placeholder="message..."
            value={userInput}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <button
            className="learntendo-send-button"
            onClick={() => handleSendMessage()}
            title="Send message"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserChat;
