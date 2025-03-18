import { create } from "zustand";
import { fetchFolders } from "../services/folderService";

export const useFoldersStore = create((set) => ({
    allFolders: [],
    loading: true,
    fetchFolders: async () => {
        set({ loading: true });
        try {
            const folders = await fetchFolders();
            set({ allFolders: folders, loading: false });
        } catch (error) {
            console.error("Failed to fetch Folders:", error);
            set({ allFolders: [], loading: false });
        }
    },
}));