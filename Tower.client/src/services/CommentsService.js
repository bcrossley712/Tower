import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class CommentsService {
  async getEventComments(eventId) {
    const res = await api.get(`api/events/${eventId}/comments`)
    logger.log('[getEventComments]', res.data)
    AppState.comments = res.data.filter(c => c.eventId == eventId)
  }
  async createComment(data) {
    const res = await api.post(`api/comments`, data)
    logger.log('[createComment]', res.data)
    AppState.comments = [...AppState.comments, res.data]
  }
  async deleteComment(id) {
    const res = await api.delete('api/comments/' + id)
    logger.log('[deleteComment]', res.data)
    AppState.comments = AppState.comments.filter(c => c.id != id)
  }
}

export const commentsService = new CommentsService()