<script setup lang="ts">
import { ref, computed } from 'vue'
import { Calendar, CalendarTile } from '@/components/ui/Calendar'
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/Table'
import { useDate } from '@/composables'

const { getVirtualMonth, getVirtualWeek } = useDate()

const date = ref(new Date())
const month = ref(getVirtualMonth(date.value))

const weekdays = computed(() => getVirtualWeek(month.value, date.value))
</script>
<template>
  <Calendar v-model:month="month" v-model:date="date">
    <div v-for="(weekday, i) in weekdays" :key="i">
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
