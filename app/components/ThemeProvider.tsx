"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type Theme = "system" | "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext =
  createContext<ThemeContextType | undefined>(
    undefined
  );

const SETTINGS_KEY =
  "cornerspan-settings";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setThemeState] =
    useState<Theme>("system");

  useEffect(() => {
    try {
      const stored =
        localStorage.getItem(
          SETTINGS_KEY
        );

      if (stored) {
        const settings = JSON.parse(stored);

        if (
          settings.theme === "light" ||
          settings.theme === "dark" ||
          settings.theme === "system"
        ) {
          setThemeState(settings.theme);
        }
      }
    } catch {
      setThemeState("system");
    }
  }, []);

  useEffect(() => {
    const root =
      document.documentElement;

    const applyTheme = (
      selectedTheme: Theme
    ) => {
      if (selectedTheme === "dark") {
        root.classList.add("dark");
        return;
      }

      if (selectedTheme === "light") {
        root.classList.remove("dark");
        return;
      }

      const prefersDark =
        window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;

      if (prefersDark) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    };

    applyTheme(theme);

    if (theme !== "system") {
      return;
    }

    const mediaQuery =
      window.matchMedia(
        "(prefers-color-scheme: dark)"
      );

    const handleChange = () => {
      applyTheme("system");
    };

    mediaQuery.addEventListener(
      "change",
      handleChange
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        handleChange
      );
    };
  }, [theme]);

  const setTheme = (
    newTheme: Theme
  ) => {
    setThemeState(newTheme);

    try {
      const stored =
        localStorage.getItem(
          SETTINGS_KEY
        );

      const settings = stored
        ? JSON.parse(stored)
        : {};

      localStorage.setItem(
        SETTINGS_KEY,
        JSON.stringify({
          ...settings,
          theme: newTheme,
        })
      );
    } catch {
      // Ignore storage errors
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context =
    useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeProvider"
    );
  }

  return context;
}
