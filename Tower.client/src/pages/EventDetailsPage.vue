<template>
  <div class="event-details-page container-fluid text-light">
    <div class="row p-3">
      <div
        class="
          col-12
          rounded
          border border-primary
          shadow
          p-5
          bg-grey
          event-details
        "
      >
        <div class="row">
          <div class="col-md-4">
            <img
              :src="activeEvent.coverImg"
              alt=""
              class="img-fluid rounded shadow"
            />
          </div>
          <div class="col-md-8 d-flex flex-column justify-content-between">
            <div>
              <div
                v-if="
                  !activeEvent.isCanceled && activeEvent.creatorId == account.id
                "
                class="text-end"
              >
                <i
                  data-bs-toggle="modal"
                  data-bs-target="#edit-event"
                  title="Edit event"
                  class="mdi mdi-pencil text-warning pe-2 selectable"
                ></i>
                <i
                  @click="cancelEvent"
                  title="Cancel event"
                  class="mdi mdi-cancel text-danger ps-2 selectable"
                ></i>
              </div>
              <div class="d-flex justify-content-between">
                <h3>{{ activeEvent.name }}</h3>
                <!-- FIXME invalid time value -->
                <h3>
                  <!-- {{ dateFormat.format(new Date(activeEvent.startDate)) }} -->
                  {{ activeEvent.startDate }}
                </h3>
              </div>
              <div class="d-flex justify-content-between">
                <h4>{{ activeEvent.location }}</h4>
                <!-- FIXME invalid time value -->
                <h4>
                  <!-- {{ timeFormat.format(new Date(activeEvent.startDate)) }} -->
                </h4>
              </div>
              <p class="lh-lg">{{ activeEvent.description }}</p>
            </div>
            <span
              v-if="activeEvent.isCanceled"
              class="rounded bg-danger darken-20 w-100 text-center text-light"
            >
              Cancelled</span
            >
            <span
              v-else-if="activeEvent.capacity <= 0"
              class="rounded bg-danger darken-20 w-100 text-center text-light"
              >At capacity</span
            >
            <div v-else class="d-flex justify-content-between">
              <h4>{{ activeEvent.capacity }} spots left</h4>
              <!-- FIXME currently not working -->
              <div v-if="hasTicket">
                <button @click="popToast" class="btn btn-success p-2 px-5">
                  RSVP'd <i class="mdi mdi-human"></i>
                </button>
              </div>
              <div v-else>
                <button @click="createTicket" class="btn btn-warning p-2 px-5">
                  Attend <i class="mdi mdi-human"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row p-3" v-if="tickets.length > 0">
      <div class="col-12">See who is attending</div>
      <div class="col-12 p-2 bg-grey d-flex">
        <img
          v-for="t in tickets"
          :key="t.ticketId"
          :src="t.picture"
          alt=""
          class="img-small rounded-circle m-1"
          :title="t.name"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-8 offset-2">
        <p class="mb-1">What are people saying</p>
        <div class="bg-grey rounded shadow p-3">
          <div v-if="user.isAuthenticated">
            <p class="text-end">Join the conversation</p>
            <textarea
              v-model="editable.body"
              class="form-control text-dark"
              placeholder="Tell the people..."
              id="comment"
              style="height: 100px"
            ></textarea>
            <div class="text-end">
              <button @click="addComment" class="btn btn-success my-2 p-2">
                Post comment
              </button>
            </div>
          </div>
          <div class="d-flex" v-for="c in comments" :key="c.id">
            <Comment :comment="c" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <Modal id="edit-event">
    <template #title>Edit Event</template>
    <template #body><EditEventForm /></template>
  </Modal>
</template>


<script>
import { computed, ref } from "@vue/reactivity"
import Pop from "../utils/Pop"
import { logger } from "../utils/Logger"
import { useRoute, useRouter } from "vue-router"
import { onMounted, watchEffect } from "@vue/runtime-core"
import { eventsService } from "../services/EventsService"
import { AppState } from "../AppState"
import { ticketsService } from "../services/TicketsService";
import { commentsService } from "../services/CommentsService"
export default {
  setup() {
    const editable = ref({})
    const route = useRoute()
    let dateFormat = new Intl.DateTimeFormat("en", {
      dateStyle: "short",
      timeStyle: "short"
    })
    // let timeFormat = new Intl.DateTimeFormat("en", {
    // })

    onMounted(async () => {
      try {
        AppState.activeEvent = {}
        await eventsService.getById(route.params.id)
        await ticketsService.getEventTickets(route.params.id)
        await commentsService.getEventComments(route.params.id)
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      editable,
      dateFormat,
      // timeFormat,
      route,
      account: computed(() => AppState.account),
      activeEvent: computed(() => AppState.activeEvent),
      comments: computed(() => AppState.comments),
      tickets: computed(() => AppState.tickets),
      myTickets: computed(() => AppState.myTickets),
      user: computed(() => AppState.user),
      hasTicket: computed(() => AppState.tickets.find((t) => t.accountId == AppState.account.id)),
      backgroundImage: computed(() => `url('${AppState.activeEvent.coverImg}')`),
      async addComment() {
        try {
          editable.value.eventId = route.params.id
          await commentsService.createComment(editable.value)
          editable.value = {}
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      async createTicket() {
        try {
          await ticketsService.createTicket(AppState.user.id, route.params.id)
          Pop.toast('RSVP submitted', 'success')
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      async cancelEvent() {
        try {
          if (await Pop.confirm('Cancel Event', 'Are you sure you want to cancel this event? This can not be undone.', 'warning', 'Yes, cancel event!')) {
            await eventsService.cancelEvent(AppState.activeEvent.id)
            Pop.toast('Event cancelled!', 'success')
          }
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      popToast() {
        Pop.toast(`You're already going!`, 'warning')
      }

    }
  }
}
</script>


<style lang="scss" scoped>
.img-small {
  height: 55px;
  width: 55px;
}

.event-details {
  background-blend-mode: darken;
  background-image: v-bind(backgroundImage);
  background-size: cover;
  background-position: center;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.514),
    -1px -1px 3px rgba(0, 0, 0, 0.514);
}
</style>