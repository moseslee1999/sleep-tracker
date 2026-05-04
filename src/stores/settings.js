import { defineStore } from "pinia";
import { storage } from "../utils/storage";

export const useSettingsStore = defineStore("settings", {
  state: () => ({
    targetBedtime: "22:30",
    targetWakeTime: "06:45",
  }),

  actions: {
    updateSettings(patch) {
      Object.assign(this, patch);
      this.saveToStorage();
    },

    loadFromStorage() {
      const saved = storage.getSettings();
      if (saved) {
        this.targetBedtime = saved.targetBedtime ?? this.targetBedtime;
        this.targetWakeTime = saved.targetWakeTime ?? this.targetWakeTime;
      }
    },

    saveToStorage() {
      storage.saveSettings({
        targetBedtime: this.targetBedtime,
        targetWakeTime: this.targetWakeTime,
      });
    },
  },
});
