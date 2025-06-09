import { create } from "zustand";
import { fetchExams } from "../services/examsService";

export const useExamsStore = create((set, get) => ({
    allExams: [],
    loadingExams: true,
    isExamsFetched: false,
    fetchExams: async () => {
        const { isExamsFetched } = get();
        if (isExamsFetched) return;

        set({ loadingExams: true });
        try {
            const exams = await fetchExams();
            set({ allExams: exams, loadingExams: false, isExamsFetched: true });
        } catch (error) {
            console.error("Failed to fetch exams:", error);
            set({ allExams: [], loadingExams: false });
        }

    },

    refreshExams: async() => {
        set({ loadingExams: true });
        try {
            const exams = await fetchExams();
            set({ allExams: exams, loadingExams: false });
        } catch (error) {
            console.error("Failed to fetch exams:", error);
            set({ allExams: [], loadingExams: false });
        }
    },

    addExam: (newExam) => {
        set((state) => ({
            allExams: [newExam, ...state.allExams]
        }));
    },

    deleteExam: (examId) => {
        set((state) => ({
            allExams: state.allExams.filter(exam => exam.examId !== examId)
        }));
    },

    emptyAllExams: () => set({ allExams: [], isExamsFetched: false}),
}));

