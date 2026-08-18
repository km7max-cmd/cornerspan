"use client";

import { useEffect, useState } from "react";

type Theme = "system" | "light" | "dark";
type UnitSystem = "metric" | "imperial";

const SETTINGS_KEY = "cornerspan-settings";

type Settings = {
  theme: Theme;
  unitSystem: UnitSystem;
  currency: string;
  showDetails: boolean;
  notifications: boolean;
};

const DEFAULT_SETTINGS: Settings = {
  theme: "system",
  unitSystem: "metric",
  currency: "USD",
  showDetails: true,
  notifications: true,
};

export default function SettingsPage() {
  const [settings, setSettings] =
    useState<Settings>(DEFAULT_SETTINGS);

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const stored =
        localStorage.getItem(SETTINGS_KEY);

      if (stored) {
        setSettings({
          ...DEFAULT_SETTINGS,
          ...JSON.parse(stored),
        });
      }
    } catch {
      setSettings(DEFAULT_SETTINGS);
    }
  }, []);

  function updateSetting<K extends keyof Settings>(
    key: K,
    value: Settings[K]
  ) {
    setSettings((previous) => ({
      ...previous,
      [key]: value,
    }));

    setSaved(false);
  }

  function saveSettings() {
    try {
      localStorage.setItem(
        SETTINGS_KEY,
        JSON.stringify(settings)
      );

      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 2000);
    } catch {
      setSaved(false);
    }
  }

  function clearFavorites() {
    const confirmed = window.confirm(
      "Remove all saved calculators from Favorites?"
    );

    if (!confirmed) return;

    localStorage.removeItem(
      "cornerspan-favorites"
    );

    alert("Favorites cleared successfully.");
  }

  function clearHistory() {
    const confirmed = window.confirm(
      "Clear all calculator history?"
    );

    if (!confirmed) return;

    localStorage.removeItem(
      "concrete-history"
    );

    alert("History cleared successfully.");
  }

  function clearAllData() {
    const confirmed = window.confirm(
      "This will remove your Favorites, History and CornerSpan settings. Continue?"
    );

    if (!confirmed) return;

    localStorage.removeItem(
      "cornerspan-favorites"
    );

    localStorage.removeItem(
      "concrete-history"
    );

    localStorage.removeItem(
      SETTINGS_KEY
    );

    setSettings(DEFAULT_SETTINGS);

    alert(
      "All local CornerSpan data has been cleared."
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Hero */}

      <section className="bg-gradient-to-b from-blue-50 via-white to-slate-50">

        <div className="mx-auto max-w-4xl px-5 pb-10 pt-10 sm:px-6 sm:pb-12 sm:pt-14">

          <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            Settings
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
            Customize your CornerSpan calculator experience.
          </p>

        </div>

      </section>

      {/* Settings */}

      <section className="px-5 py-8 sm:px-6 sm:py-12">

        <div className="mx-auto max-w-4xl space-y-6">

          {/* Appearance */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

            <h2 className="text-xl font-black text-slate-950">
              Appearance
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Choose how CornerSpan should look.
            </p>

            <div className="mt-5">

              <label className="text-sm font-bold text-slate-700">
                Theme
              </label>

              <select
                value={settings.theme}
                onChange={(e) =>
                  updateSetting(
                    "theme",
                    e.target.value as Theme
                  )
                }
                className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
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

          </div>

          {/* Calculator Preferences */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

            <h2 className="text-xl font-black text-slate-950">
              Calculator Preferences
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Set your preferred calculator defaults.
            </p>

            <div className="mt-5 space-y-5">

              {/* Unit */}

              <div>

                <label className="text-sm font-bold text-slate-700">
                  Default Unit System
                </label>

                <select
                  value={settings.unitSystem}
                  onChange={(e) =>
                    updateSetting(
                      "unitSystem",
                      e.target.value as UnitSystem
                    )
                  }
                  className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                >
                  <option value="metric">
                    Metric (m, cm, mm, kg)
                  </option>

                  <option value="imperial">
                    Imperial (ft, in, lb)
                  </option>
                </select>

              </div>

              {/* Currency */}

              <div>

                <label className="text-sm font-bold text-slate-700">
                  Default Currency
                </label>

                <select
                  value={settings.currency}
                  onChange={(e) =>
                    updateSetting(
                      "currency",
                      e.target.value
                    )
                  }
                  className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                >
                  <option value="USD">
                    USD — US Dollar
                  </option>

                  <option value="INR">
                    INR — Indian Rupee
                  </option>

                  <option value="EUR">
                    EUR — Euro
                  </option>

                  <option value="GBP">
                    GBP — British Pound
                  </option>

                  <option value="AED">
                    AED — UAE Dirham
                  </option>

                  <option value="AUD">
                    AUD — Australian Dollar
                  </option>

                  <option value="CAD">
                    CAD — Canadian Dollar
                  </option>
                </select>

              </div>

              {/* Details */}

              <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 p-4">

                <div>

                  <p className="font-bold text-slate-800">
                    Show Calculation Details
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Show detailed calculation information in results.
                  </p>

                </div>

                <input
                  type="checkbox"
                  checked={settings.showDetails}
                  onChange={(e) =>
                    updateSetting(
                      "showDetails",
                      e.target.checked
                    )
                  }
                  className="h-5 w-5 accent-blue-600"
                />

              </label>

              {/* Notifications */}

              <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 p-4">

                <div>

                  <p className="font-bold text-slate-800">
                    Notifications
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Allow useful calculator notifications.
                  </p>

                </div>

                <input
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={(e) =>
                    updateSetting(
                      "notifications",
                      e.target.checked
                    )
                  }
                  className="h-5 w-5 accent-blue-600"
                />

              </label>

            </div>

          </div>

          {/* Save */}

          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5 sm:p-6">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <h2 className="font-black text-slate-900">
                  Save Settings
                </h2>

                <p className="mt-1 text-sm text-slate-600">
                  Your preferences are stored on this device.
                </p>

              </div>

              <button
                type="button"
                onClick={saveSettings}
                className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
              >
                {saved
                  ? "✓ Saved"
                  : "Save Settings"}
              </button>

            </div>

          </div>

          {/* Data */}

          <div className="rounded-2xl border border-red-100 bg-white p-5 shadow-sm sm:p-6">

            <h2 className="text-xl font-black text-slate-950">
              Your Data
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Manage data stored locally on this device.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">

              <button
                type="button"
                onClick={clearFavorites}
                className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              >
                Clear Favorites
              </button>

              <button
                type="button"
                onClick={clearHistory}
                className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              >
                Clear History
              </button>

              <button
                type="button"
                onClick={clearAllData}
                className="rounded-xl border border-red-200 px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-50"
              >
                Clear All Data
              </button>

            </div>

          </div>

          {/* About */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

            <h2 className="text-xl font-black text-slate-950">
              About CornerSpan
            </h2>

            <div className="mt-4 space-y-2 text-sm text-slate-600">

              <p>
                <span className="font-bold text-slate-800">
                  Website:
                </span>{" "}
                CornerSpan Construction Calculators
              </p>

              <p>
                <span className="font-bold text-slate-800">
                  Version:
                </span>{" "}
                1.0
              </p>

              <p>
                <span className="font-bold text-slate-800">
                  Data:
                </span>{" "}
                Preferences are stored locally on your device.
              </p>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}
