<template>
  <div class="d-flex my-2 w-100">
    <img :src="comment?.creator.picture" alt="" class="img-md rounded-circle" />
    <div class="bg-light text-dark rounded shadow ms-3 w-100 p-2">
      <div class="d-flex justify-content-between">
        <span class="m-0 fw-bold">{{ comment?.creator.name }}</span>
        <i
          v-if="comment.creator.id == account.id"
          @click="deleteComment"
          class="mdi mdi-delete-forever text-danger selectable"
          title="Remove comment"
        ></i>
      </div>
      <p>{{ comment?.body }}</p>
    </div>
  </div>
</template>


<script>
import { computed, ref } from "@vue/reactivity"
import Pop from "../utils/Pop"
import { logger } from "../utils/Logger"
import { commentsService } from "../services/CommentsService"
import { AppState } from "../AppState"
export default {
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      account: computed(() => AppState.account),
      async deleteComment() {
        try {
          if (await Pop.confirm()) {
            await commentsService.deleteComment(props.comment.id)
            Pop.toast('Comment deleted!', 'success')
          }
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.img-md {
  height: 80px;
  width: 80px;
}
</style>