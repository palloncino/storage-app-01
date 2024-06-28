import React, { createContext, useState, useContext, useEffect } from "react";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

const ThemeContext = createContext();

export function useThemeContext() {
  return useContext(ThemeContext);
}

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(
    localStorage.getItem("themeMode") || "light"
  );

  useEffect(() => {
    localStorage.setItem("themeMode", themeMode);
  }, [themeMode]);

  // Define custom colors for the theme with a fresh coral and teal palette
  const getDesignTokens = (mode) => ({
    palette: {
      mode,
      primary: {
        main: mode === "light" ? "#333" : "#ffffff", // Black for light, white for dark
        light: "#555555", // Light gray for hover states in light mode
        dark: "#333", // Black for dark mode
        contrastText: mode === "light" ? "#ffffff" : "#333",
      },
      secondary: {
        main: mode === "light" ? "#ff6b6b" : "#4db6ac", // Coral for light, Teal for dark
        light: "#ff9b9b", // Lighter coral
        dark: "#00897b", // Darker teal
        contrastText: mode === "light" ? "#ffffff" : "#ffffff",
      },
      error: {
        main: "#d32f2f",
      },
      warning: {
        main: "#ffa726",
      },
      info: {
        main: "#2979ff",
      },
      success: {
        main: "#2e7d32",
      },
      background: {
        default: mode === "light" ? "#ffffff" : "#303030", // White background for light, dark grey for dark
        paper: mode === "light" ? "#F4F4F4" : "#424242",
      },
      text: {
        primary: mode === "light" ? "#333" : "#ffffff", // Black text on light, white text on dark
        secondary: mode === "light" ? "#757575" : "#bcbcbc",
      },
      action: {
        active: mode === "light" ? "#333" : "#ffffff",
        hover: mode === "light" ? "#f5f5f5" : "#383838",
        selected: mode === "light" ? "#e0e0e0" : "#4f4f4f",
        disabled: mode === "light" ? "#f5f5f5" : "#424242",
        disabledBackground: mode === "light" ? "#f9f9f9" : "#616161",
      },
    },
    breakpoints: {
    values: {
      xs: 0, // default
      sm: 600, // default
      md: 960, // default
      lg: 1280, // default
      xl: 1920, // default
      xxl: 2560, // new extra large size
    },
  },
  });

  const theme = createTheme(getDesignTokens(themeMode));

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};
