import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { useColorScheme as useNativeColorScheme } from "react-native";
import { lightTheme, darkTheme } from "../utils/theme";

interface ThemeContextType {
  toggleTheme: () => void;
  isDarkMode: boolean;
  theme: typeof lightTheme | typeof darkTheme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const deviceTheme = useNativeColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(deviceTheme === "dark");

  // Get the actual theme object based on isDarkMode
  const theme = isDarkMode ? darkTheme : lightTheme;

  // Update isDarkMode when device theme changes
  useEffect(() => {
    setIsDarkMode(deviceTheme === "dark");
  }, [deviceTheme]);

  const toggleTheme = useCallback(() => {
    setIsDarkMode((prev) => !prev);
  }, []);

  const value = useMemo(
    () => ({
      toggleTheme,
      isDarkMode,
      theme,
    }),
    [toggleTheme, isDarkMode, theme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useThemeToggle = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeToggle must be used within ThemeProvider");
  }
  return context;
};
