<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useSleepStore } from "@/stores/sleep";
import TopAppBar from "@/components/layout/TopAppBar.vue";
import BottomNavBar from "@/components/layout/BottomNavBar.vue";

const router = useRouter();
const sleepStore = useSleepStore();

// For live elapsed time display
const now = ref(Date.now());
let intervalId: ReturnType<typeof setInterval> | null = null;

const isTracking = computed(() => sleepStore.activeSession.isTracking);

const elapsed = computed(() => {
  if (
    !sleepStore.activeSession.isTracking ||
    !sleepStore.activeSession.startTime
  ) {
    return null;
  }
  return now.value - new Date(sleepStore.activeSession.startTime).getTime();
});

const formattedElapsed = computed(() => {
  if (!elapsed.value) return "00:00:00";
  const totalSeconds = Math.floor(elapsed.value / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
});

const toggleSleep = () => {
  if (isTracking.value) {
    sleepStore.stopSleep();
    router.push("/report");
  } else {
    sleepStore.startSleep();
  }
};

const goToSettings = () => {
  router.push("/settings");
};

onMounted(() => {
  intervalId = setInterval(() => {
    now.value = Date.now();
  }, 1000);
});

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});
</script>

<template>
  <div class="min-h-screen bg-background pb-20">
    <TopAppBar
      title="舒眠貓助手"
      :showSettings="true"
      @settings-click="goToSettings"
    />

    <main class="pt-20 px-margin-edge flex flex-col items-center">
      <!-- Cat Button -->
      <button
        @click="toggleSleep"
        class="relative w-[200px] h-[200px] rounded-full flex flex-col items-center justify-center transition-all mt-12"
        :class="
          isTracking
            ? 'bg-surface-container border-4 border-primary-container animate-pulse'
            : 'bg-surface-container-high border-4 border-primary hover:border-primary-fixed'
        "
        role="button"
        :aria-label="isTracking ? '睡眠中，點擊結束' : '開始睡眠'"
      >
        <!-- Cat icon placeholder -->
        <span class="material-symbols-outlined text-6xl text-primary mb-2">
          {{ isTracking ? "dark_mode" : "light_mode" }}
        </span>
        <span class="text-label-lg text-on-surface font-chinese">
          {{ isTracking ? "睡眠中..." : "開始睡眠" }}
        </span>
        <span
          v-if="isTracking"
          class="text-body-md text-on-surface-variant font-chinese mt-1"
        >
          點擊結束
        </span>
      </button>

      <!-- Elapsed time display -->
      <div v-if="isTracking" class="mt-8 text-center">
        <p class="text-headline-lg text-primary font-sans tabular-nums">
          {{ formattedElapsed }}
        </p>
        <p class="text-body-md text-on-surface-variant font-chinese mt-2">
          睡眠時間
        </p>
      </div>

      <!-- Quick actions when not tracking -->
      <div v-if="!isTracking && sleepStore.lastSession" class="mt-12 w-full">
        <div class="bg-surface-container rounded-xl p-6">
          <h2 class="text-label-lg text-on-surface font-chinese mb-4">
            昨晚睡眠
          </h2>
          <div class="flex justify-between items-center">
            <div>
              <p class="text-headline-md text-primary">
                {{
                  Math.floor(sleepStore.lastSession.durationMinutes / 60)
                }}小時 {{ sleepStore.lastSession.durationMinutes % 60 }}分
              </p>
            </div>
            <router-link
              to="/report"
              class="text-primary hover:text-primary-fixed transition-colors font-chinese"
            >
              查看詳情 →
            </router-link>
          </div>
        </div>
      </div>
    </main>

    <BottomNavBar />
  </div>
</template>
