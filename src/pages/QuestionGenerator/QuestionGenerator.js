import React, { useState } from "react";
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
  const [examName, setExamName] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadMode, setUploadMode] = useState("FILE");
  //const [generatedQuestions, setGeneratedQuestions] = useState([]);

  const navigate = useNavigate(); // For navigation

  // Load saved questions from Local Storage
  // useEffect(() => {
  //   const savedQuestions = localStorage.getItem("generatedQuestions");
  //   if (savedQuestions) {
  //     setGeneratedQuestions(JSON.parse(savedQuestions));
  //   }
  // }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setText("");
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
    setFile(null);
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

    try {
      const response = await axios.post(
        "http://localhost:8000/generateQuestions",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // setGeneratedQuestions(response.data); 
      localStorage.setItem("generatedQuestions", JSON.stringify(response.data)); 

      const questionTypeString = questionType.join(" & ")

      // Navigate to QuestionAnswers page and pass questions
      navigate("/Question-Answers", { 
        state: { 
            generationData: response.data, 
            options: { 
                difficulty, 
                questionType: questionTypeString,
                examName
            } 
        } 
    });

    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };
// fff
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
          <h3 className="text-sm font-medium mb-2">Difficulty Level</h3>
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

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Title for the Exam</label>
          <input
            type="text"
            value={examName}
            onChange={(e) => setExamName(e.target.value)}
            className="input-text-title block w-full border rounded-md p-2 bg-gray-700 text-white"
            required
          />
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
