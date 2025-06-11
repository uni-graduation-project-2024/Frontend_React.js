import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuthToken } from '../../services/auth';
import './viewReport.css'; // You can add styles here

const ViewReport = () => {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const token = getAuthToken()?.token;

  // Fetch all reports when component mounts
  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get(
        'https://localhost:7078/api/Admin/AllProblemReports',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReports(response.data);
    } catch (err) {
      console.error('Error fetching reports:', err);
      setError('Failed to fetch reports.');
    }
  };

  const deleteReport = async (userId) => {
    try {
      const response = await axios.delete(
        `https://localhost:7078/api/Admin/ClearProblem/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess(response.data.message);
      setReports((prevReports) =>
        prevReports.filter((report) => report.userId !== userId)
      );
    } catch (err) {
      console.error('Error deleting report:', err);
      setError('Failed to delete report.');
    }
  };

  return (
        <div className="vr-report-container">
    <h2>User Problem Reports</h2>
    {error && <p className="vr-error">{error}</p>}
    {success && <p className="vr-success">{success}</p>}

    {reports.length > 0 ? (
        <ul className="vr-report-list">
        {reports.map((report, index) => (
            <li key={index} className="vr-report-item">
            <div>
                <strong>User:</strong> {report.username} <br />
                <strong>Message:</strong> {report.problemReport}
            </div>
            <button
                className="vr-delete-btn"
                onClick={() => deleteReport(report.userId)}
            >
                Delete
            </button>
            </li>
        ))}
        </ul>
    ) : (
        <p>No reports available.</p>
    )}
    </div>

  );
};

export default ViewReport;
