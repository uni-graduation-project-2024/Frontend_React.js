// import React, { useState } from 'react';
// import axios from 'axios';
// import { getAuthToken } from '../../services/auth';
// import './reportProblem.css';

// const ReportProblem = () => {
//   const { user } = getAuthToken(); // must return an object with `nameid`
//   const [message, setMessage] = useState('');
//   const [status, setStatus] = useState('');
//   const [isError, setIsError] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         `https://localhost:7078/api/User/ReportProblem/${user.nameid}`,
//         JSON.stringify(message),
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }
//       );
//       setStatus('Report sent successfully!');
//       setIsError(false);
//       setMessage('');
//     } catch (error) {
//       setStatus('Failed to send report.');
//       setIsError(true);
//       console.error(error.response?.data || error.message);
//     }
//   };

//   return (
//     <div className="rp-container">
//       <h2>Report a Problem</h2>
//       <form className="rp-form" onSubmit={handleSubmit}>
//         <textarea
//           className="rp-textarea"
//           rows="5"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Describe the issue..."
//           required
//         />
//         <button className="rp-submit-btn" type="submit">Submit</button>
//       </form>
//       {status && (
//         <p className={`rp-status-message ${isError ? 'error' : ''}`}>
//           {status}
//         </p>
//       )}
//     </div>
//   );
// };

// export default ReportProblem;
import React, { useState } from 'react';
import axios from 'axios';
import { getAuthToken } from '../../services/auth';
import './reportProblem.css';

const ReportProblem = () => {
  const { user } = getAuthToken(); // must return an object with `nameid`
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [isError, setIsError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `https://localhost:7078/api/User/ReportProblem/${user.nameid}`,
        JSON.stringify(message),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setStatus('Report sent successfully!');
      setIsError(false);
      setIsSubmitted(true); // mark as submitted
      setMessage('');
    } catch (error) {
      setStatus('Failed to send report.');
      setIsError(true);
      console.error(error.response?.data || error.message);
    }
  };

  if (isSubmitted) {
    return (
      <div className="rp-container">
        <p className="rp-status-message">{status}</p>
      </div>
    );
  }

  return (
    <div className="rp-container">
      <h2>Report a Problem</h2>
      <form className="rp-form" onSubmit={handleSubmit}>
        <textarea
          className="rp-textarea"
          rows="5"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Describe the issue..."
          required
        />
        <button className="rp-submit-btn" type="submit">Submit</button>
      </form>
      {status && (
        <p className={`rp-status-message ${isError ? 'error' : ''}`}>
          {status}
        </p>
      )}
    </div>
  );
};

export default ReportProblem;
