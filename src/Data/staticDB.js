
export let examsData = [
        {
          "questionType": "True/False",
          "examName": "Machine Learning2",
          "numQuestions": 10,
          "numCorrectQuestions": 7,
          "numWrongQuestions": 3,
          "difficultyLevel": "Medium",
          "mcqQuestionsData": [
            {
              "id": 1,
              "text": "What is machine learning types?",
              "options": [
                "string"
              ],
              "correctAnswer": "string",
              "userAnswer": "string",
              "isCorrect": true,
              "explain": "string"
            }
          ],
          "tfQuestionsData": [],
          "timeTaken": "00:30:00",
          "totalScore": 0,
          "xpCollected": 0,
          "userId": 1,
          "subjectId": 3
        },
        {
          "questionType": "MCQ",
          "examName": "ML Lec2",
          "numQuestions": 5,
          "numCorrectQuestions": 4,
          "numWrongQuestions": 1,
          "difficultyLevel": "EASY",
          "mcqQuestionsData": [
            {
              "id": 1,
              "text": "According to the provided text, which of these is NOT a component of software?",
              "options": [
                "Computer Programs",
                "Hardware Components",
                "Documentation",
                "Data"
              ],
              "correctAnswer": "Hardware Components",
              "userAnswer": "Computer Programs",
              "isCorrect": false,
              "explain": "The text defines software as including computer programs, procedures, documentation, and data. Hardware is a separate entity."
            },
            {
              "id": 2,
              "text": "What is a software fault?",
              "options": [
                "A mistake made by a programmer",
                "A defect in the code",
                "When the software crashes",
                "A hardware malfunction"
              ],
              "correctAnswer": "A defect in the code",
              "userAnswer": "A defect in the code",
              "isCorrect": true,
              "explain": "A software fault is the manifestation of an error in the code. It's a defect that exists but may not always cause a problem."
            },
            {
              "id": 3,
              "text": "What was the root cause of the Therac-25 incident?",
              "options": [
                "Hardware failure",
                "A race condition in the software",
                "User error",
                "Insufficient testing"
              ],
              "correctAnswer": "A race condition in the software",
              "userAnswer": "A race condition in the software",
              "isCorrect": true,
              "explain": "The Therac-25 incident was caused by a race condition in the software, where the system's behavior depended on the timing of uncontrollable events, leading to lethal radiation overdoses."
            },
            {
              "id": 4,
              "text": "Which of the following is NOT a key component of Software Quality Assurance (SQA)?",
              "options": [
                "Planning",
                "Monitoring",
                "Quality Control (QC)",
                "Improvement"
              ],
              "correctAnswer": "Quality Control (QC)",
              "userAnswer": "Quality Control (QC)",
              "isCorrect": true,
              "explain": "While related, QC is a separate activity focused on detecting defects in the final product. SQA focuses on the process of development to prevent defects."
            },
            {
              "id": 5,
              "text": "What is the main difference between SQA and SQC?",
              "options": [
                "SQA is process-oriented, SQC is product-oriented",
                "SQA is reactive, SQC is proactive",
                "SQA focuses on testing, SQC focuses on documentation",
                "SQA is done by developers, SQC is done by users"
              ],
              "correctAnswer": "SQA is process-oriented, SQC is product-oriented",
              "userAnswer": "SQA is process-oriented, SQC is product-oriented",
              "isCorrect": true,
              "explain": "SQA focuses on preventing defects during the development process, while SQC focuses on detecting defects in the finished product."
            }
          ],
          "tfQuestionsData": [],
          "timeTaken": "00:00:12",
          "totalScore": 80,
          "xpCollected": 4,
          "userId": 1,
          "subjectId": null
        }];


export let subjectData = [
    {"subjectId":3,
      "subjectName":"Science",
      "numExams":0,
      "totalQuestions":0,
      "userId":1,
      "exams":[],
      "user":null},
    {"subjectId":11,
        "subjectName":"French",
        "numExams":1,
        "totalQuestions":10,
        "userId":1,
        "exams":[],
        "user":null},
    ]