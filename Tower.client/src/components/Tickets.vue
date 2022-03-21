<template>
  <div class="row m-2">
    <div
      class="
        col-12
        border border-4
        rounded
        border-grey
        text-light
        shadow
        bg-img
        p-0
        d-flex
        flex-column
        justify-content-between
      "
    >
      <div class="text-end">
        <button class="btn btn-danger px-3 m-2" @click="deleteTicket">
          Not Going
        </button>
      </div>
      <router-link :to="{ name: 'EventDetails', params: { id: ticket.id } }">
        <div
          class="
            div
            p-1
            bg-blur
            border
            rounded
            d-flex
            flex-column
            w-100
            fw-bold
            text-light
          "
        >
          <span class="fs-4">{{ ticket.name }}</span>
          <span>{{ ticket.location }}</span>
          <span>{{ new Date(ticket.startDate).toLocaleString() }}</span>
          <span
            v-if="ticket.capacity <= 0"
            class="rounded bg-danger darken-20 w-100 text-center text-light"
            >At capacity</span
          >
          <span
            v-else-if="ticket.isCanceled"
            class="rounded bg-danger darken-20 w-100 text-center text-light"
            >Cancelled</span
          >
          <span v-else class="text-end text-shadow"
            >{{ ticket.capacity }} spots left</span
          >
        </div>
      </router-link>
    </div>
  </div>
</template>


<script>
import { computed, ref } from "@vue/reactivity"
import Pop from "../utils/Pop"
import { logger } from "../utils/Logger"
import { ticketsService } from "../services/TicketsService"
export default {
  props: {
    ticket: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    let dateFormat = new Intl.DateTimeFormat("en", {
      dateStyle: "short",
    });
    return {
      dateFormat,
      backgroundImage: computed(() => `url('${props.ticket.coverImg}')`),
      async deleteTicket() {
        try {
          await ticketsService.deleteTicket(props.ticket.ticketId)
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
.bg-img {
  background-image: v-bind(backgroundImage);
  background-position: center;
  background-size: cover;
  min-height: 20vw;
  width: 100%;
}
.bg-blur {
  backdrop-filter: blur(20px);
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.514),
    -1px -1px 3px rgba(0, 0, 0, 0.514);
}
</style>