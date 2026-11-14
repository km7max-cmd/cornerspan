"use client";

import { useState, type FormEvent } from "react";

export default function LoginForm() {
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setError("");
    setBusy(true);
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST", cache: "no-store", credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const result = await response.json() as {ok?: boolean;error?: string};
      if (!response.ok || !result.ok) throw Error(result.error || "Could not sign in.");
      setPassword("");
      window.location.replace("/admin");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Could not sign in.");
    } finally { setBusy(false); }
  }
  return <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-16">
    <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-7 shadow-lg">
      <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-700">CornerSpan</p>
      <h1 className="text-3xl font-extrabold text-slate-900">Admin sign in</h1>
      <p className="mt-3 text-sm leading-6 text-slate-600">Owner-only dashboard. Enter the password configured privately in your Cloudflare Worker.</p>
      <form onSubmit={submit} className="mt-7 space-y-5">
        <label className="block text-sm font-semibold text-slate-800">Admin password
          <input name="password" type="password" autoComplete="current-password"
            value={password} onChange={event=>setPassword(event.target.value)}
            minLength={1} maxLength={256} required autoFocus
            className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 font-normal outline-blue-500"/>
        </label>
        {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-800">{error}</p>}
        <button type="submit" disabled={busy} className="w-full rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white disabled:opacity-50">
          {busy ? "Checking..." : "Sign in securely"}
        </button>
      </form>
      <p className="mt-5 text-xs leading-5 text-slate-500">Never enter your admin password into ChatGPT or commit it to GitHub. Your session expires after eight hours.</p>
    </div>
  </main>;
}
