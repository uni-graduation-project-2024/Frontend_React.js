import axios from "axios";

import linkhost from "../..";


export const moveExam = (examId, folderId) => {

    const sendRequest = async () =>{
        try {
        await axios.patch(`${linkhost}/api/Exam/${examId}/${folderId}`);
        } catch (error) {
        console.error("Error moving exam:", error);
        }
    }

    useEffect(() => {
        sendRequest();
    }, [sendRequest]);
};
