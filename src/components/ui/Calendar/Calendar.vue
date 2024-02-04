<script setup lang="ts">
import { computed } from 'vue'
import { useDate, type VirtualMonth } from '@/composables'
import { Button } from '@/components/ui'
import { RightCaret, LeftCaret } from '@/components/ui/Icons'
import {
  addWeeks,
  lastDayOfWeek,
  isSameMonth,
  isLastDayOfMonth,
  startOfMonth,
  startOfWeek,
  isFirstDayOfMonth,
  subMonths,
  lastDayOfMonth
} from 'date-fns'

const date = defineModel<Date>('date', { required: true })
const month = defineModel<VirtualMonth>('month', { required: true })

const { getMonthName, getVirtualWeekNumber, getLastWeekOfVirtualMonth, getVirtualMonth } = useDate()

const dateStr = computed(() => `${getMonthName(month.value)}, Week ${getVirtualWeekNumber(month.value, date.value)}`)

function nextWeek() {
  let nextWeekDate = addWeeks(date.value, 1)

  const lastDayOfNextWeek = lastDayOfWeek(nextWeekDate, { weekStartsOn: 1 })
  const lastWeekOfCurrentMonth = getLastWeekOfVirtualMonth(month.value)
  const lastDayOfCurrentMonth = lastWeekOfCurrentMonth[lastWeekOfCurrentMonth.length - 1]
  const nextWeekIsIntersecting = !isSameMonth(lastDayOfNextWeek, lastDayOfCurrentMonth)

  if (nextWeekIsIntersecting && !isLastDayOfMonth(date.value)) {
    nextWeekDate = lastDayOfCurrentMonth
    date.value = nextWeekDate
    return
  }

  if (isLastDayOfMonth(date.value)) {
    month.value = getVirtualMonth(nextWeekDate)
    date.value = startOfMonth(nextWeekDate)
    return
  }

  date.value = lastDayOfNextWeek
}

function prevWeek() {
  let prevWeekDate = addWeeks(date.value, -1)

  if (isFirstDayOfMonth(date.value)) {
    const previousMonthDate = subMonths(date.value, 1)
    month.value = getVirtualMonth(previousMonthDate)
    date.value = lastDayOfMonth(previousMonthDate)
    return
  }

  const firstDayOfPrevWeek = startOfWeek(prevWeekDate, { weekStartsOn: 1 })
  const firstDayOfCurrentMonth = month.value[0][0]
  const prevWeekIsIntersecting = !isSameMonth(firstDayOfPrevWeek, firstDayOfCurrentMonth)

  if (prevWeekIsIntersecting && !isFirstDayOfMonth(date.value)) {
    date.value = firstDayOfCurrentMonth
    return
  }

  date.value = firstDayOfPrevWeek
}
</script>
<template>
  <div class="flex flex-col items-center">
    <section class="mb-10 flex gap-3 text-center">
      <Button size="icon" variant="outline" @click="prevWeek"> <LeftCaret /></Button>
      <h1 class="self-center align-middle text-2xl font-semibold uppercase">{{ dateStr }}</h1>
      <Button size="icon" variant="outline" @click="nextWeek"> <RightCaret /></Button>
    </section>
    <section class="flex flex-col flex-wrap justify-center gap-0 md:flex-row">
      <slot />
    </section>
  </div>
</template>
