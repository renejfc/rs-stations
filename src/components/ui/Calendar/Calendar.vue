<script setup lang="ts">
import { computed } from 'vue'
import { useDate } from '@/composables'

const props = defineProps<{
  date: Date
}>()

const { getWeekNumberOfMonth, getMonthName } = useDate()

const dateStr = computed(() => {
  const month = getMonthName({ date: props.date })
  const weekNumber = getWeekNumberOfMonth(props.date)
  return `${month}, Week ${weekNumber}`
})
</script>
<template>
  <div class="shadow-sm shadow-muted">
    <section class="mb-2 text-center">
      <h1 class="text-2xl font-semibold uppercase tracking-wider">{{ dateStr }}</h1>
    </section>
    <section class="flex flex-col gap-10">
      <slot />
    </section>
  </div>
</template>
