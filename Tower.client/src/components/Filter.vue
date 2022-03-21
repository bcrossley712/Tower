<template>
  <div class="row bg-grey text-light shadow rounded p-3 text-center">
    <div class="col selectable" @click="handleSubmit()">All</div>
    <div class="col selectable" @click="handleSubmit('expo')">Expos</div>
    <div class="col selectable" @click="handleSubmit('convention')">
      Conventions
    </div>
    <div class="col selectable" @click="handleSubmit('exhibit')">Exhibits</div>
    <div class="col selectable" @click="handleSubmit('sport')">Sports</div>
    <div class="col selectable" @click="handleSubmit('digital')">Digital</div>
    <div class="col selectable" @click="handleSubmit('concert')">Concerts</div>
  </div>
</template>


<script>
import { ref } from "@vue/reactivity"
import Pop from "../utils/Pop"
import { logger } from "../utils/Logger"
import { eventsService } from "../services/EventsService"
export default {
  setup() {
    return {
      async handleSubmit(type) {
        try {
          await eventsService.getAllEvents(type)
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
</style>