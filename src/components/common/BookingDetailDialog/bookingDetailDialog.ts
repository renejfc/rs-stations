import { ref } from 'vue'
import type { Booking } from '@/common/types'
import { getBookingInfo, type getBookingInfoParams } from '@/services/bookings'
import { getStationNameById } from '@/services/stations'

const dialogState = ref(false)
const bookingInfo = ref<Booking | null>(null)

export function useBookingDetailDialog() {
  function open() {
    dialogState.value = true
  }

  async function getBookingInfoAndOpen({ stationId, bookingId }: getBookingInfoParams) {
    bookingInfo.value = await getBookingInfo({ stationId, bookingId })
    const stationName = await getStationNameById(bookingInfo.value.pickupReturnStationId)
    bookingInfo.value.pickupReturnStationId = stationName

    open()
  }

  return { dialogState, bookingInfo, getBookingInfoAndOpen }
}
