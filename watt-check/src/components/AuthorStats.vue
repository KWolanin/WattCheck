<template>
    <div class="bg-amber-200 border border-amber-800 rounded shadow p-4 col-span-1 items-center">
        <div v-if="user">
            <a :href="getAuthorLink" class="text-amber-600 hover:underline">
                {{ user.username }}
            </a>
            <img :src="user.avatar" class="rounded mt-2 mx-auto" width="80" height="80" alt="user avatar" />
            <p class="mt-2">opublikowano: {{ user.publishedStories }} </p>
            <p>obserwujących: {{ user.followers }}</p>
        </div>

        <div v-else class="animate-pulse flex flex-col items-center space-y-3">
            <div class="h-5 w-1/2 bg-yellow-200 rounded"></div>
            <div class="w-[80px] h-[80px] bg-yellow-200 rounded"></div>
            <div class="h-4 w-3/4 bg-yellow-200 rounded"></div>
            <div class="h-4 w-2/3 bg-yellow-200 rounded"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

const backendUrl = import.meta.env.VITE_API_URL

type User = {
    username: string
    avatar: string
    publishedStories: number
    followers: number
}

const user = ref<User>()

const props = defineProps({
    username: {
        type: String,
        required: true
    }
})

const getAuthorLink = computed(() => `https://www.wattpad.com/user/${user.value?.username}`)

onMounted(async () => {
    try {
        const res = await fetch(`${backendUrl}/user`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user: props.username })
        })
        user.value = await res.json()
    } catch (error) {
        console.error('Błąd podczas ładowania danych:', error)
    }
})
</script>
