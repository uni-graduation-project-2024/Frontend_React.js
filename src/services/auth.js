// import {jwtDecode} from "jwt-decode"; // Correct import

// export const setAuthToken = (token) => {
//   localStorage.setItem("token", token);
// };

// export const getAuthToken = () => {
//   if (localStorage.getItem("token")) {
//     const user = jwtDecode(localStorage.getItem("token"));
//     if (Date.now() >= user.exp * 1000) {
//       // remove token
//       removeAuthToken();
//       return {};
//     }
//     return { token: localStorage.getItem("token"), user: user };
//   } else {
//     return {};
//   }
// };

// export const removeAuthToken = () => {
//   if (localStorage.getItem("token")) {
//     localStorage.removeItem("token");
//   }
// };
import { jwtDecode } from "jwt-decode";

export const setAuthToken = (token) => {
  localStorage.setItem("token", token);
};

export const removeAuthToken = () => {
  localStorage.removeItem("token");
};

export const getAuthToken = () => {
  const token = localStorage.getItem("token");

  if (!token || token === "null" || token.split(".").length !== 3) {
    removeAuthToken();
    return {};
  }

  try {
    const user = jwtDecode(token);
    if (Date.now() >= user.exp * 1000) {
      removeAuthToken();
      return {};
    }
    return { token, user };
  } catch (error) {
    console.error("JWT decode error:", error.message);
    removeAuthToken();
    return {};
  }
};

