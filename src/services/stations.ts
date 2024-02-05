import type { Station } from '@/common/types'
import { API_ENDPOINT, STATIONS_PATH } from '@/common/constants'
import { ofetch } from 'ofetch'

export async function getStations(): Promise<Station[]> {
  const response = await ofetch<Station[]>(API_ENDPOINT + STATIONS_PATH)
  return response
}
