-- Fail-closed password login needs a durable, atomic rate limiter.
-- Apply to preview first and then production before enabling login.
CREATE TABLE IF NOT EXISTS admin_login_attempts (
  fingerprint TEXT PRIMARY KEY NOT NULL,
  window_start INTEGER NOT NULL,
  attempts INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_admin_login_attempts_window
  ON admin_login_attempts(window_start);
