import { create } from "zustand";
import { deleteFolder, fetchFolders } from "../services/folderService";

export const useFoldersStore = create((set, get) => ({
    allFolders: [],
    loadingFolders: true,
    isFoldersFetched: false,
    fetchFolders: async () => {
        const { isFoldersFetched } = get();
        if (isFoldersFetched) return;

        set({ loadingFolders: true });
        try {
            const folders = await fetchFolders();
            set({ allFolders: folders, loadingFolders: false, isFoldersFetched: true });
        } catch (error) {
            console.error("Failed to fetch Folders:", error);
            set({ allFolders: [], loadingFolders: false });
        }
    },

    refreshFolders: async () => {
        set({ loadingFolders: true });
        try {
            const folders = await fetchFolders();
            set({ allFolders: folders, loadingFolders: false });
        } catch (error) {
            console.error("Failed to refresh Folders:", error);
            set({ allFolders: [], loadingFolders: false });
        }
    },

    addFolder: (newFolder) => {
        set((state) => ({
            allFolders: [ ...state.allFolders, newFolder]
        }));
    },

    deleteFolder: (subjectId) => {
        const folderId = Number(subjectId);
        set((state) => ({
            allFolders: state.allFolders.filter(folder => folder.subjectId !== folderId)
        }));
    },

    updateFolderName: (subjectId, newName) => {
        const id = Number(subjectId);
        set((state) => ({
            allFolders: state.allFolders.map(folder =>
                folder.subjectId === id ? { ...folder, subjectName: newName } : folder
            )
        }));

    },

    updateFolderColor: (subjectId, newColor) => {
        const id = Number(subjectId);
        set((state) => ({
            allFolders: state.allFolders.map(folder =>
                folder.subjectId === id ? { ...folder, subjectColor: newColor } : folder
            )
        }));

    },

    getFolderBySubjectId: (subjectId) => {
        const id = Number(subjectId);
        return get().allFolders.find(folder => folder.subjectId === id);
    },

    emptyAllFolders: () => set({ allFolders: [], isFoldersFetched: false}),
}));