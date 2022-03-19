import { dbContext } from "../db/DbContext";

class EventsService {
  async getAll() {
    const towerEvents = dbContext.TowerEvents.find()
    return towerEvents
  }
  async getById(eventId) {
    const towerEvent = await dbContext.TowerEvents.findById(eventId)
    return towerEvent
  }
  async create(body) {
    const towerEvent = await dbContext.TowerEvents.create(body)
    return towerEvent
  }
  async edit(eventId, body) {
    const update = await dbContext.TowerEvents.findById(eventId)

    return update
  }
  async cancel(eventId, creatorId) {
    const cancelledEvent = await dbContext.TowerEvents.findById(eventId)

  }

}

export const eventsService = new EventsService()