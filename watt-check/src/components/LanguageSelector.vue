<template>
  <div class="fixed top-4 right-4 z-50 flex space-x-2  px-3 py-1 rounded">
    <button
      v-for="locale in locales"
      :key="locale"
      @click="setLocale(locale)"
      :class="[
        'px-2 py-1 rounded text-sm font-semibold border transition-colors duration-200',
        locale === currentLocale
          ? 'bg-amber-500 text-white border-amber-700'
          : 'bg-white text-amber-700 border-amber-300 hover:bg-amber-100'
      ]"
    >
      {{ locale.toUpperCase() }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const currentLocale = locale
const locales = ['pl', 'en']

function setLocale(l: string) {
  locale.value = l
}
</script>
