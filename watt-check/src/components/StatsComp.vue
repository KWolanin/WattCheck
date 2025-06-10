<template>
  <div class="p-4">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
      <AuthorStats :username="data.author" />
      <StoryStats :storyData="data" />
      <StoryDescription :description="data.description" />
    </div>
    <div class="mt-6 flex flex-wrap gap-2">
      <span v-for="tag in props.data.tagList" :key="tag">
        <TagComp :name="tag" />
      </span>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mt-6 mb-2">
      <div v-for="(chapter, index) in props.data.chapters" :key="chapter">
        <ChapterBar :chapter="chapter" @loadStats="(stats) => handleStats(stats)" :index="index" />
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
import AuthorStats from './AuthorStats.vue'
import StoryStats from './StoryStats.vue'
import StoryDescription from './StoryDescription.vue'

const backendUrl = import.meta.env.VITE_API_URL


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

</script>
