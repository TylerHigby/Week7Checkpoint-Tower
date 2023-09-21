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

async deleteComment(id){
  logger.log('deleting comment', id)
  const res = await api.delete('api/comments/' + id)
  logger.log(res.data)
}



}

export const commentsService = new CommentsService()