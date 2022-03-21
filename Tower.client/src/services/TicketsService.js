import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TicketsService {
  async getEventTickets(eventId) {
    const res = await api.get(`api/events/${eventId}/tickets`)
    logger.log('[getEventTickets]', res.data)
    AppState.tickets = res.data
  }
  async getAccountTickets() {
    const res = await api.get('account/tickets')
    logger.log('[getAccountTickets]', res.data)
    AppState.myTickets = res.data
  }
  async createTicket(userId, eventId) {
    const body = {
      userId: userId,
      eventId: eventId
    }
    const res = await api.post('api/tickets', body)
    logger.log('[createTicket]', res.data)
    AppState.tickets = [...AppState.tickets, res.data]
    AppState.myTickets = [...AppState.myTickets, res.data]
  }
  async deleteTicket(id) {
    const res = await api.delete('api/tickets/' + id)
    logger.log('[deleteTicket]', res.data)
    AppState.myTickets = AppState.myTickets.filter(t => t.id != id)
    AppState.tickets = AppState.tickets.filter(t => t.id != id)
  }
}
export const ticketsService = new TicketsService()