<template>
  <div class="bg-purple-950">
    <LanguageSelector />
    <UrlSelector v-if="!jsonData" @fetched="handleData" />
    <div v-if="jsonData">
      <div class="w-full">
        <ClearBtn @clear="clear" />
      </div>
      <StatsComp :data="jsonData" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import UrlSelector from "../components/UrlSelector.vue";
import StatsComp from "../components/StatsComp.vue";
import ClearBtn from "../components/ClearBtn.vue"
import LanguageSelector from "../components/LanguageSelector.vue";

const jsonData = ref<string>("");

const handleData = (data: string) => {
  jsonData.value = data;
};

const clear = () => {
  jsonData.value = "";
};
</script>
