import { create } from "zustand";
import { getAuthToken } from "../services/auth";
import linkhost from "..";
import axios from "axios";

export const useUserInfoStore = create((set) => ({
  userInformation: {
    username: "UserName",
    email: "user@gmail.com",
    joinedDate: "22-2-2025",
    totalXp: 3412,
    totalQuestion: 1000,
    finishedTop3: 10,
    maxStreakScore: 82,
    examsCreated: 116,
    currentLeague: "Gold",
    streakScore: 82,
    profileImage: "",
  },
  loadingUserInfo: false,
  fetchUserInfo: async () => {
    const { user } = getAuthToken();
    set({ loadingUserInfo: true });
    try {
      const response = await axios.get(
        `${linkhost}/api/User/user-profile?userId=${user.nameid}`);
      set({ userInformation: response.data, loadingUserInfo: false });
    } catch (error) {
      console.error("Failed to fetch user info:", error);
      set({ userInformation: null, loadingUserInfo: false });
    }
  },

  setProfileImage: async (file) => {
    const { user } = getAuthToken();

    const formData = new FormData();
    formData.append("userId", user.nameid); // if required by backend
    formData.append("file", file); // must be a File object
    try {
      await axios.post(`${linkhost}/api/User/upload-profile-pic/${user.nameid}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      set((state) => ({
        userInformation: { ...state.userInformation, profileImage: URL.createObjectURL(file),},
      }));
    } catch (error) {
      console.error("Failed to update profile image:", error);
    }
  }
}));
