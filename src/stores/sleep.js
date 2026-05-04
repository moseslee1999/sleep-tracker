import { defineStore } from "pinia";
import { storage } from "../utils/storage";

export const useSleepStore = defineStore("sleep", {
  state: () => ({
    sessions: [],
    activeSession: {
      isTracking: false,
      startTime: null,
    },
  }),

  getters: {
    lastSession: (state) => {
      if (state.sessions.length === 0) return null;
      return [...state.sessions].sort(
        (a, b) => new Date(b.endTime) - new Date(a.endTime),
      )[0];
    },

    sessionsThisWeek: (state) => {
      const now = new Date();
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      return state.sessions.filter((s) => new Date(s.endTime) >= weekAgo);
    },

    weeklyAverageDuration() {
      const sessions = this.sessionsThisWeek;
      if (sessions.length === 0) return 0;
      const total = sessions.reduce((sum, s) => sum + s.durationMinutes, 0);
      return Math.round(total / sessions.length);
    },

    weeklyAverageBedtime() {
      const sessions = this.sessionsThisWeek;
      if (sessions.length === 0) return "--:--";

      const totalMinutes = sessions.reduce((sum, s) => {
        const date = new Date(s.startTime);
        let minutes = date.getHours() * 60 + date.getMinutes();
        // Handle times after midnight (treat as previous day)
        if (minutes < 12 * 60) minutes += 24 * 60;
        return sum + minutes;
      }, 0);

      let avgMinutes = Math.round(totalMinutes / sessions.length);
      if (avgMinutes >= 24 * 60) avgMinutes -= 24 * 60;

      const hours = Math.floor(avgMinutes / 60);
      const mins = avgMinutes % 60;
      return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
    },

    weeklyAverageWakeTime() {
      const sessions = this.sessionsThisWeek;
      if (sessions.length === 0) return "--:--";

      const totalMinutes = sessions.reduce((sum, s) => {
        const date = new Date(s.endTime);
        return sum + date.getHours() * 60 + date.getMinutes();
      }, 0);

      const avgMinutes = Math.round(totalMinutes / sessions.length);
      const hours = Math.floor(avgMinutes / 60);
      const mins = avgMinutes % 60;
      return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
    },
  },

  actions: {
    startSleep() {
      this.activeSession = {
        isTracking: true,
        startTime: new Date().toISOString(),
      };
      storage.saveActiveSession(this.activeSession);
    },

    stopSleep() {
      if (!this.activeSession.isTracking || !this.activeSession.startTime) {
        return null;
      }

      const startTime = this.activeSession.startTime;
      const endTime = new Date().toISOString();
      const durationMs = new Date(endTime) - new Date(startTime);
      const durationMinutes = Math.round(durationMs / (1000 * 60));

      // Generate plausible mock sleep stages
      const deep = Math.round(durationMinutes * 0.25);
      const rem = Math.round(durationMinutes * 0.2);
      const light = durationMinutes - deep - rem;

      const newSession = {
        id: crypto.randomUUID(),
        startTime,
        endTime,
        durationMinutes,
        stages: {
          deep,
          light,
          rem,
        },
        note: "",
      };

      this.sessions.push(newSession);
      this.saveToStorage();

      // Clear active session
      this.activeSession = {
        isTracking: false,
        startTime: null,
      };
      storage.clearActiveSession();

      return newSession;
    },

    resumeFromStorage() {
      const saved = storage.getActiveSession();
      if (saved && saved.isTracking && saved.startTime) {
        this.activeSession = saved;
      }
    },

    deleteSession(id) {
      this.sessions = this.sessions.filter((s) => s.id !== id);
      this.saveToStorage();
    },

    updateSession(id, patch) {
      const session = this.sessions.find((s) => s.id === id);
      if (session) {
        Object.assign(session, patch);
        // Recalculate duration if times changed
        if (patch.startTime || patch.endTime) {
          const durationMs =
            new Date(session.endTime) - new Date(session.startTime);
          session.durationMinutes = Math.round(durationMs / (1000 * 60));
        }
        this.saveToStorage();
      }
    },

    loadFromStorage() {
      this.sessions = storage.getSessions();
    },

    saveToStorage() {
      storage.saveSessions(this.sessions);
    },
  },
});
