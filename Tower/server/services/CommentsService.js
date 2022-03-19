import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"

class CommentsService {
  async getEventComments(eventId) {
    const eventComments = await dbContext.Comments.find({ eventId: eventId }).populate('creator', 'name picture').populate('event')

    return eventComments
  }
  async create(body) {
    const comment = await dbContext.Comments.create(body)
    await comment.populate('creator', 'name picture')
    await comment.populate('event')

    return comment
  }
  async remove(commentId, userId) {
    const commentToRemove = await dbContext.Comments.findById(commentId)
    if (commentToRemove.creatorId.toString() !== userId) {
      throw new Forbidden('You are not allowed to delete this')
    }
    await dbContext.Comments.findByIdAndDelete(commentId)
  }
}

export const commentsService = new CommentsService()
