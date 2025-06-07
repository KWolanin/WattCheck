<template>
  <span :class="['px-2 py-1 rounded text-white text-sm font-semibold', randomColorClass]">
    {{ name }}
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  }
})

const tailwindColors = [
  'bg-amber-500',
  'bg-emerald-500',
  'bg-sky-700',
  'bg-rose-500'
]

const randomColorClass = computed(() => {
  const index = Math.floor(Math.random() * tailwindColors.length)
  return tailwindColors[index]
})
</script>
