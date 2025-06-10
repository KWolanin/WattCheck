<template>
  <div class="space-y-10 p-4">
    <div
      v-for="(data, index) in chartDataList"
      :key="index"
      class="bg-amber-200 p-4 rounded border border-amber-800 shadow"
    >
      <h2 class="text-lg font-semibold mb-2">{{ data.title }}</h2>
      <div class="h-64">
        <Bar :data="data.chartData" :options="chartOptions" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

type ChapterStats = {
  views: number
  stars: number
  comments: number
}

type Chapter = {
  title: string,
  index: number,
  stats: ChapterStats
}

const props = defineProps<{
  chapters: Chapter[]
}>()

const sortedChapters = computed(() =>
  [...props.chapters].sort((a, b) => a.index - b.index)
)

const labels = computed(() => sortedChapters.value.map((_, index) => `#${index + 1}`))

const chartDataList = computed(() => [
  {
    title: 'Wyświetlenia',
    chartData: {
      labels: labels.value,
      datasets: [
        {
          label: 'Wyświetlenia',
          backgroundColor: 'oklch(69.6% 0.17 162.48)',
          data: sortedChapters.value.map(ch => ch.stats.views)
        }
      ]
    }
  },
  {
    title: 'Gwiazdki',
    chartData: {
      labels: labels.value,
      datasets: [
        {
          label: 'Gwiazdki',
          backgroundColor: 'oklch(62.7% 0.265 303.9)',
          data: sortedChapters.value.map(ch => ch.stats.stars)
        }
      ]
    }
  },
  {
    title: 'Komentarze',
    chartData: {
      labels: labels.value,
      datasets: [
        {
          label: 'Komentarze',
          backgroundColor: 'oklch(68.5% 0.169 237.323)',
          data: sortedChapters.value.map(ch => ch.stats.comments)
        }
      ]
    }
  }
])




import type { TooltipItem } from 'chart.js';

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      callbacks: {
        title: (tooltipItems: TooltipItem<'bar'>[]) => {
          const index = tooltipItems[0].dataIndex;
          return sortedChapters.value[index].title;
        },
        label: (tooltipItem: TooltipItem<'bar'>) => {
          const datasetLabel = tooltipItem.dataset.label ?? '';
          const formattedValue = tooltipItem.formattedValue ?? '';
          return `${datasetLabel}: ${formattedValue}`;
        }
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true
    }
  }
};

</script>
