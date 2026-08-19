"use client";

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "../components/ThemeProvider";

type Theme = "system" | "light" | "dark";
type UnitSystem = "metric" | "imperial";

type Settings = {
  theme: Theme;
  unitSystem: UnitSystem;
  currency: string;
  notifications: boolean;
};

const SETTINGS_KEY = "cornerspan-settings";

const DEFAULT_SETTINGS: Settings = {
  theme: "system",
  unitSystem: "metric",
  currency: "USD",
  notifications: true,
};

const currencyNames: Record<string, string> = {
  USD: "US Dollar",
  INR: "Indian Rupee",
  EUR: "Euro",
  GBP: "British Pound",
  AED: "UAE Dirham",
  AUD: "Australian Dollar",
  CAD: "Canadian Dollar",
};

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  const [settings, setSettings] =
    useState<Settings>(DEFAULT_SETTINGS);

  const [openSection, setOpenSection] =
    useState<string | null>(null);

  useEffect(() => {
    try {
      const stored =
        localStorage.getItem(SETTINGS_KEY);

      if (stored) {
        const parsed = JSON.parse(stored);

        setSettings({
          ...DEFAULT_SETTINGS,
          ...parsed,
          theme: theme,
        });
      }
    } catch {
      setSettings({
        ...DEFAULT_SETTINGS,
        theme,
      });
    }
  }, [theme]);

  function saveSettings(
    updated: Settings
  ) {
    setSettings(updated);

    localStorage.setItem(
      SETTINGS_KEY,
      JSON.stringify(updated)
    );
  }

  function handleThemeChange(
    newTheme: Theme
  ) {
    setTheme(newTheme);

    const updated = {
      ...settings,
      theme: newTheme,
    };

    setSettings(updated);

    localStorage.setItem(
      SETTINGS_KEY,
      JSON.stringify(updated)
    );
  }

  function clearFavorites() {
    if (
      !window.confirm(
        "Remove all saved calculators?"
      )
    ) {
      return;
    }

    localStorage.removeItem(
      "cornerspan-favorites"
    );

    alert("Favorites cleared.");
  }

  function clearHistory() {
    if (
      !window.confirm(
        "Clear all calculator history?"
      )
    ) {
      return;
    }

    localStorage.removeItem(
      "concrete-history"
    );

    alert("History cleared.");
  }

  function clearAllData() {
    if (
      !window.confirm(
        "Clear all CornerSpan data from this device?"
      )
    ) {
      return;
    }

    localStorage.removeItem(
      "cornerspan-favorites"
    );

    localStorage.removeItem(
      "concrete-history"
    );

    localStorage.removeItem(
      SETTINGS_KEY
    );

    setTheme("system");

    setSettings({
      ...DEFAULT_SETTINGS,
      theme: "system",
    });

    alert("All local data cleared.");
  }

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Header */}

      <section className="border-b border-slate-200 bg-white">

        <div className="mx-auto max-w-3xl px-5 py-8">

          <h1 className="text-3xl font-black text-slate-950">
            Settings
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Customize your CornerSpan experience.
          </p>

        </div>

      </section>

      {/* Settings List */}

      <section className="px-5 py-6">

        <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* Appearance */}

          <button
            type="button"
            onClick={() =>
              setOpenSection(
                openSection === "appearance"
                  ? null
                  : "appearance"
              )
            }
            className="flex w-full items-center gap-4 border-b border-slate-100 px-5 py-4 text-left transition hover:bg-slate-50"
          >

            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl">
              🎨
            </span>

            <span className="min-w-0 flex-1">

              <span className="block font-bold text-slate-900">
                Appearance
              </span>

              <span className="block text-xs text-slate-500">
                Theme:{" "}
                {settings.theme === "system"
                  ? "System"
                  : settings.theme === "light"
                  ? "Light"
                  : "Dark"}
              </span>

            </span>

            <span className="text-xl text-slate-400">
              {openSection === "appearance"
                ? "⌃"
                : "›"}
            </span>

          </button>

          {openSection === "appearance" && (

            <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">

              <label className="text-sm font-bold text-slate-700">
                Theme
              </label>

              <select
                value={settings.theme}
                onChange={(e) =>
                  handleThemeChange(
                    e.target.value as Theme
                  )
                }
                className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500"
              >
                <option value="system">
                  System Default
                </option>

                <option value="light">
                  Light
                </option>

                <option value="dark">
                  Dark
                </option>
              </select>

            </div>

          )}

          {/* Calculator Preferences */}

          <button
            type="button"
            onClick={() =>
              setOpenSection(
                openSection === "calculator"
                  ? null
                  : "calculator"
              )
            }
            className="flex w-full items-center gap-4 border-b border-slate-100 px-5 py-4 text-left transition hover:bg-slate-50"
          >

            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl">
              🧮
            </span>

            <span className="min-w-0 flex-1">

              <span className="block font-bold text-slate-900">
                Calculator Preferences
              </span>

              <span className="block text-xs text-slate-500">
                {settings.unitSystem === "metric"
                  ? "Metric"
                  : "Imperial"}{" "}
                • {settings.currency}
              </span>

            </span>

            <span className="text-xl text-slate-400">
              {openSection === "calculator"
                ? "⌃"
                : "›"}
            </span>

          </button>

          {openSection === "calculator" && (

            <div className="space-y-4 border-b border-slate-100 bg-slate-50 px-5 py-4">

              <div>

                <label className="text-sm font-bold text-slate-700">
                  Unit System
                </label>

                <select
                  value={settings.unitSystem}
                  onChange={(e) =>
                    saveSettings({
                      ...settings,
                      unitSystem:
                        e.target.value as UnitSystem,
                    })
                  }
                  className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500"
                >
                  <option value="metric">
                    Metric
                  </option>

                  <option value="imperial">
                    Imperial
                  </option>

                </select>

              </div>

              <div>

                <label className="text-sm font-bold text-slate-700">
                  Currency
                </label>

                <select
                  value={settings.currency}
                  onChange={(e) =>
                    saveSettings({
                      ...settings,
                      currency:
                        e.target.value,
                    })
                  }
                  className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500"
                >
                  {Object.entries(
                    currencyNames
                  ).map(
                    ([code, name]) => (
                      <option
                        key={code}
                        value={code}
                      >
                        {code} — {name}
                      </option>
                    )
                  )}
                </select>

              </div>

            </div>

          )}

          {/* Favorites */}

          <button
            type="button"
            onClick={clearFavorites}
            className="flex w-full items-center gap-4 border-b border-slate-100 px-5 py-4 text-left transition hover:bg-slate-50"
          >

            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xl">
              ⭐
            </span>

            <span className="flex-1">

              <span className="block font-bold text-slate-900">
                Favorites
              </span>

              <span className="block text-xs text-slate-500">
                Manage saved calculators
              </span>

            </span>

            <span className="text-xl text-slate-400">
              ›
            </span>

          </button>

          {/* History */}

