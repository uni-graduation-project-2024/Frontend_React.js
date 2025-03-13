// folderService.js
import axios from "axios";
import linkhost from "..";

export const fetchFolders = async (userId) => {
  try {
    const response = await axios.get(`${linkhost}/api/Subject/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching folders:", error);
    throw error;
  }
};

export const createFolder = async (userId, folderName) => {
  if (!folderName.trim()) return;
  
  const newFolder = { subjectName: folderName };
  try {
    const response = await axios.post(`${linkhost}/api/Subject/${userId}`, newFolder);
    return response.data;
  } catch (error) {
    console.error("Error creating folder:", error);
    throw error;
  }
};

export const deleteFolder = async (subjectId) => {
  if (window.confirm("Are you sure you want to delete this folder?")) {
    try {
      await axios.delete(`${linkhost}/api/Subject/${subjectId}`);
    } catch (error) {
      console.error("Error deleting folder:", error);
      throw error;
    }
  }
};

export const renameFolder = async (subjectId, newName) => {
  if (!newName.trim()) return;
  
  try {
    await axios.put(`${linkhost}/api/Subject/${subjectId}`, { subjectName: newName });
    return newName;
  } catch (error) {
    console.error("Error renaming folder:", error);
    throw error;
  }
};

export const moveExamToFolder = async (examId, folderId) => {
  try {
    await axios.patch(`${linkhost}/api/Exam/${examId}/${folderId}`);
  } catch (error) {
    console.error("Error moving exam:", error);
    throw error;
  }
};
