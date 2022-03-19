import { Auth0Provider } from "@bcwdev/auth0provider";
import { eventsService } from "../services/EventsService";
import { ticketsService } from "../services/TicketsService";
import BaseController from "../utils/BaseController";

export class EventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/tickets', this.getEventTickets)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.cancel)
  }
  async getAll(req, res, next) {
    try {
      const events = await eventsService.getAll()
      return res.send(events)
    } catch (error) {
      next(error)
    }
  }
  async getById(req, res, next) {
    try {
      const event = await eventsService.getById(req.params.id)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }
  async getEventTickets(req, res, next) {
    try {
      const event = await ticketsService.getEventTickets(req.params.id)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }
  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const event = await eventsService.create(req.body)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }
  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const update = await eventsService.edit(req.params.id, req.body)
      return res.send(update)
    } catch (error) {
      next(error)
    }
  }
  async cancel(req, res, next) {
    try {
      await eventsService.cancel(req.params.id, req.userInfo.id)
      return res.send('Event cancelled')
    } catch (error) {
      next(error)
    }
  }
}