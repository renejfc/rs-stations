<script setup lang="ts">
import { computed } from 'vue'
import type { CalendarTileProps } from './Calendar.types'
import { useDate } from '@/composables'

const props = defineProps<CalendarTileProps>()
const { getWeekdayName, getWeekdayDayNumber } = useDate()

const dateStr = computed(() => {
  const weekday = getWeekdayName(props.date)
  const dayNumber = getWeekdayDayNumber(props.date)
  return `${weekday}, ${dayNumber}`
})
</script>

<template>
  <section class="flex w-full max-w-md flex-col gap-10 rounded-sm border p-1">
    <h1 class="border-b px-3 text-right text-lg font-bold uppercase tracking-widest">{{ dateStr }}</h1>
    <section class="h-40 overflow-auto">
      <slot />
    </section>
  </section>
</template>
