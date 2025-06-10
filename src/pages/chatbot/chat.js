// import React, { useState, useRef, useEffect } from 'react';
// import ReactMarkdown from 'react-markdown';
// import './chat.css';

// const LearntendoChat = () => {
//   const [userInput, setUserInput] = useState('');
//   const [chatHistory, setChatHistory] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [listening, setListening] = useState(false);
//   const [playingIndex, setPlayingIndex] = useState(null);
//   const [audioLoadingIndex, setAudioLoadingIndex] = useState(null);

//   const recognitionRef = useRef(null);
//   const audioRef = useRef(null);
//   const transcriptRef = useRef('');

//   useEffect(() => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (!SpeechRecognition) {
//       alert('Speech Recognition API not supported in this browser.');
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.lang = 'ar-SA';
//     recognition.interimResults = false;
//     recognition.maxAlternatives = 1;

//     recognition.onstart = () => {
//       setListening(true);
//       transcriptRef.current = '';
//     };

//     recognition.onresult = (event) => {
//       transcriptRef.current = event.results[0][0].transcript;
//       setUserInput(transcriptRef.current);
//     };

//     recognition.onend = () => {
//       setListening(false);
//     };

//     recognitionRef.current = recognition;
//   }, []);

//   const handleInputChange = (e) => setUserInput(e.target.value);

//   const handleSendMessage = async (inputText) => {
//     const trimmedInput = (inputText ?? userInput).trim();
//     if (!trimmedInput) return;

//     const newUserMessage = { sender: 'You', message: trimmedInput };
//     setChatHistory((prev) => [...prev, newUserMessage]);
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
//     if (e.key === 'Enter') handleSendMessage();
//   };

//   const toggleListening = () => {
//     const recognition = recognitionRef.current;
//     if (!recognition) return;

//     if (!listening) {
//       recognition.start();
//     } else {
//       recognition.stop();
//       const finalTranscript = transcriptRef.current.trim();
//       if (finalTranscript) {
//         handleSendMessage(finalTranscript);
//         transcriptRef.current = '';
//       }
//     }
//   };

//   const playAudio = async (text, index) => {
//     try {
//       if (playingIndex === index && audioRef.current) {
//         if (audioRef.current.paused) {
//           await audioRef.current.play();
//         } else {
//           audioRef.current.pause();
//         }
//         return;
//       }

//       if (audioRef.current) {
//         audioRef.current.pause();
//         audioRef.current = null;
//         setPlayingIndex(null);
//       }

//       setAudioLoadingIndex(index);

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

//       audio.onended = () => {
//         setPlayingIndex(null);
//         audioRef.current = null;
//       };

//       await audio.play();
//       setPlayingIndex(index);
//     } catch (error) {
//       console.error('🎧 Audio error:', error);
//     } finally {
//       setAudioLoadingIndex(null);
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
//                 disabled={audioLoadingIndex === index}
//               >
//                 {audioLoadingIndex === index ? (
//                   <span className="spinner"></span>
//                 ) : playingIndex === index ? (
//                   '⏸️'
//                 ) : (
//                   '🔊'
//                 )}
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
//           placeholder="Ask anything"
//           value={userInput}
//           onChange={handleInputChange}
//           onKeyPress={handleKeyPress}
//           disabled={loading}
//         />

//         <button
//           className="learntendo-send-button"
//           onClick={() => handleSendMessage()}
//           disabled={loading}
//           title="Send message"
//         >
//           Send
//         </button>

//         <button
//           className={`learntendo-mic-button ${listening ? 'listening' : ''}`}
//           onClick={toggleListening}
//           title={listening ? 'Stop & Send' : 'Speak your question'}
//           disabled={loading}
//           aria-label="Toggle microphone"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="20"
//             height="20"
//             viewBox="0 0 24 24"
//             fill={listening ? '#10B981' : 'currentColor'}
//             stroke="none"
//           >
//             <path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3z" />
//             <path d="M19 10v1a7 7 0 0 1-14 0v-1" />
//             <line x1="12" y1="19" x2="12" y2="23" stroke="currentColor" strokeWidth="2" />
//             <line x1="8" y1="23" x2="16" y2="23" stroke="currentColor" strokeWidth="2" />
//           </svg>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LearntendoChat;

import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import './chat.css';
import { Navigate, Outlet } from 'react-router-dom';
import { getAuthToken } from '../../services/auth';
import Sidebar from './side-bar';

