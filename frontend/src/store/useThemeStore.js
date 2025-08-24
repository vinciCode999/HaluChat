import { create } from 'zustand';


export const useThemeStore = create((set)=>({
  theme: localStorage.getItem("halu-theme") || "light",
  setTheme: (theme) => {
    set({theme});
    localStorage.setItem("halu-theme", theme);
  }
}));