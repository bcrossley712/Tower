import { dbContext } from "../db/DbContext";
import { BadRequest, Forbidden } from "../utils/Errors";

class EventsService {
  async getAll(query = {}) {
    const towerEvents = dbContext.TowerEvents.find(query).populate('creator')
    return towerEvents
  }
  async getById(eventId) {
    const towerEvent = await dbContext.TowerEvents.findById(eventId).populate('creator')
    return towerEvent
  }
  async create(body) {
    const towerEvent = await dbContext.TowerEvents.create(body)
    await towerEvent.populate('creator')
    return towerEvent
  }
  async edit(eventId, update) {
    const original = await dbContext.TowerEvents.findById(eventId)
    if (original.isCanceled) {
      throw new BadRequest('Cannot modify a cancelled event')
    }
    if (original.creatorId.toString() !== update.creatorId) {
      throw new Forbidden('You are not allowed to edit this event')
    }
    original.name = update.name ? update.name : original.name
    original.description = update.description ? update.description : original.description
    original.type = update.type ? update.type : original.type
    original.coverImg = update.coverImg ? update.coverImg : original.coverImg
    original.location = update.location ? update.location : original.location
    original.capacity = update.capacity !== null ? update.capacity : original.capacity
    await original.save()
    return original
  }
  async cancel(eventId, creatorId) {
    const cancelledEvent = await dbContext.TowerEvents.findById(eventId)
    if (cancelledEvent.creatorId.toString() !== creatorId) {
      throw new Forbidden('You cannot cancel this event')
    }
    cancelledEvent.isCanceled = !cancelledEvent.isCanceled
    await cancelledEvent.save()

  }

}

export const eventsService = new EventsService()