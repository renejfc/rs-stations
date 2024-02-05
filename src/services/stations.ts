import type { Station } from '@/common/types'
import { API_ENDPOINT, STATIONS_PATH } from '@/common/constants'
import { ofetch } from 'ofetch'

export async function getStations(): Promise<Station[]> {
  const response = await ofetch<Station[]>(API_ENDPOINT + STATIONS_PATH)
  return response
}

export async function getStationNameById(stationId: string) {
  const stations = await getStations()
  const station = stations.find((s) => s.id === stationId)
  return station ? station.name : 'Unknown Station'
}
