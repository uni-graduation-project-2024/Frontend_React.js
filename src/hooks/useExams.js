import { useState, useEffect } from "react";

import { fetchExams } from "../services/examsService";

export const useExams = (subjectId, refresh) => {
    const [allExams, setAllExams] = useState([]);
    const [exams, setExams] = useState([]); // filtered exams by subjectId
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getExams = async () => {
          setLoading(true);
          try {
            const data = await fetchExams();
            setAllExams(data);
          } catch (error) {
            console.error("Failed to load exams:", error);
          } finally {
            setLoading(false);
          }
        };
    
        getExams();
      }, [refresh]); // Refetch when subjectId or refresh changes;

    useEffect(() => {
        if (subjectId === -1) {
            setExams(allExams);
        } else {
            // eslint-disable-next-line
            setExams(allExams.filter((exam) => exam.subjectId == subjectId));
        }
    }, [subjectId, allExams]);

    return { exams , loading};
};
