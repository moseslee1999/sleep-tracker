const KEYS = {
  sessions: "serene_sleep_sessions",
  settings: "serene_sleep_settings",
  activeSession: "serene_sleep_active_session",
};

export const storage = {
  getSessions: () => JSON.parse(localStorage.getItem(KEYS.sessions) || "[]"),
  saveSessions: (data) =>
    localStorage.setItem(KEYS.sessions, JSON.stringify(data)),
  getSettings: () => JSON.parse(localStorage.getItem(KEYS.settings) || "null"),
  saveSettings: (data) =>
    localStorage.setItem(KEYS.settings, JSON.stringify(data)),
  getActiveSession: () =>
    JSON.parse(localStorage.getItem(KEYS.activeSession) || "null"),
  saveActiveSession: (data) =>
    localStorage.setItem(KEYS.activeSession, JSON.stringify(data)),
  clearActiveSession: () => localStorage.removeItem(KEYS.activeSession),
};
