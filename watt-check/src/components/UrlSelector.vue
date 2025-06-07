<template>
  <div class="h-screen flex items-center justify-center">
    <div class="w-full max-w-xl">
      <div class="p-4 w-full flex items-center justify-center">
        <p class="text-white font-bold text-3xl p-4">
          Wattpad stats checker
        </p>
      </div>

      <div class="flex space-x-4">
        <input
          class="flex-1 px-4 py-2 border border-gray-300 text-gray-200 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          type="text" placeholder="Wklej link do opowiadania (http://wattpad.com/story/...)" v-model="url"
          @keyup.enter="handleFetch" />
        <button
          class="bg-amber-500 text-white shadow-md px-4 py-2 rounded hover:bg-yellow-500 transition whitespace-nowrap flex items-center justify-center font-bold"
          @click="handleFetch" :disabled="loading">
          <span v-if="!loading">Załaduj fika!</span>
          <svg v-else class="w-5 h-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
        </button>
      </div>
      <span class="block text-center mt-4">
        <span v-if="error" class=" text-red-400 font-bold">
          {{ error }}
        </span>
        <span v-if="loadingMessage" class=" text-green-400 font-bold">
          {{ loadingMessage }}
        </span>
      </span>


    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const emit = defineEmits(['fetched'])

const url = ref('')
const error = ref('')
const loading = ref(false)
const loadingMessage = ref('')
const values = ['Wczytywanie fika...', 'To może zająć chwilę...', 'Jeszcze moment...',]
let index = 0
let intervalId = null

const handleFetch = async () => {
  error.value = ''
  if (!url.value) {
    error.value = 'Wprowadź adres url!'
    return
  }
  if (!url.value.startsWith('https://www.wattpad.com/story/')) {
    error.value = 'Link jest niepoprawny, sprawdź go i spróbuj ponownie'
    return
  }

  loading.value = true
  try {
    // watt-check-1yy4-naw7uzzrz-kais-projects-363dcde5.vercel.app
    // http://localhost:3000
    const res = await fetch('https://watt-check-1yy4-naw7uzzrz-kais-projects-363dcde5.vercel.app/api/story', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: url.value }),
    })
    const data = await res.json()
    emit('fetched', data)
  } catch (err) {
    console.error('Błąd podczas ładowania danych:', err)
    error.value = 'Wystąpił błąd: sprawdź poprawność adresu i spróbuj ponownie.'
  } finally {
    loading.value = false
  }
}



watch(loading, (newVal) => {
  if (newVal) {
    intervalId = setInterval(() => {
      index = (index + 1) % values.length
      loadingMessage.value = values[index]
    }, 3000)
  } else {
    clearInterval(intervalId)
    intervalId = null
    index = 0
    loadingMessage.value = ''
  }
})

</script>
