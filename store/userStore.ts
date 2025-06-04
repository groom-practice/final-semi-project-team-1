import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const useAuthStore = create(
  persist<AuthStore>((set) => ({
    isLoggedIn: false,

    login: () => {
      localStorage.setItem("isLoggedIn", "true");
      set({ isLoggedIn: true })
    },
    logout: () => {
      localStorage.removeItem("isLoggedIn");
      set({ isLoggedIn: false })
    },
  }), 
  {
    name: "auth-storage",
  })
);

export default useAuthStore;