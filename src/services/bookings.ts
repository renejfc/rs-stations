import { ofetch } from 'ofetch'
import type { Booking } from '@/common/types'
import { API_ENDPOINT, STATIONS_PATH } from '@/common/constants'

export type getBookingInfoParams = {
  stationId: string
  bookingId: string
}

export async function getBookingInfo({ stationId, bookingId }: getBookingInfoParams): Promise<Booking> {
  const { customerName, endDate, id, pickupReturnStationId, startDate } = await ofetch<Booking>(
    API_ENDPOINT + STATIONS_PATH + `/${stationId}/bookings/${bookingId}`
  )
  return { customerName, endDate, id, pickupReturnStationId, startDate }
}
