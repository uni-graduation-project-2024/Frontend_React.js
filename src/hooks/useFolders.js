import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import linkhost from "..";
import { getAuthToken } from "../services/auth";

export const useFolders = (refresh) => {
    const [folders, setFolders] = useState([]);
    const { user } = getAuthToken();

    const fetchFolders = useCallback(async () => {
        try {
            const response = await axios.get(`${linkhost}/api/Subject/all/${user.nameid}`);
            if (response && response.data) {
                setFolders(response.data);
            }
        } catch (error) {
            console.error("Error fetching folders:", error);
        }
    }, [user.nameid]); // Add user.nameid as a dependency

    useEffect(() => {
        fetchFolders();
    }, [fetchFolders, refresh]);

    return { folders };
};
