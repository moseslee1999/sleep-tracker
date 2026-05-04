<script setup>
import { ref } from "vue";
import { useSettingsStore } from "../stores/settings";
import TopAppBar from "../components/layout/TopAppBar.vue";
import TimePickerDialog from "../components/TimePickerDialog.vue";

const settingsStore = useSettingsStore();

const targetBedtime = ref(settingsStore.targetBedtime);
const targetWakeTime = ref(settingsStore.targetWakeTime);

const showBedtimeDialog = ref(false);
const showWakeTimeDialog = ref(false);

const openBedtimeDialog = () => {
  showBedtimeDialog.value = true;
};

const openWakeTimeDialog = () => {
  showWakeTimeDialog.value = true;
};

const handleBedtimeConfirm = (time) => {
  targetBedtime.value = time;
  settingsStore.updateSettings({
    targetBedtime: time,
    targetWakeTime: targetWakeTime.value,
  });
};

const handleWakeTimeConfirm = (time) => {
  targetWakeTime.value = time;
  settingsStore.updateSettings({
    targetBedtime: targetBedtime.value,
    targetWakeTime: time,
  });
};
</script>

<template>
  <div class="min-h-screen bg-background">
    <TopAppBar title="設定" :showBack="true" />

    <main class="pt-20 px-margin-edge pb-8">
      <div class="space-y-6">
        <!-- Target bedtime -->
        <div class="bg-surface-container rounded-xl p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-label-lg text-on-surface font-chinese">
                目標就寢時間
              </p>
              <p class="text-headline-md text-primary mt-2">
                {{ targetBedtime }}
              </p>
            </div>
            <button
              @click="openBedtimeDialog"
              class="bg-primary text-on-primary px-6 py-3 rounded-lg text-label-lg font-chinese hover:bg-primary-fixed transition-colors min-h-touch-target-min"
            >
              變更
            </button>
          </div>
        </div>

        <!-- Target wake time -->
        <div class="bg-surface-container rounded-xl p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-label-lg text-on-surface font-chinese">
                目標起床時間
              </p>
              <p class="text-headline-md text-primary mt-2">
                {{ targetWakeTime }}
              </p>
            </div>
            <button
              @click="openWakeTimeDialog"
              class="bg-primary text-on-primary px-6 py-3 rounded-lg text-label-lg font-chinese hover:bg-primary-fixed transition-colors min-h-touch-target-min"
            >
              變更
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- Time picker dialogs -->
    <TimePickerDialog
      v-model:open="showBedtimeDialog"
      title="設定就寢時間"
      :initialValue="targetBedtime"
      @confirm="handleBedtimeConfirm"
    />
    <TimePickerDialog
      v-model:open="showWakeTimeDialog"
      title="設定起床時間"
      :initialValue="targetWakeTime"
      @confirm="handleWakeTimeConfirm"
    />
  </div>
</template>
