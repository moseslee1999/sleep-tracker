<script setup>
import { ref, watch } from 'vue'
import Dialog from './Dialog.vue'

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: true,
  },
  initialValue: {
    type: String,
    default: '00:00',
  },
})

const emit = defineEmits(['update:open', 'confirm'])

const isOpen = ref(props.open)
const hours = ref('00')
const minutes = ref('00')

watch(() => props.open, (newVal) => {
  isOpen.value = newVal
  if (newVal) {
    // Parse initial value
    const [h, m] = props.initialValue.split(':')
    hours.value = h.padStart(2, '0')
    minutes.value = m.padStart(2, '0')
  }
})

watch(isOpen, (newVal) => {
  emit('update:open', newVal)
})

const handleHoursInput = (event) => {
  let value = parseInt(event.target.value) || 0
  if (value < 0) value = 0
  if (value > 23) value = 23
  hours.value = String(value).padStart(2, '0')
}

const handleMinutesInput = (event) => {
  let value = parseInt(event.target.value) || 0
  if (value < 0) value = 0
  if (value > 59) value = 59
  minutes.value = String(value).padStart(2, '0')
}

const incrementHours = () => {
  let h = parseInt(hours.value)
  h = (h + 1) % 24
  hours.value = String(h).padStart(2, '0')
}

const decrementHours = () => {
  let h = parseInt(hours.value)
  h = (h - 1 + 24) % 24
  hours.value = String(h).padStart(2, '0')
}

const incrementMinutes = () => {
  let m = parseInt(minutes.value)
  m = (m + 1) % 60
  minutes.value = String(m).padStart(2, '0')
}

const decrementMinutes = () => {
  let m = parseInt(minutes.value)
  m = (m - 1 + 60) % 60
  minutes.value = String(m).padStart(2, '0')
}

const handleConfirm = () => {
  const timeString = `${hours.value}:${minutes.value}`
  emit('confirm', timeString)
  isOpen.value = false
}

const handleCancel = () => {
  isOpen.value = false
}
</script>

<template>
  <Dialog v-model:open="isOpen">
    <template #default="{ close }">
      <!-- Header -->
      <div class="px-6 pt-6 pb-4 border-b border-outline-variant">
        <h2 class="text-headline-md text-on-surface font-chinese">
          {{ title }}
        </h2>
      </div>

      <!-- Time picker content -->
      <div class="px-6 py-8">
        <div class="flex items-center justify-center gap-4">
          <!-- Hours -->
          <div class="flex flex-col items-center">
            <button
              @click="incrementHours"
              class="w-12 h-12 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors"
              aria-label="增加小時"
            >
              <span class="material-symbols-outlined text-on-surface">expand_less</span>
            </button>
            <input
              type="number"
              :value="hours"
              @input="handleHoursInput"
              min="0"
              max="23"
              class="w-20 h-20 text-center text-headline-lg text-primary bg-surface-container rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="小時"
            />
            <button
              @click="decrementHours"
              class="w-12 h-12 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors"
              aria-label="減少小時"
            >
              <span class="material-symbols-outlined text-on-surface">expand_more</span>
            </button>
          </div>

          <!-- Separator -->
          <span class="text-headline-lg text-on-surface">:</span>

          <!-- Minutes -->
          <div class="flex flex-col items-center">
            <button
              @click="incrementMinutes"
              class="w-12 h-12 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors"
              aria-label="增加分鐘"
            >
              <span class="material-symbols-outlined text-on-surface">expand_less</span>
            </button>
            <input
              type="number"
              :value="minutes"
              @input="handleMinutesInput"
              min="0"
              max="59"
              class="w-20 h-20 text-center text-headline-lg text-primary bg-surface-container rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="分鐘"
            />
            <button
              @click="decrementMinutes"
              class="w-12 h-12 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors"
              aria-label="減少分鐘"
            >
              <span class="material-symbols-outlined text-on-surface">expand_more</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="px-6 pb-6 flex gap-3 justify-end border-t border-outline-variant pt-4">
        <button
          @click="handleCancel"
          class="px-6 py-3 rounded-lg text-label-lg font-chinese text-on-surface hover:bg-surface-container transition-colors min-h-touch-target-min"
        >
          取消
        </button>
        <button
          @click="handleConfirm"
          class="px-6 py-3 rounded-lg text-label-lg font-chinese bg-primary text-on-primary hover:bg-primary-fixed transition-colors min-h-touch-target-min"
        >
          確認
        </button>
      </div>
    </template>
  </Dialog>
</template>

<style scoped>
/* Hide number input spinner buttons */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>
