import axios from 'axios';
import { useEffect, useState } from 'react';
import './UserUploads.css';
import './search.css';
import linkhost from '../../..';
import { getAuthToken } from '../../../services/auth';
import Search from './search';

const MyUploads = () => {
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = getAuthToken();

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const response = await axios.get(`${linkhost}/api/Files/UserUploadFiles/${user.nameid}`);
        console.log("Fetched uploads:", response.data); // ✅ Debugging
        setUploads(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUploads();
  }, [user.nameid]);

  const handleFileClick = (upload) => {
    if (!upload || !upload.filePath) {
      console.error("Missing filePath for upload:", upload);
      return;
    }

    const normalizedPath = upload.filePath.replace(/\\/g, '/');
    const fileUrl = `${linkhost}/Uploads/${normalizedPath}`;
    window.open(fileUrl, '_blank');
  };

  
  const filteredUploads = uploads.filter(upload =>
    upload.fileName && upload.fileName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="uploads-container">
      <h2 className="upload-header">My Uploads</h2>
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <ul className="uploads-list">
        {filteredUploads.map((upload) => (
          <li key={upload.fileId} className="upload-item">
            <span
              className="file-link"
              onClick={(e) => {
                e.stopPropagation();
                handleFileClick(upload);
              }}
            >
              {upload.fileName}
            </span>
            {/* <button onClick={() => navigate("/GenerationForm")} className="home-auth-button home-login-button">
                <RiAiGenerate /> Generate
              </button> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyUploads;

// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import './UserUploads.css';
// import './search.css';
// import linkhost from '../../..';
// import { getAuthToken } from '../../../services/auth';
// import Search from './search';

// const MyUploads = () => {
//   const [uploads, setUploads] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const { user } = getAuthToken();

//   useEffect(() => {
//     const fetchUploads = async () => {
//       try {
//         const response = await axios.get(`${linkhost}/api/Files/UserUploadFiles/${user.nameid}`);
//         console.log("Uploads response:", response.data); // Debug log
//         setUploads(response.data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUploads();
//   }, [user.nameid]);

//   const handleFileClick = (upload) => {
//     if (!upload?.filePath) {
//       alert("This file cannot be opened because it is missing a file path.");
//       console.error("Missing filePath for upload:", upload);
//       return;
//     }

//     const normalizedPath = upload.filePath.replace(/\\/g, '/');
//     const fileUrl = `${linkhost}/Uploads/${normalizedPath}`;
//     const fileExtension = upload.fileName?.split('.').pop().toLowerCase();

//     if (fileExtension === 'pdf') {
//       window.open(fileUrl, '_blank');
//     } else if (['doc', 'docx', 'ppt', 'pptx'].includes(fileExtension)) {
//       const viewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(fileUrl)}&embedded=true`;
//       window.open(viewerUrl, '_blank');
//     } else {
//       window.open(fileUrl, '_blank');
//     }
//   };

//   const filteredUploads = uploads.filter(upload =>
//     upload.fileName?.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div className="uploads-container">
//       <h2 className="upload-header">My Uploads</h2>
//       <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
//       <ul className="uploads-list">
//         {filteredUploads.map((upload) => (
//           <li key={upload.fileId || upload.id} className="upload-item">
//             {upload.filePath ? (
//               <span
//                 className="file-link"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleFileClick(upload);
//                 }}
//               >
//                 {upload.fileName || 'Unnamed File'}
//               </span>
//             ) : (
//               <span className="file-disabled">
//                 {upload.fileName || 'Unnamed File'} (unavailable)
//               </span>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default MyUploads;
