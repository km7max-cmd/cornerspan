"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "../components/ThemeProvider";

type Theme = "system" | "light" | "dark";

type Settings = {
  theme: Theme;
  notifications: boolean;
};

const SETTINGS_KEY = "cornerspan-settings";

const DEFAULT_SETTINGS: Settings = {
  theme: "system",
  notifications: true,
};

/* =========================================================
   Notification Helpers
   ========================================================= */

function notificationsSupported(): boolean {
  return (
    typeof window !== "undefined" &&
    "Notification" in window
  );
}

function getNotificationPermission(): NotificationPermission | "unsupported" {
  if (!notificationsSupported()) {
    return "unsupported";
  }

  return Notification.permission;
}

function sendTestNotification(): boolean {
  if (!notificationsSupported()) {
    return false;
  }

  if (Notification.permission !== "granted") {
    return false;
  }

  new Notification(
    "CornerSpan Notifications",
    {
      body:
        "Notifications are working. You can receive important CornerSpan updates here.",
      icon: "/logo-dark.png",
      badge: "/logo-dark.png",
    }
  );

  return true;
}

/* =========================================================
   Settings Page
   ========================================================= */

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  const [settings, setSettings] =
    useState<Settings>(DEFAULT_SETTINGS);

  const [openSection, setOpenSection] =
    useState<string | null>(null);

  const [notificationPermission, setNotificationPermission] =
    useState<
      NotificationPermission | "unsupported"
    >("unsupported");

  const [notificationMessage, setNotificationMessage] =
    useState("");

  /* =======================================================
     Load Settings
     ======================================================= */

  useEffect(() => {
    try {
      const stored =
        localStorage.getItem(SETTINGS_KEY);

      if (stored) {
        const parsed = JSON.parse(stored);

        setSettings({
          ...DEFAULT_SETTINGS,
          ...parsed,
          theme,
        });
      } else {
        setSettings({
          ...DEFAULT_SETTINGS,
          theme,
        });
      }
    } catch {
      setSettings({
        ...DEFAULT_SETTINGS,
        theme,
      });
    }

    setNotificationPermission(
      getNotificationPermission()
    );
  }, [theme]);

  /* =======================================================
     Save Settings
     ======================================================= */

  function saveSettings(
    updated: Settings
  ) {
    setSettings(updated);

    localStorage.setItem(
      SETTINGS_KEY,
      JSON.stringify(updated)
    );
  }

  /* =======================================================
     Theme
     ======================================================= */

  function handleThemeChange(
    newTheme: Theme
  ) {
    setTheme(newTheme);

    saveSettings({
      ...settings,
      theme: newTheme,
    });
  }

  /* =======================================================
     Notifications
     ======================================================= */

  async function handleNotificationToggle() {
    if (!notificationsSupported()) {
      setNotificationMessage(
        "Browser notifications are not supported on this device."
      );

      return;
    }

    /* -----------------------------------------------
       TURN OFF
       ----------------------------------------------- */

    if (settings.notifications) {
      saveSettings({
        ...settings,
        notifications: false,
      });

      setNotificationMessage(
        "CornerSpan notifications are turned off."
      );

      return;
    }

    /* -----------------------------------------------
       Already Granted
       ----------------------------------------------- */

    if (
      Notification.permission ===
      "granted"
    ) {
      saveSettings({
        ...settings,
        notifications: true,
      });

      setNotificationPermission(
        "granted"
      );

      setNotificationMessage(
        "CornerSpan notifications are enabled."
      );

      sendTestNotification();

      return;
    }

    /* -----------------------------------------------
       Request Permission
       ----------------------------------------------- */

    if (
      Notification.permission ===
      "default"
    ) {
      try {
        const permission =
          await Notification.requestPermission();

        setNotificationPermission(
          permission
        );

        if (
          permission === "granted"
        ) {
          saveSettings({
            ...settings,
            notifications: true,
          });

          setNotificationMessage(
            "Notifications enabled successfully."
          );

          sendTestNotification();

          return;
        }

        saveSettings({
          ...settings,
          notifications: false,
        });

        setNotificationMessage(
          "Notification permission was not granted."
        );

        return;
      } catch {
        saveSettings({
          ...settings,
          notifications: false,
        });

        setNotificationMessage(
          "Unable to request notification permission."
        );

        return;
      }
    }

    /* -----------------------------------------------
       Permission Denied
       ----------------------------------------------- */

    if (
      Notification.permission ===
      "denied"
    ) {
      saveSettings({
        ...settings,
        notifications: false,
      });

      setNotificationPermission(
        "denied"
      );

      setNotificationMessage(
        "Notifications are blocked in your browser. Allow them from your browser/site settings."
      );

      return;
    }
  }

  /* =======================================================
     Test Notification
     ======================================================= */

  function handleTestNotification() {
    if (!notificationsSupported()) {
      setNotificationMessage(
        "Browser notifications are not supported on this device."
      );

      return;
    }

    if (
      Notification.permission !==
      "granted"
    ) {
      setNotificationMessage(
        "Please enable notifications first."
      );

      return;
    }

    const sent =
      sendTestNotification();

    if (sent) {
      setNotificationMessage(
        "Test notification sent successfully."
      );
    }
  }

  /* =======================================================
     Clear Favorites
     ======================================================= */

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

    alert(
      "Favorites cleared successfully."
    );
  }

  /* =======================================================
     Clear History
     ======================================================= */

  function clearHistory() {
    if (
      !window.confirm(
        "Clear all calculator history?"
      )
    ) {
      return;
    }

    /*
     * Global history
     */
    localStorage.removeItem(
      "cornerspan-history"
    );

    /*
     * Old Concrete Calculator history
     */
    localStorage.removeItem(
      "concrete-history"
    );

    alert(
      "Calculation history cleared successfully."
    );
  }

  /* =======================================================
     Reset Settings
     ======================================================= */

  function resetSettings() {
    if (
      !window.confirm(
        "Reset all CornerSpan settings to default?"
      )
    ) {
      return;
    }

    const defaultSettings: Settings = {
      ...DEFAULT_SETTINGS,
      theme: "system",
    };

    setTheme("system");

    setSettings(
      defaultSettings
    );

    localStorage.setItem(
      SETTINGS_KEY,
      JSON.stringify(
        defaultSettings
      )
    );

    setNotificationPermission(
      getNotificationPermission()
    );

    alert(
      "Settings reset successfully."
    );
  }

  /* =======================================================
     Clear All Data
     ======================================================= */

  function clearAllData() {
    const firstConfirm =
      window.confirm(
        "Clear ALL CornerSpan data stored on this device?\n\nThis will remove favorites, history and settings."
      );

    if (!firstConfirm) {
      return;
    }

    const secondConfirm =
      window.confirm(
        "This action cannot be undone. Continue?"
      );

    if (!secondConfirm) {
      return;
    }

    localStorage.removeItem(
      "cornerspan-favorites"
    );

    localStorage.removeItem(
      "cornerspan-history"
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

    alert(
      "All CornerSpan local data has been cleared."
    );
  }

  /* =======================================================
     Notification Status Text
     ======================================================= */

  function getNotificationStatus() {
    if (
      notificationPermission ===
      "unsupported"
    ) {
      return "Not supported on this browser";
    }

    if (
      notificationPermission ===
      "granted"
    ) {
      return "Browser permission allowed";
    }

    if (
      notificationPermission ===
      "denied"
    ) {
      return "Blocked in browser settings";
    }

    return "Permission not requested";
  }

  /* =======================================================
     UI
     ======================================================= */

  return (
    <main className="min-h-screen bg-slate-50">

      {/* ================================================= */}
      {/* Page Header */}
      {/* ================================================= */}

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

      {/* ================================================= */}
      {/* Settings List */}
      {/* ================================================= */}

      <section className="px-5 py-6">

        <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* ================================================= */}
          {/* Appearance */}
          {/* ================================================= */}

          <button
            type="button"
            onClick={() =>
              setOpenSection(
                openSection ===
                  "appearance"
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
                {settings.theme ===
                "system"
                  ? "System"
                  : settings.theme ===
                    "light"
                  ? "Light"
                  : "Dark"}
              </span>

            </span>

            <span className="text-xl text-slate-400">
              {openSection ===
              "appearance"
                ? "⌃"
                : "›"}
            </span>

          </button>

          {openSection ===
            "appearance" && (

            <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">

              <label className="text-sm font-bold text-slate-700">
                Theme
              </label>

              <select
                value={
                  settings.theme
                }
                onChange={(e) =>
                  handleThemeChange(
                    e.target
                      .value as Theme
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

          {/* ================================================= */}
          {/* Favorites */}
          {/* ================================================= */}

          <Link
            href="/favorites"
            className="flex w-full items-center gap-4 border-b border-slate-100 px-5 py-4 text-left transition hover:bg-slate-50"
          >

            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl">
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

          </Link>

          {/* ================================================= */}
          {/* History */}
          {/* ================================================= */}

          <Link
            href="/history"
            className="flex w-full items-center gap-4 border-b border-slate-100 px-5 py-4 text-left transition hover:bg-slate-50"
          >

            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl">
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

          {/* ================================================= */}
          {/* Notifications */}
          {/* ================================================= */}

          <button
            type="button"
            onClick={() =>
              setOpenSection(
                openSection ===
                  "notifications"
                  ? null
                  : "notifications"
              )
            }
            className="flex w-full items-center gap-4 border-b border-slate-100 px-5 py-4 text-left transition hover:bg-slate-50"
          >

            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl">
              🔔
            </span>

            <span className="min-w-0 flex-1">

              <span className="block font-bold text-slate-900">
                Notifications
              </span>

              <span className="block text-xs text-slate-500">
                {settings.notifications
                  ? "Notifications enabled"
                  : "Notifications disabled"}
              </span>

            </span>

            <button
              type="button"
              role="switch"
              aria-checked={
                settings.notifications
              }
              onClick={(e) => {
                e.stopPropagation();
                handleNotificationToggle();
              }}
              className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                settings.notifications
                  ? "bg-blue-600"
                  : "bg-slate-300"
              }`}
            >

              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
                  settings.notifications
                    ? "left-6"
                    : "left-1"
                }`}
              />

            </button>

            <span className="text-xl text-slate-400">
              {openSection ===
              "notifications"
                ? "⌃"
                : "›"}
            </span>

          </button>

          {/* ================================================= */}
          {/* Notification Details */}
          {/* ================================================= */}

          {openSection ===
            "notifications" && (

            <div className="border-b border-slate-100 bg-slate-50 px-5 py-5">

              <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">

                <h3 className="font-bold text-slate-900">
                  CornerSpan Notifications
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Get important updates,
                  new calculator announcements
                  and major CornerSpan improvements.
                </p>

              </div>

              {/* Status */}

              <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">

                <div className="flex items-center justify-between gap-4">

                  <span className="text-sm font-semibold text-slate-700">
                    Browser Permission
                  </span>

                  <span
                    className={`text-xs font-bold ${
                      notificationPermission ===
                      "granted"
                        ? "text-green-600"
                        : notificationPermission ===
                          "denied"
                        ? "text-red-600"
                        : "text-slate-500"
                    }`}
                  >
                    {getNotificationStatus()}
                  </span>

                </div>

              </div>

              {/* Message */}

              {notificationMessage && (

                <div className="mt-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
                  {notificationMessage}
                </div>

              )}

              {/* Test */}

              <button
                type="button"
                onClick={
                  handleTestNotification
                }
                disabled={
                  !settings.notifications ||
                  notificationPermission !==
                    "granted"
                }
                className="mt-4 w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                Send Test Notification
              </button>

              <p className="mt-3 text-center text-xs leading-5 text-slate-500">
                You can turn notifications
                off at any time.
              </p>

            </div>

          )}

          {/* ================================================= */}
          {/* Privacy & Data */}
          {/* ================================================= */}

          <button
            type="button"
            onClick={() =>
              setOpenSection(
                openSection ===
                  "privacy"
                  ? null
                  : "privacy"
              )
            }
            className="flex w-full items-center gap-4 border-b border-slate-100 px-5 py-4 text-left transition hover:bg-slate-50"
          >

            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-xl">
              🔒
            </span>

            <span className="flex-1">

              <span className="block font-bold text-slate-900">
                Privacy & Data
              </span>

              <span className="block text-xs text-slate-500">
                Manage data stored on this device
              </span>

            </span>

            <span className="text-xl text-slate-400">
              {openSection ===
              "privacy"
                ? "⌃"
                : "›"}
            </span>

          </button>

          {/* ================================================= */}
          {/* Privacy Details */}
          {/* ================================================= */}

          {openSection ===
            "privacy" && (

            <div className="border-b border-slate-100 bg-slate-50 px-5 py-5">

              <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">

                <h3 className="font-bold text-slate-900">
                  Your Local Data
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-600">
                  CornerSpan stores your
                  favorites, calculation history
                  and preferences locally in this
                  browser on your device.
                </p>

              </div>

              {/* Clear Favorites */}

              <button
                type="button"
                onClick={
                  clearFavorites
                }
                className="mt-4 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                ⭐ Clear Favorites
              </button>

              {/* Clear History */}

              <button
                type="button"
                onClick={
                  clearHistory
                }
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                🕘 Clear History
              </button>

              {/* Reset Settings */}

              <button
                type="button"
                onClick={
                  resetSettings
                }
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                ⚙️ Reset Settings
              </button>

              {/* Clear All */}

              <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4">

                <h3 className="font-bold text-red-700">
                  Clear All Local Data
                </h3>

                <p className="mt-1 text-sm leading-6 text-red-600">
                  Permanently remove CornerSpan
                  favorites, history and settings
                  from this device.
                </p>

                <button
                  type="button"
                  onClick={
                    clearAllData
                  }
                  className="mt-4 w-full rounded-xl bg-red-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-red-700"
                >
                  Clear All Data
                </button>

              </div>

            </div>

          )}

          {/* ================================================= */}
          {/* About */}
          {/* ================================================= */}

          <div className="flex items-center gap-4 px-5 py-4">

            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xl">
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
