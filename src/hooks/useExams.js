import { create } from "zustand";
import { fetchExams } from "../services/examsService";

export const useExamsStore = create((set) => ({
    allExams: [],
    loading: true,
    fetchExams: async () => {
        set({ loading: true });
        try {
            const exams = await fetchExams();
            set({ allExams: exams, loading: false });
        } catch (error) {
            console.error("Failed to fetch exams:", error);
            set({ allExams: [], loading: false });
        }
    },
}));

