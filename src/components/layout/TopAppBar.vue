<script setup>
import { useRouter } from "vue-router";

defineProps({
  title: {
    type: String,
    required: true,
  },
  showBack: {
    type: Boolean,
    default: false,
  },
  showSettings: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["settings-click"]);

const router = useRouter();

const goBack = () => {
  router.back();
};

const handleSettingsClick = () => {
  emit("settings-click");
};
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 bg-surface border-b border-outline-variant"
  >
    <div class="flex items-center justify-between h-16 px-margin-edge">
      <!-- Left: Back button or spacer -->
      <div class="w-12">
        <button
          v-if="showBack"
          @click="goBack"
          class="flex items-center justify-center w-12 h-12 rounded-full hover:bg-surface-container-high transition-colors"
          aria-label="返回"
        >
          <span class="material-symbols-outlined text-on-surface"
            >arrow_back</span
          >
        </button>
      </div>

      <!-- Center: Title -->
      <h1 class="text-xl font-semibold text-on-surface font-chinese">
        {{ title }}
      </h1>

      <!-- Right: Actions slot or Settings button -->
      <div class="w-12 flex justify-end">
        <slot name="actions">
          <button
            v-if="showSettings"
            @click="handleSettingsClick"
            class="flex items-center justify-center w-12 h-12 rounded-full hover:bg-surface-container-high transition-colors"
            aria-label="設定"
          >
            <span class="material-symbols-outlined text-on-surface"
              >settings</span
            >
          </button>
        </slot>
      </div>
    </div>
  </header>
</template>
