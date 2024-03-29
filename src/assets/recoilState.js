import { atom, selector } from "recoil";
import axios from "axios";

// Atom to store the fetched user data
export const userDataState = atom({
  key: "userDataState",
  default: null, // Initial value is null
});

// Selector to fetch user data from the API
export const fetchUserData = selector({
  key: "fetchUserData",
  get: async ({ get }) => {
    try {
      const response = await axios.get(
        "https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae"
      );
      const userData = response.data;
      if (userData.success) {
        return userData.user;
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error; // Rethrow the error for handling in components
    }
  },
});
