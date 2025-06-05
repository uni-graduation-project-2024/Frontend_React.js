import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import { BsLightningFill } from "react-icons/bs";
import { GrPowerCycle } from "react-icons/gr";
import { MdOutlineUploadFile } from "react-icons/md";
import axios from "axios";

import "./GenerationForm.css";
import linkhost from "../..";
import { getAuthToken } from "../../services/auth";

const GenerationForm = () => {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [questionType, setQuestionType] = useState(["MCQ", "True/False"]);
  const [difficulty, setDifficulty] = useState("EASY");
  const [numQuestions, setNumQuestions] = useState(13);
  const [examName, setExamName] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadMode, setUploadMode] = useState("FILE");
  const [error, setError] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);

  const navigate = useNavigate(); // For navigation
  const { user } = getAuthToken();

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

    if(!questionType){
      setError("Please choose the questions type");
      return;
    }

    const formData = new FormData(); //for generate exam endpoint
    formData.append("sourceType", uploadMode);
    formData.append("textInput", text);
    formData.append("numOfQuestions", numQuestions);
    formData.append("difficultyLevel", difficulty);
    formData.append("typeOfQuestions", questionType);

    const formData2 = new FormData(); //for upload endpoint
    formData2.append('UserId', user.nameid);

    if (file) {
      formData2.append('File', file);  // `file` should be a File object from an input
      formData.append("fileInput", file); // Only append file if it exists
    }

    setLoading(true);

    try{
      await axios.get(`${linkhost}/api/Exam/RequestGenerateExam/${user.nameid}`);
    } catch (error) {
        setError("You are out of Generation Power");
        setIsDisabled(true);
        setLoading(false);
        return;
    }
    try{
      await axios.post(`${linkhost}/api/Files/Upload`, formData2, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'accept': '*/*',
        },
      });
      } catch (error) {
        const message =
        error.response?.data?.message || // standard API error structure
        "Please upload a file (pdf, docx, pptx or txt) not larger than 50MB";

        setError(message);
        setIsDisabled(true);
        setLoading(false);
        return;
      }
    try{
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
      await axios.put(`${linkhost}/api/Exam/UseOneGenerationPower/${user.nameid}`);

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
    <div className="p-4">
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

        <p className="error-message">{error}</p>
        
        <div className="inside-form">
          <div className="mb-4">
            {uploadMode === "FILE" && (
              <>
              <button  type="button"   onClick={() => {
                  const fileInput = document.createElement("input");
                  fileInput.type = "file";
                  fileInput.accept = ".txt, .pdf, .docx, .pptx";
                  fileInput.onchange = handleFileChange;
                  fileInput.click();
                  fileInput.required = true;
                }}
                className="p-2 bg-blue-500 text-white rounded-md nup-button">
                {(file)? <><GrPowerCycle/> Change </> : <><MdOutlineUploadFile/>  Upload Your File  </>}
              </button>
              <span style={{marginLeft: "2%"}}>{(file)? file.name : ""}</span>
              </>
            )}
            {uploadMode === "TEXT" && (
                <textarea rows="4" value={text} onChange={handleTextChange}
                placeholder="Enter the text to generate from..." 
                className="block w-full border rounded-md p-2 bg-gray-700 text-white"/>
            )}
          </div>

          <div className="mb-44">
            <label className="qg">💡 Type Of Questions</label>
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

          <div className="mb-44">
            <label className="qg">💡 Difficulty Level</label>
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

          <div className="mb-44">
            <label className="qg">💡 Number of Questions</label>
            <input
              type="range"
              min="6"
              max="20"
              value={numQuestions}
              onChange={(e) => setNumQuestions(e.target.value)}
              className="w-full"
            />
            <p className="text-center mt-2" style={{width: "58%"}}>{numQuestions}</p>
          </div>

          <div className="mb-44">
            <label className="qg">💡 Title for the Exam</label>
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
          className={`generate-button py-2 px-4 text-white rounded ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-400"
          }`}
          disabled={loading || isDisabled}
        >
          <BsLightningFill className="power-generate" />
          {loading ? " Generating..." : " Generate"}
        </button>
      </form>
    </div>
    

  );
};

export default GenerationForm;
