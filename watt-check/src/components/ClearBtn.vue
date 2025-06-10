<template>
  <div class="p-4">
    <button
      class="bg-stone-500 text-white shadow-md px-4 py-2 rounded hover:bg-yellow-500 transition whitespace-nowrap flex items-center justify-center font-bold"
      @click="handleClear"
    >
      {{$t('clear')}}
    </button>
  </div>
</template>

<script setup>
const emit = defineEmits(["clear"]);
const handleClear = () => {
  emit("clear");
};
</script>
