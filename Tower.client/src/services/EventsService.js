import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class EventsService {
  async getAllEvents(type) {
    const res = await api.get('api/events', { params: { type: type } })
    logger.log('[getAllEvents]', res.data)
    AppState.towerEvents = res.data
  }
  async getById(id) {
    const res = await api.get('api/events/' + id)
    logger.log('[getEventById]', res.data)
    AppState.activeEvent = res.data
  }
  async getAccountEvents(accountId) {
    const res = await api.get('api/events')
    logger.log('[getAccountEvents]', res.data.filter(e => e.creatorId == accountId))
    AppState.towerEvents = res.data.filter(e => e.creatorId == accountId)
    // AppState.towerEvents = AppState.towerEvents.filter(e => e.creatorId == accountId)
    // logger.log('[getAccountEvents]', AppState.towerEvents)
  }
  async createEvent(rawData) {
    const res = await api.post('api/events', rawData)
    logger.log('[createEvent]', res.data)
    AppState.towerEvents = [...AppState.towerEvents, res.data]
    return res.data
  }
  async editEvent(eventId, body) {
    const update = AppState.towerEvents.findIndex(e => e.id == eventId)
    const res = await api.put(`api/events/${eventId}`, body)
    logger.log('[editEvent]', res.data)
  }
  async cancelEvent(id) {
    const res = await api.delete('api/events/' + id)
    logger.log('[cancelEvent]', res.data)
    AppState.activeEvent.isCanceled = true
  }
}

export const eventsService = new EventsService()