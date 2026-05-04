import type { SleepSession, ActiveSession, Settings, StorageKeys } from '@/types';

const KEYS: StorageKeys = {
  sessions: 'serene_sleep_sessions',
  settings: 'serene_sleep_settings',
  activeSession: 'serene_sleep_active_session',
};

export const storage = {
  getSessions: (): SleepSession[] => 
    JSON.parse(localStorage.getItem(KEYS.sessions) || '[]'),
  
  saveSessions: (data: SleepSession[]): void =>
    localStorage.setItem(KEYS.sessions, JSON.stringify(data)),
  
  getSettings: (): Settings | null => 
    JSON.parse(localStorage.getItem(KEYS.settings) || 'null'),
  
  saveSettings: (data: Settings): void =>
    localStorage.setItem(KEYS.settings, JSON.stringify(data)),
  
  getActiveSession: (): ActiveSession | null =>
    JSON.parse(localStorage.getItem(KEYS.activeSession) || 'null'),
  
  saveActiveSession: (data: ActiveSession): void =>
    localStorage.setItem(KEYS.activeSession, JSON.stringify(data)),
  
  clearActiveSession: (): void => 
    localStorage.removeItem(KEYS.activeSession),
};
