import { defineStore } from 'pinia';
import { storage } from '@/utils/storage';
import type { Settings } from '@/types';

export const useSettingsStore = defineStore('settings', {
  state: (): Settings => ({
    targetBedtime: '22:30',
    targetWakeTime: '06:45',
  }),

  actions: {
    updateSettings(patch: Partial<Settings>): void {
      Object.assign(this, patch);
      this.saveToStorage();
    },

    loadFromStorage(): void {
      const saved = storage.getSettings();
      if (saved) {
        this.targetBedtime = saved.targetBedtime ?? this.targetBedtime;
        this.targetWakeTime = saved.targetWakeTime ?? this.targetWakeTime;
      }
    },

    saveToStorage(): void {
      storage.saveSettings({
        targetBedtime: this.targetBedtime,
        targetWakeTime: this.targetWakeTime,
      });
    },
  },
});
