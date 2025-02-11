import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import "./QuestionGenerator.css";
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
  const [generatedQuestions, setGeneratedQuestions] = useState([]);

  const navigate = useNavigate(); // For navigation

  // Load saved questions from Local Storage
  useEffect(() => {
    const savedQuestions = localStorage.getItem("generatedQuestions");
    if (savedQuestions) {
      setGeneratedQuestions(JSON.parse(savedQuestions));
    }
  }, []);

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

    try {
      const response = await axios.post(
        "http://localhost:8000/generateQuestions",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setGeneratedQuestions(response.data); 
      localStorage.setItem("generatedQuestions", JSON.stringify(response.data)); 

      setMessage("Questions generated successfully!");

      // Navigate to QuestionAnswers page and pass questions
      navigate("/Question-Answers", { state: { questions: response.data } });

    } catch (error) {
      setMessage("Failed to generate questions. Please try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 body">
      <Sidebar />
      <form className="md-questionGeneration" onSubmit={handleSubmit}>
        <div className="flex justify-between mb-4">
          <button type="button" onClick={() => setUploadMode("FILE")}
            className={`px-4 py-2 rounded-lg ${uploadMode === "FILE" ? "bg-blue-500" : "bg-gray-700"}`}>
            FILE
          </button>
          <button type="button" onClick={() => setUploadMode("TEXT")}
            className={`px-4 py-2 rounded-lg ${uploadMode === "TEXT" ? "bg-blue-500" : "bg-gray-700"}`}>
            TEXT
          </button>
        </div>

        {uploadMode === "FILE" && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Upload Your File</label>
            <input type="file" accept=".txt, .pdf, .docx" onChange={handleFileChange}
              className="block w-full border rounded-md p-2 bg-gray-700 text-white"/>
          </div>
        )}

        {uploadMode === "TEXT" && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Enter Your Text</label>
            <textarea rows="4" value={text} onChange={handleTextChange}
              className="block w-full border rounded-md p-2 bg-gray-700 text-white"/>
          </div>
        )}

        <button type="submit" className={`w-full py-2 px-4 text-white rounded ${loading ? "bg-gray-500" : "bg-blue-500"}`} disabled={loading}>
          {loading ? "Generating..." : "Generate"}
        </button>
      </form>
    </div>
  );
};

export default QuestionGenerator;
