// Sleep Stage breakdown
export interface SleepStages {
  deep: number;
  light: number;
  rem: number;
}

// A completed sleep session
export interface SleepSession {
  id: string;
  startTime: string; // ISO 8601
  endTime: string;   // ISO 8601
  durationMinutes: number;
  stages: SleepStages;
  note: string;
}

// Active tracking state
export interface ActiveSession {
  isTracking: boolean;
  startTime: string | null;
}

// User settings
export interface Settings {
  targetBedtime: string;  // "HH:MM"
  targetWakeTime: string; // "HH:MM"
}

// Storage keys
export interface StorageKeys {
  sessions: string;
  settings: string;
  activeSession: string;
}

// Route names
export type RouteName = 'Home' | 'Report' | 'Settings';
