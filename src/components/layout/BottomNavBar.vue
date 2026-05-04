<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const tabs = [
  { name: "Home", path: "/", icon: "bedtime", label: "追蹤" },
  { name: "Report", path: "/report", icon: "bar_chart", label: "報告" },
];

const currentPath = computed(() => route.path);
</script>

<template>
  <nav
    class="fixed bottom-0 left-0 right-0 z-50 bg-surface-container-low border-t border-outline-variant"
  >
    <div class="flex justify-around items-center h-16">
      <router-link
        v-for="tab in tabs"
        :key="tab.name"
        :to="tab.path"
        class="flex flex-col items-center justify-center min-w-[56px] min-h-[56px] px-4 transition-colors"
        :class="
          currentPath === tab.path
            ? 'text-primary border-t-2 border-primary -mt-[2px]'
            : 'text-on-surface-variant'
        "
      >
        <span class="material-symbols-outlined text-2xl">{{ tab.icon }}</span>
        <span class="text-sm mt-1 font-chinese">{{ tab.label }}</span>
      </router-link>
    </div>
  </nav>
</template>
