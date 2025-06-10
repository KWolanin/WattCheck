<template>
    <div class="bg-amber-200 border border-amber-800 rounded shadow p-4 col-span-2">
        <h3 class="text-xl font-bold mb-2">{{ $t('summary') }}</h3>
        <p class="text-left">{{ description }}</p>
    </div>
</template>

<script setup lang="ts">

defineProps({
    description: {
        type: String,
        required: true
    }
})

</script>