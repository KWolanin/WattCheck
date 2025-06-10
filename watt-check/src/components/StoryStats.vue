<template>
    <div class="bg-amber-200 border border-amber-800 rounded shadow p-4 col-span-1">
        <h3 class="text-xl font-bold mb-2">Statystyki</h3>
        <a :href="storyData.url" target="_blank" class="hover:underline">
            {{ storyData.title }}
        </a>
        <p>{{ storyData.stats.views }} wyświetleń</p>
        <p>{{ storyData.stats.votes }} głosów</p>
        <p>{{ storyData.stats.parts }} części</p>
    </div>
</template>


<script setup lang="ts">

defineProps({
    storyData: {
        type: Object,
        required: true
    }
})

</script>