const LearntendoChat = () => {
  const { token, user } = getAuthToken();
  const username = user?.email || 'guest';

  const [userInput, setUserInput] = useState('');
  const [chatSessions, setChatSessions] = useState(() => {
    const saved = localStorage.getItem(`learntendo_chat_sessions_${username}`);
    return saved ? JSON.parse(saved) : {};
  });

  const getToday = () => new Date().toISOString().split('T')[0];

  const [currentDate, setCurrentDate] = useState(() => {
    const today = getToday();
    const sessionKey = Object.keys(chatSessions).find(k => k.startsWith(today)) || `${today} - untitled`;
    return sessionKey;
  });

  const [chatHistory, setChatHistory] = useState(() => {
    const saved = localStorage.getItem(`learntendo_chat_sessions_${username}`);
    const sessions = saved ? JSON.parse(saved) : {};
    return sessions[currentDate] || [];
  });

  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [audioLoadingIndex, setAudioLoadingIndex] = useState(null);

  const recognitionRef = useRef(null);
  const audioRef = useRef(null);
  const transcriptRef = useRef('');

  const saveSessions = (updatedSessions) => {
    localStorage.setItem(`learntendo_chat_sessions_${username}`, JSON.stringify(updatedSessions));
  };

  const updateChatHistory = (newMessage) => {
    setChatHistory((prev) => {
      const updated = [...prev, newMessage];
      const updatedSessions = { ...chatSessions, [currentDate]: updated };
      setChatSessions(updatedSessions);
      saveSessions(updatedSessions);
      return updated;
    });
  };

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech Recognition API not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'ar-SA';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setListening(true);
      transcriptRef.current = '';
    };

    recognition.onresult = (event) => {
      transcriptRef.current = event.results[0][0].transcript;
      setUserInput(transcriptRef.current);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;
  }, []);

  const handleInputChange = (e) => setUserInput(e.target.value);

  const handleSendMessage = async (inputText) => {
    const trimmedInput = (inputText ?? userInput).trim();
    if (!trimmedInput) return;

    const newUserMessage = { sender: 'You', message: trimmedInput };
    updateChatHistory(newUserMessage);
    setUserInput('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8003/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ user_input: trimmedInput }),
      });

      const data = await response.json();
      const botMessage = { sender: 'Bot', message: data.message };
      updateChatHistory(botMessage);
    } catch (error) {
      console.error('❌ Error:', error);
      const errorMessage = {
        sender: 'Bot',
        message: 'Sorry, something went wrong while getting a response.',
      };
      updateChatHistory(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  const toggleListening = () => {
    const recognition = recognitionRef.current;
    if (!recognition) return;

    if (!listening) {
      recognition.start();
    } else {
      recognition.stop();
      const finalTranscript = transcriptRef.current.trim();
      if (finalTranscript) {
        handleSendMessage(finalTranscript);
        transcriptRef.current = '';
      }
    }
  };
  

  const playAudio = async (text, index) => {
    try {
      if (playingIndex === index && audioRef.current) {
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
        setPlayingIndex(null);
      }

      setAudioLoadingIndex(index);

      const response = await fetch('http://localhost:8003/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
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
    } finally {
      setAudioLoadingIndex(null);
    }
  };

  return (
    <div className="chatgpt-layout">
      <Sidebar
        chatSessions={chatSessions}
        setChatSessions={setChatSessions}
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        setChatHistory={setChatHistory}
        saveSessions={saveSessions}
      />
        

      <main className="chat-main">
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
                    disabled={audioLoadingIndex === index}
                  >
                    {audioLoadingIndex === index ? (
                      <span className="spinner"></span>
                    ) : playingIndex === index ? (
                      '⏸️'
                    ) : (
                      '🔊'
                    )}
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
              title={listening ? 'Stop & Send' : 'Speak your question'}
              disabled={loading}
              aria-label="Toggle microphone"
            >
              🎤
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LearntendoChat;

export const AuthGuard = ({ roles }) => {
  const { token, user } = getAuthToken();
  if (!token) {
    return <> {roles.length === 0 ? <Outlet /> : <Navigate to="/login" />} </>;
  } else {
    return (
      <>
        {roles.find((role) => user.role.includes(role)) ? (
          <Outlet />
        ) : (
          <Navigate to={`/${user.role.toLowerCase()}-home`} />
        )}
      </>
    );
  }
};
