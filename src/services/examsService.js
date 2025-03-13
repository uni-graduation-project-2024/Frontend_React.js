import axios from "axios";

import linkhost from "..";
import { getAuthToken } from "./auth";


export const fetchExams = async () => {
  try {
    const { user } = getAuthToken();
    const response = await axios.get(`${linkhost}/api/Exam/all/${user.nameid}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching exams:", error);
    throw error;
  }
};

export const fetchExam = async (examId) => {
  try {
    const response = await axios.get(`${linkhost}/api/Exam/${examId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching exam:", error);
    throw error;
  }
};

export const createExam = async (examData) => {
  try {
    const response = await axios.post(`${linkhost}/api/Exam`, examData);
    return response.data;
  } catch (error) {
    console.error("Error creating exam:", error);
    throw error;
  }
};

export const updateExam = async (examId, updatedData) => {
  try {
    const response = await axios.put(`${linkhost}/api/Exam/${examId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating exam:", error);
    throw error;
  }
};

export const deleteExam = async (examId) => {
  if (window.confirm("Are you sure you want to delete this exam?")) {
    try {
      await axios.delete(`${linkhost}/api/Exam/${examId}`);
    } catch (error) {
      console.error("Error deleting exam:", error);
      throw error;
    }
  }
};
