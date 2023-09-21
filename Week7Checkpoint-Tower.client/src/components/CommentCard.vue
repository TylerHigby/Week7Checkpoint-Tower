<template>
<div class="container  row p-3">

    <img class="ProfileImage" :src="comment.creatorImg" alt="">

  <div class="card elevation-5 col-10">
    <div>
      <b>Name:</b> {{ comment.creatorName }}
    </div>
    <div>
      <b>Comment:</b> {{ comment.body }}
    </div>
    <button v-if="comment.creatorId == account.id" @click.stop="deleteComment(comment.id)" class="btn btn-danger col-2">
      delete
    </button>
  </div>
</div>
</template>

<script>

import { computed } from "vue";
import { Comment } from '../models/Comment.js';
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";
import { commentsService} from "../services/CommentsService.js";
export default {
props: {comment: {type: Comment, required: true}},
setup() {
  return {
account: computed(() => AppState.account),
async deleteComment(id){
try {
  if(await Pop.confirm('Are you sure you want to delete your comment?')){
    await commentsService.deleteComment(id)
    Pop.success('Comment removed')
  }
} catch (error) {
  Pop.error(error)
}
},
  };
},
};
</script>


<style>
.ProfileImage{
  height: 100px;
  width: 100px;
}
</style>