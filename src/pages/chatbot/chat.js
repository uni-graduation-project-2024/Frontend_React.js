// import React, { useState } from 'react';
// import ReactMarkdown from 'react-markdown';
// import './chat.css'; // Make sure your CSS file is named this or update the path

// const LearntendoChat = () => {
//   const [userInput, setUserInput] = useState('');
//   const [chatHistory, setChatHistory] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const handleInputChange = (e) => {
//     setUserInput(e.target.value);
//   };

//   const handleSendMessage = async () => {
//     const trimmedInput = userInput.trim();
//     if (!trimmedInput) return;

//     const newUserMessage = { sender: 'You', message: trimmedInput };
//     setChatHistory([...chatHistory, newUserMessage]);
//     setUserInput('');
//     setLoading(true);

//     try {
//       const response = await fetch('http://localhost:8003/chat', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ user_input: trimmedInput }),
//       });

//       const data = await response.json();
//       const botMessage = { sender: 'Bot', message: data.message };
//       setChatHistory((prev) => [...prev, botMessage]);
//     } catch (error) {
//       console.error('❌ Error:', error);
//       const errorMessage = {
//         sender: 'Bot',
//         message: 'Sorry, something went wrong while getting a response.',
//       };
//       setChatHistory((prev) => [...prev, errorMessage]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleSendMessage();
//     }
//   };

//   return (
//     <div className="learntendo-chat-container">
//       <div className="learntendo-chat-box">
//         {chatHistory.map((chat, index) => (
//           <div
//             key={index}
//             className={
//               chat.sender === 'You'
//                 ? 'learntendo-user-message'
//                 : 'learntendo-bot-message'
//             }
//           >
//             <ReactMarkdown>{chat.message}</ReactMarkdown>
//           </div>
//         ))}
//         {loading && <p className="learntendo-loading">Typing...</p>}
//       </div>

//       <div className="learntendo-input-container">
//         <input
//           type="text"
//           className="learntendo-input"
//           placeholder="Ask me anything!"
//           value={userInput}
//           onChange={handleInputChange}
//           onKeyPress={handleKeyPress}
//         />
//         <button className="learntendo-send-button" onClick={handleSendMessage}>
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LearntendoChat;



// import React, { useState, useRef } from 'react';
// import ReactMarkdown from 'react-markdown';
// import './chat.css';

// const LearntendoChat = () => {
//   const [userInput, setUserInput] = useState('');
//   const [chatHistory, setChatHistory] = useState([]);
//   const [loading, setLoading] = useState(false);
//   // Keep track of currently playing audio and its message index
//   const audioRef = useRef(null);
//   const [playingIndex, setPlayingIndex] = useState(null);

//   const handleInputChange = (e) => {
//     setUserInput(e.target.value);
//   };

//   const handleSendMessage = async () => {
//     const trimmedInput = userInput.trim();
//     if (!trimmedInput) return;

//     const newUserMessage = { sender: 'You', message: trimmedInput };
//     setChatHistory([...chatHistory, newUserMessage]);
//     setUserInput('');
//     setLoading(true);

//     try {
//       const response = await fetch('http://localhost:8003/chat', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ user_input: trimmedInput }),
//       });

//       const data = await response.json();
//       const botMessage = { sender: 'Bot', message: data.message };
//       setChatHistory((prev) => [...prev, botMessage]);
//     } catch (error) {
//       console.error('❌ Error:', error);
//       const errorMessage = {
//         sender: 'Bot',
//         message: 'Sorry, something went wrong while getting a response.',
//       };
//       setChatHistory((prev) => [...prev, errorMessage]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleSendMessage();
//     }
//   };

//   const playAudio = async (text, index) => {
//     try {
//       // If clicked the currently playing message: toggle pause/play
//       if (playingIndex === index) {
//         if (audioRef.current.paused) {
//           audioRef.current.play();
//         } else {
//           audioRef.current.pause();
//         }
//         return;
//       }

//       // If a different message clicked, stop previous audio
//       if (audioRef.current) {
//         audioRef.current.pause();
//         audioRef.current = null;
//       }

//       const response = await fetch('http://localhost:8003/tts', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ user_input: text }),
//       });

//       if (!response.ok) throw new Error('Failed to fetch audio');

