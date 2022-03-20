import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class CommentsService {
  async getEventComments(eventId) {
    const res = await api.get(`api/events/${eventId}/comments`)
    logger.log('[getEventComments]', res.data)
    AppState.comments = res.data
  }
}

export const commentsService = new CommentsService()