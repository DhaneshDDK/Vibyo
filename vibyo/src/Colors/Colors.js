// useThemeColors.js
import { useSelector } from "react-redux";

export const useThemeColors = () => {
  const isDarkTheme = useSelector((state) => state.user.isDarkTheme);

  return {
    SidebarBg: isDarkTheme ? "#111827" : "#f0f4fa",
    AppLogoBg: isDarkTheme ? "rgb(139, 92, 246, 0.5)" : "#afbbf7",
    themeToggleBg : (isDarkTheme) ? "#374151" : "#5b96f7",
    searchTextColor: isDarkTheme ? "white" : "#000000",
  };
};