//       const blob = await response.blob();
//       const audioUrl = URL.createObjectURL(blob);
//       const audio = new Audio(audioUrl);
//       audioRef.current = audio;

//       // When audio ends, reset playing index
//       audio.onended = () => {
//         setPlayingIndex(null);
//         audioRef.current = null;
//       };

//       await audio.play();
//       setPlayingIndex(index);
//     } catch (error) {
//       console.error('🎧 Audio error:', error);
//     }
//   };

//   return (
//     <div className="learntendo-chat-container">
//       <div className="learntendo-chat-box">
//         {chatHistory.map((chat, index) => (
//           <div
//             key={index}
//             className={
//               chat.sender === 'You'
//                 ? 'learntendo-user-message'
//                 : 'learntendo-bot-message'
//             }
//           >
//             <ReactMarkdown>{chat.message}</ReactMarkdown>
//             {chat.sender === 'Bot' && (
//               <button
//                 className="learntendo-audio-button"
//                 onClick={() => playAudio(chat.message, index)}
//                 title={playingIndex === index ? "Pause audio" : "Play audio"}
//               >
//                 {playingIndex === index ? '⏸️' : '🔊'}
//               </button>
//             )}
//           </div>
//         ))}
//         {loading && <p className="learntendo-loading">Typing...</p>}
//       </div>

//       <div className="learntendo-input-container">
//         <input
//           type="text"
//           className="learntendo-input"
//           placeholder="Ask me anything!"
//           value={userInput}
//           onChange={handleInputChange}
//           onKeyPress={handleKeyPress}
//         />
//         <button className="learntendo-send-button" onClick={handleSendMessage}>
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LearntendoChat;


import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import './chat.css';

const LearntendoChat = () => {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);
  const audioRef = useRef(null);
  const [playingIndex, setPlayingIndex] = useState(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech Recognition API not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'ar-SA'; // Arabic Saudi dialect
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setUserInput(transcript);
      handleSendMessage(transcript);
    };

    recognitionRef.current = recognition;
  }, []);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSendMessage = async (inputText) => {
    const trimmedInput = (inputText ?? userInput).trim();
    if (!trimmedInput) return;

    const newUserMessage = { sender: 'You', message: trimmedInput };
    setChatHistory((prev) => [...prev, newUserMessage]);
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

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (listening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  const playAudio = async (text, index) => {
    try {
      if (playingIndex === index) {
        if (audioRef.current.paused) {
          await audioRef.current.play();
        } else {
          audioRef.current.pause();
        }
        return;
      }

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      const response = await fetch('http://localhost:8003/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_input: text }),
      });

      if (!response.ok) throw new Error('Failed to fetch audio');

      const blob = await response.blob();
      const audioUrl = URL.createObjectURL(blob);
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onended = () => {
        setPlayingIndex(null);
        audioRef.current = null;
      };

      await audio.play();
      setPlayingIndex(index);
    } catch (error) {
      console.error('🎧 Audio error:', error);
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
            {chat.sender === 'Bot' && (
              <button
                className="learntendo-audio-button"
                onClick={() => playAudio(chat.message, index)}
                title={playingIndex === index ? 'Pause audio' : 'Play audio'}
              >
                {playingIndex === index ? '⏸️' : '🔊'}
              </button>
            )}
          </div>
        ))}
        {loading && <p className="learntendo-loading">Typing...</p>}
      </div>

      <div className="learntendo-input-container">
        <input
          type="text"
          className="learntendo-input"
          placeholder="Ask anything"
          value={userInput}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          disabled={loading}
        />

        <button
          className="learntendo-send-button"
          onClick={() => handleSendMessage()}
          disabled={loading}
          title="Send message"
        >
          Send
        </button>

        <button
          className={`learntendo-mic-button ${listening ? 'listening' : ''}`}
          onClick={toggleListening}
          title={listening ? 'Stop listening' : 'Speak your question'}
          disabled={loading}
          aria-label="Toggle microphone"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill={listening ? '#10B981' : 'currentColor'}
            stroke="none"
          >
            <path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3z" />
            <path d="M19 10v1a7 7 0 0 1-14 0v-1" />
            <line
              x1="12"
              y1="19"
              x2="12"
              y2="23"
              stroke="currentColor"
              strokeWidth="2"
            />
            <line
              x1="8"
              y1="23"
              x2="16"
              y2="23"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default LearntendoChat;
