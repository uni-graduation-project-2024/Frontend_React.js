import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import "./GenerationForm.css";
import axios from "axios";

const GenerationForm = () => {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [questionType, setQuestionType] = useState([]);
  const [difficulty, setDifficulty] = useState("EASY");
  const [numQuestions, setNumQuestions] = useState(10);
  const [examName, setExamName] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadMode, setUploadMode] = useState("FILE");

  const navigate = useNavigate(); // For navigation

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
      ).catch((error) => {
        console.error("Something went wrong, please try again:", error);
      });;

      // setGeneratedQuestions(response.data); 
      localStorage.setItem("generatedQuestions", JSON.stringify(response.data)); 

      const questionTypeString = questionType.join(" & ")

      // Navigate to PracticeMode page and pass questions
      navigate("/PracticeMode", { 
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
      <form className="md-questionGeneration" onSubmit={handleSubmit}>
        <div className="upload-mode-buttons">
        <button 
          type="button" 
          onClick={() => setUploadMode("FILE")}
          className={uploadMode === "FILE" ? "active" : "inactive"}
        >
          FILE
        </button>
        <button 
          type="button" 
          onClick={() => setUploadMode("TEXT")}
          className={uploadMode === "TEXT" ? "active" : "inactive"}
        >
          TEXT
        </button>
      </div>

      <div className="mb-4">
  <button  type="button"   onClick={() => {
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = ".txt, .pdf, .docx, .pptx";
      fileInput.onchange = handleFileChange;
      fileInput.click();
    }}
    className="w-full p-2 bg-blue-500 text-white rounded-md">
    Upload Your File
  </button>
</div>

        {uploadMode === "TEXT" && (
          <div className="mb-4">
            <textarea rows="4" value={text} onChange={handleTextChange}
            placeholder="Enter your text" 
              className="block w-full border rounded-md p-2 bg-gray-700 text-white"/>
          </div>
        )}
      <div className="inside-form">
        <div className="mb-44">
          <h3 className="qg">💡 Type Of Questions</h3>
          <div className="flex2 items-center gap-4">
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
          <h3 className="qg">💡 Difficulty Level</h3>
          <div className="flex2 items-center gap-4">
            <label className="flex items-center">
            <input
  type="radio"
  name="difficulty"
  value="EASY"
  checked={difficulty === "EASY"}
  onChange={() => setDifficulty("EASY")}
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
          <label className="qg">💡 Number of Questions</label>
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
          <label className="qg1">💡 Title for the Exam</label>
          <input
            type="text"
            value={examName}
            onChange={(e) => setExamName(e.target.value)}
            className="input-text-title block w-full border rounded-md p-2 bg-gray-700 text-white"
            required
          />
        </div>
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

export default GenerationForm;
