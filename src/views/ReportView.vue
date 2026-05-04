<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useSleepStore } from "@/stores/sleep";
import { useSettingsStore } from "@/stores/settings";
import TopAppBar from "@/components/layout/TopAppBar.vue";
import BottomNavBar from "@/components/layout/BottomNavBar.vue";

const router = useRouter();
const sleepStore = useSleepStore();
const settingsStore = useSettingsStore();

const goToSettings = () => {
  router.push("/settings");
};

const activeTab = ref("day");

// Day view data
const lastSession = computed(() => sleepStore.lastSession);

const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}小時${mins}分`;
};

const formatTime = (isoString: string): string => {
  if (!isoString) return "--:--";
  const date = new Date(isoString);
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
};

// Week view data
const weeklyAvgDuration = computed(() => sleepStore.weeklyAverageDuration);
const weeklyAvgBedtime = computed(() => sleepStore.weeklyAverageBedtime);
const weeklyAvgWakeTime = computed(() => sleepStore.weeklyAverageWakeTime);

// Check if close to target (within 15 minutes)
const isCloseToTargetBedtime = computed(() => {
  if (weeklyAvgBedtime.value === "--:--") return false;
  const [avgH, avgM] = weeklyAvgBedtime.value.split(":").map(Number);
  const [targetH, targetM] = settingsStore.targetBedtime.split(":").map(Number);
  const avgMinutes = avgH * 60 + avgM;
  const targetMinutes = targetH * 60 + targetM;
  return Math.abs(avgMinutes - targetMinutes) <= 15;
});

const isCloseToTargetWakeTime = computed(() => {
  if (weeklyAvgWakeTime.value === "--:--") return false;
  const [avgH, avgM] = weeklyAvgWakeTime.value.split(":").map(Number);
  const [targetH, targetM] = settingsStore.targetWakeTime
    .split(":")
    .map(Number);
  const avgMinutes = avgH * 60 + avgM;
  const targetMinutes = targetH * 60 + targetM;
  return Math.abs(avgMinutes - targetMinutes) <= 15;
});

// Sessions list
const recentSessions = computed(() => {
  return [...sleepStore.sessions]
    .sort(
      (a, b) => new Date(b.endTime).getTime() - new Date(a.endTime).getTime(),
    )
    .slice(0, 10);
});

const deleteSession = (id: string) => {
  if (confirm("確定要刪除這筆睡眠記錄嗎？")) {
    sleepStore.deleteSession(id);
  }
};

const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  return `${date.getMonth() + 1}/${date.getDate()}`;
};
</script>

<template>
  <div class="min-h-screen bg-background pb-20">
    <TopAppBar
      title="睡眠報告"
      :showSettings="true"
      @settings-click="goToSettings"
    />

    <main class="pt-20 px-margin-edge">
      <!-- Tab switcher -->
      <div class="flex gap-2 mb-6">
        <button
          @click="activeTab = 'day'"
          class="flex-1 py-4 rounded-lg text-label-lg font-chinese transition-colors min-h-[56px]"
          :class="
            activeTab === 'day'
              ? 'bg-primary text-on-primary'
              : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
          "
        >
          今日
        </button>
        <button
          @click="activeTab = 'week'"
          class="flex-1 py-4 rounded-lg text-label-lg font-chinese transition-colors min-h-[56px]"
          :class="
            activeTab === 'week'
              ? 'bg-primary text-on-primary'
              : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
          "
        >
          本週
        </button>
      </div>

      <!-- Day View -->
      <div v-if="activeTab === 'day'">
        <div v-if="lastSession" class="space-y-4">
          <!-- Stats cards -->
          <div class="grid gap-4">
            <div class="bg-surface-container rounded-xl p-6">
              <p class="text-body-md text-on-surface-variant font-chinese mb-2">
                總睡眠時數
              </p>
              <p class="text-headline-lg text-primary">
                {{ formatDuration(lastSession.durationMinutes) }}
              </p>
            </div>
            <div class="bg-surface-container rounded-xl p-6">
              <p class="text-body-md text-on-surface-variant font-chinese mb-2">
                就寢時間
              </p>
              <p class="text-headline-lg text-on-surface">
                {{ formatTime(lastSession.startTime) }}
              </p>
            </div>
            <div class="bg-surface-container rounded-xl p-6">
              <p class="text-body-md text-on-surface-variant font-chinese mb-2">
                起床時間
              </p>
              <p class="text-headline-lg text-on-surface">
                {{ formatTime(lastSession.endTime) }}
              </p>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-12">
          <span
            class="material-symbols-outlined text-6xl text-on-surface-variant mb-4"
            >bedtime</span
          >
          <p class="text-body-lg text-on-surface-variant font-chinese">
            尚無睡眠記錄
          </p>
          <p class="text-body-md text-on-surface-variant font-chinese mt-2">
            開始追蹤您的睡眠吧！
          </p>
        </div>
      </div>

      <!-- Week View -->
      <div v-if="activeTab === 'week'">
        <div class="space-y-4">
          <!-- Weekly stats -->
          <div class="bg-surface-container rounded-xl p-6">
            <p class="text-body-md text-on-surface-variant font-chinese mb-2">
              平均睡眠時數
            </p>
            <p class="text-headline-lg text-primary">
              {{ formatDuration(weeklyAvgDuration) }}
            </p>
          </div>

          <div class="bg-surface-container rounded-xl p-6">
            <p class="text-body-md text-on-surface-variant font-chinese mb-2">
              平均就寢時間
            </p>
            <p class="text-headline-lg text-on-surface">
              {{ weeklyAvgBedtime }}
            </p>
            <p
              v-if="isCloseToTargetBedtime"
              class="text-tertiary text-body-md font-chinese mt-2"
            >
              🎉 你做得很好！接近目標時間了！
            </p>
          </div>

          <div class="bg-surface-container rounded-xl p-6">
            <p class="text-body-md text-on-surface-variant font-chinese mb-2">
              平均起床時間
            </p>
            <p class="text-headline-lg text-on-surface">
              {{ weeklyAvgWakeTime }}
            </p>
            <p
              v-if="isCloseToTargetWakeTime"
              class="text-tertiary text-body-md font-chinese mt-2"
            >
              🎉 你做得很好！接近目標時間了！
            </p>
          </div>

          <!-- Session list -->
          <div class="bg-surface-container rounded-xl p-6">
            <p class="text-label-lg text-on-surface font-chinese mb-4">
              最近記錄
            </p>
            <div v-if="recentSessions.length > 0" class="space-y-2">
              <div
                v-for="session in recentSessions"
                :key="session.id"
                class="flex items-center justify-between py-4 border-b border-outline-variant last:border-0 min-h-[64px]"
              >
                <div>
                  <p class="text-on-surface font-chinese">
                    {{ formatDate(session.endTime) }}
                  </p>
                  <p class="text-on-surface-variant text-body-md">
                    {{ formatDuration(session.durationMinutes) }}
                  </p>
                </div>
                <button
                  @click="deleteSession(session.id)"
                  class="p-3 rounded-full hover:bg-surface-container-high transition-colors"
                  aria-label="刪除記錄"
                >
                  <span class="material-symbols-outlined text-error"
                    >delete</span
                  >
                </button>
              </div>
            </div>
            <p
              v-else
              class="text-on-surface-variant text-body-md font-chinese text-center py-4"
            >
              本週尚無記錄
            </p>
          </div>
        </div>
      </div>
    </main>

    <BottomNavBar />
  </div>
</template>
