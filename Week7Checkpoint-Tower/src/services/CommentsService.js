import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { eventsService } from "./EventsService.js"

class CommentsService {
  async getCommentsInEvent(eventId) {
    await eventsService.getEventById(eventId)
    const comments = await dbContext.Comments.find({ eventId: eventId }).populate('creator event')
    return comments
  }
  async createComment(commentBody) {
    const comment = await dbContext.Comments.create(commentBody)
    await comment.populate('creator')
    return comment
  }

  async deleteComment(commentId, userId) {
    // FIXME reference PostIt removeCollaborator in collabService... check against comment creatorId  }
    const comment = await dbContext.Comments.findById(commentId).populate('event creator')
    if (!comment) throw new BadRequest(`There's no comment to delete with the Id: ${commentId}`)
    if (userId != comment.creatorId) throw new Forbidden("Nice try. That's not yours")
    await comment.remove()
    return `deleted comment from ${comment.event.title} by ${comment.creator.name}`
  }
}

export const commentsService = new CommentsService();