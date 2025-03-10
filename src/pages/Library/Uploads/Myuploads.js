import axios from 'axios';
import { useEffect, useState } from 'react';
import './Myuploads.css';
import linkhost from '../../..';
import { getAuthToken } from '../../../services/auth';

const MyUploads = () => {
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {user} = getAuthToken();

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const response = await axios.get(`${linkhost}/api/Files/UserUploadFiles/${user.nameid}`);
        setUploads(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUploads();
  }, [user.nameid, linkhost]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="uploads-container">
      <h2>My Uploads</h2>
      <ul className="uploads-list">
        {uploads.map((upload) => (
          <li key={upload.fileId} className="upload-item">
            {upload.fileName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyUploads;
