import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './chat.css'; // Make sure your CSS file is named this or update the path

const LearntendoChat = () => {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSendMessage = async () => {
    const trimmedInput = userInput.trim();
    if (!trimmedInput) return;

    const newUserMessage = { sender: 'You', message: trimmedInput };
    setChatHistory([...chatHistory, newUserMessage]);
    setUserInput('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8003/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_input: trimmedInput }),
      });

      const data = await response.json();
      const botMessage = { sender: 'Bot', message: data.message };
      setChatHistory((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('❌ Error:', error);
      const errorMessage = {
        sender: 'Bot',
        message: 'Sorry, something went wrong while getting a response.',
      };
      setChatHistory((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="learntendo-chat-container">
      <div className="learntendo-chat-box">
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className={
              chat.sender === 'You'
                ? 'learntendo-user-message'
                : 'learntendo-bot-message'
            }
          >
            <ReactMarkdown>{chat.message}</ReactMarkdown>
          </div>
        ))}
        {loading && <p className="learntendo-loading">Typing...</p>}
      </div>

      <div className="learntendo-input-container">
        <input
          type="text"
          className="learntendo-input"
          placeholder="Ask me anything!"
          value={userInput}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button className="learntendo-send-button" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default LearntendoChat;




// import React, { useState, useEffect } from 'react';
// import ReactMarkdown from 'react-markdown';
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
// import './chat.css'; // Scoped styling

// const API_BASE_URL = 'http://localhost:8003'; // Backend port

// const LearntendoChat = () => {
//   const [userInput, setUserInput] = useState('');
//   const [chatHistory, setChatHistory] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [conversationList, setConversationList] = useState([]);
//   const [activeConversationId, setActiveConversationId] = useState(null);
//   const { transcript, resetTranscript, listening } = useSpeechRecognition();

//   useEffect(() => {
//     fetchConversations();
//   }, []);

//   const fetchConversations = async () => {
//     try {
//       const res = await fetch(`${API_BASE_URL}/chat`);
//       if (!res.ok) throw new Error('Failed to fetch conversations');
//       const data = await res.json();
//       setConversationList(data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const loadConversation = async (id) => {
//     try {
//       const res = await fetch(`${API_BASE_URL}/chat/${id}`);
//       if (!res.ok) throw new Error('Failed to load conversation');
//       const data = await res.json();
//       setChatHistory(data.messages.map((m, i) => ({
//         sender: i % 2 === 0 ? 'You' : 'Bot',
//         message: m,
//       })));
//       setActiveConversationId(id);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const sanitizeForSpeech = (text) => {
//     return text.replace(/[\u{1F600}-\u{1F64F}$#@*]/gu, '');
//   };

//   const handleSendMessage = async (customInput) => {
//     const input = customInput || userInput.trim();
//     if (!input) return;

//     const newUserMessage = { sender: 'You', message: input };
//     setChatHistory(prev => [...prev, newUserMessage]);
//     setUserInput('');
//     setLoading(true);

//     try {
//       const res = await fetch(`${API_BASE_URL}/chat`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           user_input: input,
//           conversation_id: activeConversationId,
//         }),
//       });

//       const data = await res.json();

//       const newBotMessage = { sender: 'Bot', message: data.message };
//       setChatHistory(prev => [...prev, newBotMessage]);
//       setActiveConversationId(data.conversation_id);
//       fetchConversations();

//       const sanitizedText = sanitizeForSpeech(data.message);
//       const speech = new SpeechSynthesisUtterance(sanitizedText);
//       window.speechSynthesis.speak(speech);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVoiceStart = () => {
//     resetTranscript();
//     SpeechRecognition.startListening({ continuous: false, language: 'en-US' });
//   };

//   const handleVoiceSend = () => {
//     SpeechRecognition.stopListening();
//     handleSendMessage(transcript);
//   };

//   return (
//     <div className="learntendo-chat-container">
//       <div className="learntendo-sidebar">
//         <h3>Conversations</h3>
//         {conversationList.map((conv, i) => (
//           <div
//             key={i}
//             className={`learntendo-conv-item ${activeConversationId === conv.id ? 'active' : ''}`}
//             onClick={() => loadConversation(conv.id)}
//           >
//             {conv.title || `Chat ${i + 1}`}
//           </div>
//         ))}
//       </div>

//       <div className="learntendo-chat-main">
//         <div className="learntendo-chat-window">
//           {chatHistory.map((chat, index) => (
//             <div
//               key={index}
//               className={chat.sender === 'You' ? 'learntendo-user-msg' : 'learntendo-bot-msg'}
//             >
//               <ReactMarkdown>{chat.message}</ReactMarkdown>
//             </div>
//           ))}
//           {loading && <div className="learntendo-loading">Typing...</div>}
//         </div>

//         <div className="learntendo-input-area">
//           <input
//             type="text"
//             value={userInput}
//             onChange={(e) => setUserInput(e.target.value)}
//             onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
//             placeholder="Type or use the mic..."
//           />
//           <button className="learntendo-send-btn" onClick={handleSendMessage}>
//             <i className="fa fa-paper-plane"></i>
//           </button>
//           <button className="learntendo-voice-btn" onClick={handleVoiceStart}>
//             <i className="fa fa-microphone"></i>
//           </button>
//           <button className="learntendo-send-voice-btn" onClick={handleVoiceSend}>
//             <i className="fa fa-volume-up"></i>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LearntendoChat;
