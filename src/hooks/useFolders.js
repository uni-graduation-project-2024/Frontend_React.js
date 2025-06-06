import { create } from "zustand";
import { fetchFolders } from "../services/folderService";

export const useFoldersStore = create((set, get) => ({
    allFolders: [],
    loadingFolders: true,
    fetchFolders: async () => {
        set({ loadingFolders: true });
        try {
            const folders = await fetchFolders();
            set({ allFolders: folders, loadingFolders: false });
        } catch (error) {
            console.error("Failed to fetch Folders:", error);
            set({ allFolders: [], loadingFolders: false });
        }
    },

    getFolderBySubjectId: (subjectId) => {
        const id = Number(subjectId);
        return get().allFolders.find(folder => folder.subjectId === id);
    },
}));