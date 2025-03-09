import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import linkhost from "..";
import { getAuthToken } from "../services/auth";

export const useExams = (subjectId) => {
    const [allExams, setAllExams] = useState([]);
    const [exams, setExams] = useState([]); // filtered exams by subjectId
    const { user } = getAuthToken();

    const fetchExams = useCallback(async () => {
        try {
            const response = await axios.get(`${linkhost}/api/Exam/all/${user.nameid}`);
            if (response && response.data) {
                setAllExams(response.data);
            }
        } catch (error) {
            console.error("Error fetching exams:", error);
        }
    }, [user.nameid])

    useEffect(() => {
        fetchExams();
    }, [fetchExams]);

    useEffect(() => {
        if (subjectId === -1) {
            setExams(allExams);
        } else {
            // eslint-disable-next-line
            setExams(allExams.filter((exam) => exam.subjectId == subjectId));
        }
    }, [subjectId, allExams]);

    return { exams };
};
