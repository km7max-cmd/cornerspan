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
  createContext<ThemeContextType | undefined>(undefined);

const SETTINGS_KEY = "cornerspan-settings";

function getSystemTheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;

  const actualTheme =
    theme === "system"
      ? getSystemTheme()
      : theme;

  if (actualTheme === "dark") {
    root.classList.add("dark");
    root.style.colorScheme = "dark";
  } else {
    root.classList.remove("dark");
    root.style.colorScheme = "light";
  }

  const meta =
    document.querySelector('meta[name="theme-color"]');

  if (meta) {
    meta.setAttribute(
      "content",
      actualTheme === "dark"
        ? "#0f172a"
        : "#2563eb"
    );
  }
}

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
        localStorage.getItem(SETTINGS_KEY);

      if (stored) {
        const settings = JSON.parse(stored);

        if (
          settings.theme === "light" ||
          settings.theme === "dark" ||
          settings.theme === "system"
        ) {
          setThemeState(settings.theme);
          applyTheme(settings.theme);
          return;
        }
      }
    } catch {}

    applyTheme("system");
  }, []);

  useEffect(() => {
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

  function setTheme(newTheme: Theme) {
    setThemeState(newTheme);

    applyTheme(newTheme);

    try {
      const stored =
        localStorage.getItem(SETTINGS_KEY);

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
    } catch {}
  }

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
