<template>
  <div class="p-4">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
      <div class="bg-amber-200 border border-amber-800 rounded shadow p-4 col-span-1">
        <p class="text-lg font-semibold">
          <a :href="data.result.url" target="_blank" class="hover:underline">
            {{ data.result.title }}
          </a>
        </p>
        <a :href="getAuthorLink" class="text-amber-600 hover:underline">
          {{ data.result.author }}
        </a>
        <img :src="user?.result?.avatar" class="rounded" width="80" height="80" alt="user avatar"/>
        <p> opublikowano: {{ user?.result?.numStoriesPublished }} historii</p>
      </div>

      <div class="bg-amber-200 border border-amber-800 rounded shadow p-4 col-span-1">
        <h3 class="text-xl font-bold mb-2">Statystyki</h3>
        <p>{{ data.result.stats.views }} wyświetleń</p>
        <p>{{ data.result.stats.votes }} głosów</p>
        <p>{{ data.result.stats.parts }} części</p>
      </div>

      <div class="bg-amber-200 border border-amber-800 rounded shadow p-4 col-span-2">
        <h3 class="text-xl font-bold mb-2">Streszczenie</h3>
        <p class="text-left">{{ data.result.description }}</p>
      </div>
    </div>

    <div class="mt-6 flex flex-wrap gap-2">
      <span v-for="tag in props.data.result.tagList" :key="tag">
        <TagComp :name="tag" />
      </span>
    </div>

    <!-- <h3 class="text-xl font-bold mt-6 mb-2">Rozdziały:</h3> -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mt-6 mb-2">
      <div v-for="(chapter, index) in props.data.chapters" :key="chapter">
        <ChapterBar :chapter="chapter" @loadStats="(stats)=> handleStats(stats)" :index="index" />
      </div>
    </div>


      <ChapterStats :chapters="allStats" />

  </div>
</template>

<script setup>
import { defineProps, computed, ref, onMounted } from 'vue'
import TagComp from './TagComp.vue'
import ChapterBar from './ChapterBar.vue'
import ChapterStats from './ChapterStats.vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const allStats = ref([])

const handleStats = (stats) => {
  allStats.value.push(stats)
}

const user = ref({})

const getAuthorLink = computed(() => `https://www.wattpad.com/user/${props.data.result.author}`)

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:3000/api/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: props.data.result.author }),
    })
    user.value = await res.json()

  } catch (error) {
    console.error('Błąd podczas ładowania danych:', error)
  }
})

</script>
