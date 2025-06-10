<template>
  <a :href="chapter.link" target="_blank"
    class="flex justify-between items-center px-4 py-2 border border-amber-800 rounded-md shadow-sm hover:bg-amber-500 transition-colors text-gray-800 bg-amber-200">

    <div class="flex items-center space-x-2 max-w-[70%] overflow-hidden">
      <span class="font-semibold truncate">{{ chapter.title }}</span>
      <span class="flex space-x-2 text-xs text-white">

        <span class="flex items-center bg-emerald-500 rounded px-2 py-0.5 space-x-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <span v-if="!isLoading">{{ stats.views }}</span>
          <span v-else class="w-4 h-3 bg-emerald-300 rounded animate-pulse"></span>
        </span>

        <span class="flex items-center bg-purple-500 rounded px-2 py-0.5 space-x-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.975a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.462a1 1 0 00-.364 1.118l1.287 3.974c.3.922-.755 1.688-1.538 1.118l-3.388-2.462a1 1 0 00-1.176 0l-3.388 2.462c-.783.57-1.838-.196-1.538-1.118l1.287-3.974a1 1 0 00-.364-1.118L2.045 9.402c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.975z" />
          </svg>
          <span v-if="!isLoading">{{ stats.stars }}</span>
          <span v-else class="w-4 h-3 bg-purple-300 rounded animate-pulse"></span>
        </span>

        <span class="flex items-center bg-sky-500 rounded px-2 py-0.5 space-x-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M7 8h10M7 12h5m-5 4h7m-7-8v8a2 2 0 002 2h6l4 4V8a2 2 0 00-2-2H7z" />
          </svg>
          <span v-if="!isLoading">{{ stats.comments }}</span>
          <span v-else class="w-4 h-3 bg-sky-300 rounded animate-pulse"></span>
        </span>
      </span>
    </div>

<span class="text-sm text-gray-500 whitespace-nowrap">
  {{ formatDate(new Date(chapter.date), { dateStyle: 'medium' }) }}
</span>
  </a>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const backendUrl = import.meta.env.VITE_API_URL

import { useI18n } from 'vue-i18n'

const { d: formatDate } = useI18n()


const props = defineProps<{
  chapter: {
    link: string
    title: string
    date: string
  },
  index: number
}>()

type Stats = {
  views: number
  stars: number
  comments: number
}

const stats = ref<Stats>({
  views: 0,
  stars: 0,
  comments: 0
})

const isLoading = ref(true)

const emit = defineEmits(['loadStats'])

onMounted(async () => {
  try {
    const res = await fetch(`${backendUrl}/chapter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: props.chapter.link })
    })
    stats.value = await res.json()
    emit('loadStats', {
      chapterNo: props.index,
      stats: stats.value,
      title: props.chapter.title
    })
  } catch (error) {
    console.error('Błąd podczas ładowania danych:', error)
  } finally {
    isLoading.value = false
  }
})
</script>
