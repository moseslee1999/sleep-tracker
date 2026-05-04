import { defineStore } from 'pinia';
import { storage } from '@/utils/storage';
import type { SleepSession, ActiveSession } from '@/types';

interface SleepState {
  sessions: SleepSession[];
  activeSession: ActiveSession;
}

export const useSleepStore = defineStore('sleep', {
  state: (): SleepState => ({
    sessions: [],
    activeSession: {
      isTracking: false,
      startTime: null,
    },
  }),

  getters: {
    lastSession: (state): SleepSession | null => {
      if (state.sessions.length === 0) return null;
      return [...state.sessions].sort(
        (a, b) => new Date(b.endTime).getTime() - new Date(a.endTime).getTime()
      )[0];
    },

    sessionsThisWeek: (state): SleepSession[] => {
      const now = new Date();
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      return state.sessions.filter((s) => new Date(s.endTime) >= weekAgo);
    },

    weeklyAverageDuration(): number {
      const sessions = this.sessionsThisWeek;
      if (sessions.length === 0) return 0;
      const total = sessions.reduce((sum, s) => sum + s.durationMinutes, 0);
      return Math.round(total / sessions.length);
    },

    weeklyAverageBedtime(): string {
      const sessions = this.sessionsThisWeek;
      if (sessions.length === 0) return '--:--';

      const totalMinutes = sessions.reduce((sum, s) => {
        const date = new Date(s.startTime);
        let minutes = date.getHours() * 60 + date.getMinutes();
        if (minutes < 12 * 60) minutes += 24 * 60;
        return sum + minutes;
      }, 0);

      let avgMinutes = Math.round(totalMinutes / sessions.length);
      if (avgMinutes >= 24 * 60) avgMinutes -= 24 * 60;

      const hours = Math.floor(avgMinutes / 60);
      const mins = avgMinutes % 60;
      return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
    },

    weeklyAverageWakeTime(): string {
      const sessions = this.sessionsThisWeek;
      if (sessions.length === 0) return '--:--';

      const totalMinutes = sessions.reduce((sum, s) => {
        const date = new Date(s.endTime);
        return sum + date.getHours() * 60 + date.getMinutes();
      }, 0);

      const avgMinutes = Math.round(totalMinutes / sessions.length);
      const hours = Math.floor(avgMinutes / 60);
      const mins = avgMinutes % 60;
      return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
    },
  },

  actions: {
    startSleep(): void {
      this.activeSession = {
        isTracking: true,
        startTime: new Date().toISOString(),
      };
      storage.saveActiveSession(this.activeSession);
    },

    stopSleep(): SleepSession | null {
      if (!this.activeSession.isTracking || !this.activeSession.startTime) {
        return null;
      }

      const startTime = this.activeSession.startTime;
      const endTime = new Date().toISOString();
      const durationMs = new Date(endTime).getTime() - new Date(startTime).getTime();
      const durationMinutes = Math.round(durationMs / (1000 * 60));

      const deep = Math.round(durationMinutes * 0.25);
      const rem = Math.round(durationMinutes * 0.2);
      const light = durationMinutes - deep - rem;

      const newSession: SleepSession = {
        id: crypto.randomUUID(),
        startTime,
        endTime,
        durationMinutes,
        stages: { deep, light, rem },
        note: '',
      };

      this.sessions.push(newSession);
      this.saveToStorage();

      this.activeSession = {
        isTracking: false,
        startTime: null,
      };
      storage.clearActiveSession();

      return newSession;
    },

    resumeFromStorage(): void {
      const saved = storage.getActiveSession();
      if (saved && saved.isTracking && saved.startTime) {
        this.activeSession = saved;
      }
    },

    deleteSession(id: string): void {
      this.sessions = this.sessions.filter((s) => s.id !== id);
      this.saveToStorage();
    },

    updateSession(id: string, patch: Partial<SleepSession>): void {
      const session = this.sessions.find((s) => s.id === id);
      if (session) {
        Object.assign(session, patch);
        if (patch.startTime || patch.endTime) {
          const durationMs =
            new Date(session.endTime).getTime() - new Date(session.startTime).getTime();
          session.durationMinutes = Math.round(durationMs / (1000 * 60));
        }
        this.saveToStorage();
      }
    },

    loadFromStorage(): void {
      this.sessions = storage.getSessions();
    },

    saveToStorage(): void {
      storage.saveSessions(this.sessions);
    },
  },
});
