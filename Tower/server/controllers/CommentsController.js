import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";


export class CommentsController extends BaseController {
  constructor() {
    super('api/comments');
    this.router
      .get('', this.getAll)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:id', this.remove);
  }
  getAll(arg0, getAll) {
    throw new Error("Method not implemented.");
  }
  create(arg0, create) {
    throw new Error("Method not implemented.");
  }
  remove(arg0, remove) {
    throw new Error("Method not implemented.");
  }
}
