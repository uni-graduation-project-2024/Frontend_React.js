import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import './Chatbot.css';
import { getAuthToken } from '../../services/auth';
import ChatbotSidebar from './ChatbotSidebar'; // Adjust import path if needed
import { MicIcon } from './icons';

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
    return chatSessions[currentDate] || [];
  });

  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [audioLoadingIndex, setAudioLoadingIndex] = useState(null);

  const recognitionRef = useRef(null);
  const audioRef = useRef(null);
  const transcriptRef = useRef('');

  // Save sessions to state and localStorage
  const saveSessions = (updatedSessions) => {
  localStorage.setItem(`learntendo_chat_sessions_${username}`, JSON.stringify(updatedSessions));
  setChatSessions(updatedSessions);
};



  // Update chat history for current session
  const updateChatHistory = (newMessage) => {
    setChatHistory((prev) => {
      const updated = [...prev, newMessage];
      const updatedSessions = { ...chatSessions, [currentDate]: updated };
      saveSessions(updatedSessions);
      return updated;
    });
  };

  useEffect(() => {
  setChatHistory(chatSessions[currentDate] || []);
}, [currentDate, chatSessions]);

  // Speech recognition setup
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
      updateChatHistory({ sender: 'Bot', message: 'Sorry, something went wrong while getting a response.' });
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
      <ChatbotSidebar
        chatSessions={chatSessions}
        setChatSessions={setChatSessions}
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        setChatHistory={setChatHistory}
        saveSessions={saveSessions} // ✅ This enables Sidebar to persist changes
        getToday={getToday}
      />

      <div className="chat-main">
        <div className="learntendo-chat-container">
          <div className="learntendo-chat-box">
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={
                  chat.sender === 'You' ? 'learntendo-user-message' : 'learntendo-bot-message'
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
              onKeyDown={handleKeyPress}
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
              <MicIcon size={20} color="white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearntendoChat;
