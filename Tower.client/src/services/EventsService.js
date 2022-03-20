import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class EventsService {
  async getEvents() {
    const res = await api.get('api/events')
    logger.log('[getEvents]', res.data)
    AppState.towerEvents = res.data
  }
  async getById(id) {
    const res = await api.get('api/events/' + id)
    logger.log('[getEventById]', res.data)
    AppState.activeEvent = res.data
  }
  async remove(id) {
    const res = await api.delete('api/events/' + id)
    logger.log('[removeEvent]', res.data)
    AppState.towerEvents = AppState.towerEvents.filter(e => e.id != id)
  }
}

export const eventsService = new EventsService()