<template>
  <div class="container-fluid">
    <div class="row p-3 text-light">
      <h3 class="fw-bold">My Events</h3>
      <div
        class="col-12 col-md-4 col-xl-3"
        v-for="t in towerEvents"
        :key="t.id"
      >
        <TowerEvent :towerEvent="t" />
      </div>
    </div>
    <div class="row p-3 text-light">
      <h3>Upcoming Events</h3>
      <div class="col-12" v-for="t in myTickets" :key="t.ticketId">
        <Tickets :ticket="t" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, watchEffect } from 'vue'
import { AppState } from '../AppState'
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { ticketsService } from "../services/TicketsService"
import { eventsService } from "../services/EventsService"
export default {
  name: 'Account',
  setup() {
    onMounted(async () => {
      try {
        await ticketsService.getAccountTickets()
        await eventsService.getAccountEvents(AppState.account.id)
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      account: computed(() => AppState.account),
      myTickets: computed(() => AppState.myTickets),
      tickets: computed(() => AppState.tickets),
      towerEvents: computed(() => AppState.towerEvents)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
