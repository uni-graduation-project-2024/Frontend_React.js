import { useState, useEffect} from "react";

import { fetchFolders } from "../services/folderService";

export const useFolders = (refresh) => {
    const [folders, setFolders] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getExams = async () => {
          setLoading(true);
          try {
            const data = await fetchFolders();
            setFolders(data);
          } catch (error) {
            console.error("Failed to load exams:", error);
          } finally {
            setLoading(false);
          }
        };
    
        getExams();
      }, [refresh]); // Refetch when subjectId or refresh changes;

    return { folders, loading };
};
