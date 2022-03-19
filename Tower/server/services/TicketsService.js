import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"

class TicketsService {
  async getMyTickets(accountId) {
    // See getMyBids GregsList
    const myTickets = await dbContext.Tickets.find({ accountId }).populate('event')
    return myTickets
  }
  async getEventTickets(eventId) {
    const allTickets = await dbContext.Tickets.find()
    const eventTickets = allTickets.filter(t => t.eventId == eventId)
    return eventTickets
  }
  async create(body) {
    const ticket = await dbContext.Tickets.create(body)
    const thisEvent = await dbContext.TowerEvents.findById(body.eventId)
    thisEvent.capacity -= 1
    await thisEvent.save()
    await ticket.populate('account')
    await ticket.populate('event')
    return ticket
  }
  async remove(ticketId, userId) {
    const ticketToRemove = await dbContext.Tickets.findById(ticketId)
    if (ticketToRemove.creatorId.toString() !== userId) {
      throw new Forbidden('Not allowed to delete this ticket')
    }
    await dbContext.Tickets.findByIdAndDelete(ticketId)
  }
}

export const ticketsService = new TicketsService()
