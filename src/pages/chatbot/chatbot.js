import axios from 'axios';
import { getAuthToken } from '../../services/auth';

const STORAGE_BASE = "https://localhost:7078/api/Chatbot";
const AI_BASE = "http://localhost:8003"; // If you use it for something else

function getHeaders() {
  const { token } = getAuthToken();
  return {
    Authorization: `Bearer ${token}`,
  };
}

export const createChat = async (chatName, userId, token) => {
  const res = await axios.post(`${AI_BASE}/create`, {
    chatName,
    userId,
  }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const listUserChats = async (userId, token) => {
  const res = await axios.get(`${AI_BASE}/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getChatMessages = async (chatId, token) => {
  const res = await axios.get(`${AI_BASE}/${chatId}/messages`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data; // Expected to return [{ userMessage, aiResponse }]
};

export const askAI = async (question, token) => {
  const res = await axios.post(`${AI_BASE}/ask`, { question }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.answer;
};

export const saveMessage = async (chatId, userMessage, aiResponse, token) => {
  await axios.post(`${AI_BASE}/${chatId}/message`, {
    userMessage,
    aiResponse,
  }, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const tts = async (text, token) => {
  const res = await axios.post(`${AI_BASE}/tts`, { text }, {
    headers: { Authorization: `Bearer ${token}` },
    responseType: 'blob',
  });
  return res.data;
};
