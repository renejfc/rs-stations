<script setup lang="ts">
import { Button } from '@/components/ui'
import { Picker } from '@/components/ui/Calendar'
import { useDate, type VirtualMonth } from '@/composables'
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

const { getLastWeekOfVirtualMonth, getVirtualMonth } = useDate()

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
  <div class="flex flex-col">
    <section class="mb-10 flex w-full items-center justify-center gap-3 text-center">
      <Button size="icon" variant="outline" @click="prevWeek"> <LeftCaret /></Button>
      <Picker v-model="date" />
      <Button size="icon" variant="outline" @click="nextWeek"> <RightCaret /></Button>
    </section>
    <section class="flex w-full flex-row flex-wrap justify-center gap-3">
      <slot />
    </section>
  </div>
</template>
