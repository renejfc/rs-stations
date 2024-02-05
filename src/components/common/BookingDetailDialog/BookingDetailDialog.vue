<script setup lang="ts">
import { computed } from 'vue'
import { Dialog } from '@/components/ui'
import { format, formatDistance } from 'date-fns'
import { useBookingDetailDialog } from './bookingDetailDialog'
import { Clock, Person, Building, Arriving, Departing } from '@/components/ui/Icons'
import { AutocompleteSeparator as Separator } from '@/components/ui/Autocomplete'

const { dialogState, bookingInfo } = useBookingDetailDialog()

const bookingDetail = computed(() => {
  if (!bookingInfo.value) return null

  return {
    customer: bookingInfo.value.customerName,
    startDate: format(bookingInfo.value.startDate, 'MMM, dd - yyyy'),
    endDate: format(bookingInfo.value.endDate, 'MMM, dd - yyyy'),
    bookingDuration: formatDistance(bookingInfo.value.startDate, bookingInfo.value.endDate),
    stationName: bookingInfo.value.pickupReturnStationId
  }
})

const names = {
  customer: 'Customer',
  startDate: 'Starts on',
  endDate: 'Ends on',
  bookingDuration: 'Duration',
  stationName: 'Pickup/Return Station'
}

const icons = {
  customer: Person,
  startDate: Departing,
  endDate: Arriving,
  bookingDuration: Clock,
  stationName: Building
}
</script>

<template>
  <Dialog v-model="dialogState" title="Booking Detail" class="p-4">
    <h1 class="text-2xl font-bold tracking-tighter">Booking Details</h1>
    <ul class="mx-1 my-10 flex flex-col gap-3">
      <li v-for="(value, key) in bookingDetail" :key="key" class="flex flex-col gap-2">
        <span class="flex items-center gap-2">
          <component :is="icons[key]" class="size-5 align-middle" />
          <span class="align-middle text-sm font-semibold uppercase tracking-tighter text-muted-foreground">
            {{ names[key] }}:
          </span>
          <span class="font-semibold uppercase text-primary">
            {{ value }}
          </span>
        </span>
        <Separator />
      </li>
    </ul>
  </Dialog>
</template>
