import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import { ticketsService } from "../services/TicketsService"
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/tickets', this.getMyTickets)
      .put('', this.updateAccount)
  }
  async updateAccount(req, res, next) {
    try {
      const update = await accountService.updateAccount(req.userInfo.id, req.body)
      return res.send(update)
    } catch (error) {
      next(error)
    }
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }
  async getMyTickets(req, res, next) {
    try {
      const tickets = await ticketsService.getMyTickets({
        accountId: req.userInfo.id
      })
      return res.send(tickets)
    } catch (error) {
      next(error)
    }
  }
}
