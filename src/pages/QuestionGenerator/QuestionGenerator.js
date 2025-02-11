import React, { useState } from "react";
import './QuestionGenerator.css'; 
import Sidebar from "../../sidebar";

import axios from "axios";

const QuestionGenerator = () => {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [questionType, setQuestionType] = useState([]);
  const [difficulty, setDifficulty] = useState("EASY");
  const [numQuestions, setNumQuestions] = useState(10);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [uploadMode, setUploadMode] = useState("FILE");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage("Your file has been successfully loaded");
    setText("");
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
    setFile(null);
    setMessage("Your text has been successfully loaded");
  };

  const handleQuestionTypeChange = (type) => {
    setQuestionType((prev) =>
      prev.includes(type)
        ? prev.filter((item) => item !== type)
        : [...prev, type]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (uploadMode === "FILE" && !file) {
      setMessage("Please upload a file.");
      return;
    }

    if (uploadMode === "TEXT" && text.trim() === "") {
      setMessage("Please enter some text.");
      return;
    }

    const formData = new FormData();
    formData.append("sourceType", uploadMode);
    formData.append("textInput", text);
    formData.append("numOfQuestions", numQuestions);
    formData.append("difficultyLevel", difficulty);
    formData.append("typeOfQuestions", questionType);

    if (file) {
      formData.append("fileInput", file); // Only append file if it exists
    }

    setLoading(true);
    setMessage("");

    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }    

    try {
      const response = await axios.post(
        "http://localhost:8000/generateQuestions",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setMessage("Questions generated successfully!");
      console.log("Response:", response.data);
    } catch (error) {
      setMessage("Failed to generate questions. Please try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 body">
      <Sidebar />
      <form
        className="bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-md questionGeneration"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-between mb-4">
          <button
            type="button"
            onClick={() => setUploadMode("FILE")}
            className={`px-4 py-2 rounded-lg ${
              uploadMode === "FILE"
                ? "bg-blue-500 hover:bg-blue-400"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            FILE
          </button>
          <button
            type="button"
            onClick={() => setUploadMode("TEXT")}
            className={`px-4 py-2 rounded-lg ${
              uploadMode === "TEXT"
                ? "bg-blue-500 hover:bg-blue-400"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            TEXT
          </button>
        </div>

        {uploadMode === "FILE" && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Upload Your File</label>
            <input
              type="file"
              accept=".txt, .pdf, .docx"
              onChange={handleFileChange}
              className="block w-full border rounded-md p-2 bg-gray-700 text-white"
            />
          </div>
        )}

        {uploadMode === "TEXT" && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Enter Your Text</label>
            <textarea
              rows="4"
              value={text}
              onChange={handleTextChange}
              className="block w-full border rounded-md p-2 bg-gray-700 text-white"
            />
          </div>
        )}

        {message && (
          <p
            className={`mb-4 ${message.startsWith("Failed") ? "text-red-500" : "text-green-400"}`}
          >
            {message}
          </p>
        )}

        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2">Type Of Questions</h3>
          <div className="flex items-center gap-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                value="MCQ"
                checked={questionType.includes("MCQ")}
                onChange={() => handleQuestionTypeChange("MCQ")}
                className="mr-2"
              />
              MCQ
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                value="True/False"
                checked={questionType.includes("True/False")}
                onChange={() => handleQuestionTypeChange("True/False")}
                className="mr-2"
              />
              True/False
            </label>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2">Style Of Questions</h3>
          <div className="flex items-center gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="EASY"
                checked={difficulty === "EASY"}
                onChange={(e) => setDifficulty(e.target.value)}
                className="mr-2"
              />
              Easy
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="MEDIUM"
                checked={difficulty === "MEDIUM"}
                onChange={(e) => setDifficulty(e.target.value)}
                className="mr-2"
              />
              Medium
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="HARD"
                checked={difficulty === "HARD"}
                onChange={(e) => setDifficulty(e.target.value)}
                className="mr-2"
              />
              Hard
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Number of Questions</label>
          <input
            type="range"
            min="5"
            max="20"
            value={numQuestions}
            onChange={(e) => setNumQuestions(e.target.value)}
            className="w-full"
          />
          <p className="text-center mt-2">{numQuestions}</p>
        </div>

        <button
          type="submit"
          className={`w-full py-2 px-4 text-white rounded ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-400"
          }`}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </form>
    </div>
  );
};

export default QuestionGenerator;
