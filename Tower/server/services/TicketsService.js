import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"

class TicketsService {
  async getMyTickets(accountId) {
    // See getMyBids GregsList
    const myTickets = await dbContext.Tickets.find(accountId).populate('event').populate('account')
    return myTickets.map(crappyObject => {
      const myTicket = crappyObject.toJSON()
      return {
        id: myTicket.id,
        accountId: myTicket.accountId,
        eventId: myTicket.eventId
      }
    })
  }
  // FIXME Something wrong with the get ticket functions
  async getEventTickets(eventId) {
    const eventTickets = await dbContext.Tickets.find({ eventId: eventId }).populate('account', 'name picture')
    return eventTickets.map(crappyObject => {
      const eventTicket = crappyObject.toJSON()
      return {
        id: eventTicket.id,
        eventId: eventTicket.id,
        accountId: eventTicket.accountId
      }
    })
  }
  async create(body) {
    const ticket = await dbContext.Tickets.create(body)
    const thisEvent = await dbContext.TowerEvents.findById(body.eventId)
    if (thisEvent.capacity <= 0) {
      throw new BadRequest('Event sold out')
    }
    thisEvent.capacity -= 1
    await thisEvent.save()
    await ticket.populate('account', 'name picture')
    await ticket.populate('event')
    return ticket

  }
  async remove(ticketId, userId) {
    const ticketToRemove = await dbContext.Tickets.findById(ticketId)
    const thisEvent = await dbContext.TowerEvents.findById(ticketToRemove.eventId)
    if (ticketToRemove.creatorId.toString() !== userId) {
      throw new Forbidden('Not allowed to delete this ticket')
    }
    thisEvent.capacity += 1
    await dbContext.Tickets.findByIdAndDelete(ticketId)
    await thisEvent.save()
  }
}

export const ticketsService = new TicketsService()
