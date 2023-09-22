import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"
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



  }
}

export const commentsService = new CommentsService();