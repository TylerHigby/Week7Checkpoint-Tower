<template>
  <div class="container-fluid card mb-4">
    <form @submit.prevent="createComment">
      <div class="m-3">
        <label for="comment-body">Add a comment</label>
        <input v-model="commentData.body" class="form-control mt-3"  type="text">
      </div>
      <button class="btn btn-primary mt-1 mb-3 ms-3">Submit</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRoute } from "vue-router";
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { AppState } from "../AppState.js";
import {commentsService} from '../services/CommentsService.js'

  export default {
    setup() {
      const commentData = ref({})
      const route = useRoute()
      return {
        commentData,
        async createComment(){
          try {
            logger.log('creating comment', commentData.value, AppState.activeEvent.id, route.params.eventId)
            commentData.value.eventId = route.params.eventId
            await commentsService.createComment(commentData.value)
            Pop.toast('Added comment', 'success')
          } catch (error) {
            Pop.error(error)
          }
        }
      };
    },
  };
</script>


<style>
</style>