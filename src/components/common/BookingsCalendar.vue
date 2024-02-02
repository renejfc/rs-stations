<script setup lang="ts">
import { ref, computed } from 'vue'
import { useDate } from '@/composables/date'
import { Calendar, CalendarTile } from '@/components/ui/Calendar'
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/Table'

const date = ref(new Date())
const { getWeekNumberOfMonth } = useDate()

const currentWeekNumber = computed(() => getWeekNumberOfMonth(date.value))
const currentMonth = date.value.getMonth()

const weekdays = computed(() => {
  let daysInCurrentWeek: Date[] = []

  for (let dayOffset = 1; dayOffset <= 7; dayOffset++) {
    const dayInWeek = new Date(date.value)
    adjustDateToDayOfWeek(dayInWeek, dayOffset)

    if (isDayInCurrentMonthAndWeek(dayInWeek)) {
      daysInCurrentWeek = [...daysInCurrentWeek, dayInWeek]
    }
  }

  return daysInCurrentWeek
})

function adjustDateToDayOfWeek(date: Date, dayOffset: number) {
  const currentDayOfWeek = date.getDay()
  const offsetFromCurrentDay = dayOffset - currentDayOfWeek
  date.setDate(date.getDate() + offsetFromCurrentDay)
}

function isDayInCurrentMonthAndWeek(day: Date) {
  return day.getMonth() === currentMonth && getWeekNumberOfMonth(day) === currentWeekNumber.value
}
</script>
<template>
  <Calendar :date="date">
    <div v-for="(weekday, index) in weekdays" :key="index">
      <CalendarTile :date="weekday">
        <Table>
          <TableCaption class="mb-1">List of bookings</TableCaption>
          <TableHeader>
            <TableRow class="hover:bg-transparent">
              <TableHead> Customer </TableHead>
              <TableHead class="text-right"> Period </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell> Abdhul Akhmeh Istarion Dahmel </TableCell>
              <TableCell class="text-right"> Start </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CalendarTile>
    </div>
  </Calendar>
</template>
