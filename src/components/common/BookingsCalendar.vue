<script setup lang="ts">
import { useDate } from '@/composables'
import { ref, computed, onMounted } from 'vue'
import { isSameDay, startOfDay } from 'date-fns'
import { getStations } from '@/services/stations'
import type { Booking, Station } from '@/common/types'
import { Calendar, CalendarTile } from '@/components/ui/Calendar'
import { Autocomplete, type Selectable } from '@/components/ui/Autocomplete'
import { BookingDetailDialog, useBookingDetailDialog } from '@/components/common/BookingDetailDialog'
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/Table'

const { getVirtualMonth, getVirtualWeek } = useDate()
const { getBookingInfoAndOpen } = useBookingDetailDialog()

const date = ref(new Date())
const month = computed(() => getVirtualMonth(date.value))
const weekdays = computed(() => getVirtualWeek(month.value, date.value))

let stations = ref<Station[]>([])
const selectedStation = ref<Station | null>(null)

const stationSuggestions = computed<Selectable[]>(() =>
  stations.value.map((station) => ({ label: station.name, id: station.id }))
)

function getBookingsForDay(dayDate: Date) {
  if (!selectedStation.value) return []

  return selectedStation.value.bookings.filter((booking: Booking) => {
    const startDate = startOfDay(booking.startDate)
    const endDate = startOfDay(booking.endDate)
    return isSameDay(dayDate, startDate) || isSameDay(dayDate, endDate)
  })
}

function handleStationSelection(station: Selectable) {
  const foundStation = stations.value.find((s) => s.id === station.id)
  selectedStation.value = foundStation || null
}

function getBookingPeriod(booking: Booking, dayDate: Date) {
  const startDate = startOfDay(booking.startDate)
  const endDate = startOfDay(booking.endDate)

  if (isSameDay(dayDate, startDate)) return 'Starts'
  if (isSameDay(dayDate, endDate)) return 'Ends'
  return ''
}

onMounted(async () => {
  stations.value = await getStations()
})
</script>
<template>
  <div class="flex flex-col gap-10 px-2">
    <Autocomplete
      placeholder="Search for a station"
      label="Stations"
      :suggestions="stationSuggestions"
      class="w-1/2 self-center transition-all duration-500 ease-in-out xl:w-1/3"
      @selection="handleStationSelection"
    />
    <Calendar v-model:month="month" v-model:date="date">
      <CalendarTile :date="weekday" v-for="(weekday, i) in weekdays" :key="i">
        <Table>
          <TableCaption class="mb-1">List of bookings</TableCaption>
          <TableHeader>
            <TableRow class="hover:bg-transparent">
              <TableHead> Customer </TableHead>
              <TableHead class="text-right"> Period </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody v-if="selectedStation">
            <TableRow
              v-for="booking in getBookingsForDay(weekday)"
              :key="booking.id"
              @click="getBookingInfoAndOpen({ bookingId: booking.id, stationId: selectedStation!.id })"
              class="cursor-help"
            >
              <TableCell> {{ booking.customerName }} </TableCell>
              <TableCell class="text-right"> {{ getBookingPeriod(booking, weekday) }} </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CalendarTile>
    </Calendar>
    <BookingDetailDialog />
  </div>
</template>
