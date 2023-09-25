import { AppState } from "../AppState.js"
import { Comment } from "../models/Comment.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class CommentsService{
async createComment(commentData){
  const res = await api.post('api/comments', commentData)
  logger.log('adding comment', res.data)
  AppState.activeEventComments.push(new Comment(res.data))
}

async deleteComment(commentId){
  logger.log('deleting comment', commentId)
  const res = await api.delete(`api/comments/${commentId}`)
  // FIXME filter out deleted comment from appstate for reactivity
  logger.log(res.data)
  let indexToRemove = AppState.activeEventComments.find(comment => comment.id == commentId)
AppState.activeEventComments.splice(indexToRemove, 1)
}



}

export const commentsService = new CommentsService()