<Link
  href="/history"
  className="flex w-full items-center gap-4 border-b border-slate-100 px-5 py-4 text-left transition hover:bg-slate-50"
>
  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xl">
    🕘
  </span>

  <span className="flex-1">
    <span className="block font-bold text-slate-900">
      History
    </span>

    <span className="block text-xs text-slate-500">
      View calculation history
    </span>
  </span>

  <span className="text-xl text-slate-400">
    ›
  </span>
</Link>

          {/* Notifications */}

          <div className="flex items-center gap-4 border-b border-slate-100 px-5 py-4">

            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xl">
              🔔
            </span>

            <span className="flex-1">

              <span className="block font-bold text-slate-900">
                Notifications
              </span>

              <span className="block text-xs text-slate-500">
                Calculator notifications
              </span>

            </span>

            <input
              type="checkbox"
              checked={
                settings.notifications
              }
              onChange={(e) =>
                saveSettings({
                  ...settings,
                  notifications:
                    e.target.checked,
                })
              }
              className="h-5 w-5 accent-blue-600"
            />

          </div>

          {/* Privacy */}

          <button
            type="button"
            onClick={clearAllData}
            className="flex w-full items-center gap-4 border-b border-slate-100 px-5 py-4 text-left transition hover:bg-slate-50"
          >

            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-xl">
              🔒
            </span>

            <span className="flex-1">

              <span className="block font-bold text-slate-900">
                Privacy & Data
              </span>

              <span className="block text-xs text-slate-500">
                Manage local CornerSpan data
              </span>

            </span>

            <span className="text-xl text-slate-400">
              ›
            </span>

          </button>

          {/* About */}

          <div className="flex items-center gap-4 px-5 py-4">

            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-xl">
              ℹ️
            </span>

            <span className="flex-1">

              <span className="block font-bold text-slate-900">
                About CornerSpan
              </span>

              <span className="block text-xs text-slate-500">
                Construction Calculators • Version 1.0
              </span>

            </span>

          </div>

        </div>

      </section>

    </main>
  );
}
