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
    const newTicket = { ...res.data, name: res.data.account.name, picture: res.data.account.picture }
    AppState.tickets = [...AppState.tickets, newTicket]
    AppState.myTickets = [...AppState.myTickets, newTicket]
    AppState.activeEvent.capacity -= 1
  }
  async deleteTicket(id) {
    const ticket = AppState.myTickets.find(t => t.ticketId == id)
    const ticketEvent = AppState.towerEvents.find(e => e.id == ticket.id)
    const res = await api.delete('api/tickets/' + id)
    logger.log('[deleteTicket]', res.data)
    AppState.myTickets = AppState.myTickets.filter(t => t.ticketId != id)
    AppState.tickets = AppState.tickets.filter(t => t.ticketId != id)
    ticketEvent.capacity++
  }
}
export const ticketsService = new TicketsService()