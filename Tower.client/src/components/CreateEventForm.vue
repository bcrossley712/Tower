<template>
  <form @submit.prevent="handleSubmit" class="mb-3">
    <div class="d-flex justify-content-between">
      <div>
        <label for="name">Name:</label>
        <input
          v-model="editable.name"
          type="text"
          class="form-control my-2"
          name="name"
          id="name"
          placeholder="Name..."
          required
          minlength="3"
          maxlength="20"
        />
      </div>
      <div>
        <label for="name">Cover image:</label>
        <input
          v-model="editable.coverImg"
          type="text"
          class="form-control my-2"
          name="coverImg"
          id="coverImg"
          placeholder="CoverImg..."
          required
        />
      </div>
    </div>
    <div class="d-flex justify-content-between">
      <div>
        <label for="name">Location:</label>
        <input
          v-model="editable.location"
          type="text"
          class="form-control my-2"
          name="location"
          id="location"
          placeholder="Location..."
          required
        />
      </div>
      <div>
        <label for="name">Capacity:</label>
        <input
          v-model="editable.capacity"
          type="number"
          class="form-control my-2"
          name="capacity"
          id="capacity"
          placeholder="Capacity..."
          required
        />
      </div>
    </div>
    <div>
      <label for="name">Date and time:</label>
      <input
        v-model="editable.startDate"
        type="datetime-local"
        class="form-control my-2"
        name="date"
        id="date"
        placeholder="01/01/01, 5:00PM"
        required
      />
    </div>
    <div>
      <label for="description">Description:</label>
      <input
        v-model="editable.description"
        type="text"
        class="form-control my-2"
        name="description"
        id="description"
        placeholder="Description..."
        required
      />
    </div>

    <div class="text-end">
      <button class="btn btn-info selectable" title="Submit">
        <i class="mdi mdi-plus"></i>
      </button>
    </div>
  </form>
</template>


<script>
import { ref } from "@vue/reactivity"
import Pop from "../utils/Pop"
import { logger } from "../utils/Logger"
import { Modal } from "bootstrap"
import { useRouter } from "vue-router"
import { eventsService } from "../services/EventsService"
import { watchEffect } from "@vue/runtime-core"
import { AppState } from "../AppState"
export default {
  setup() {
    const router = useRouter()
    const editable = ref({})
    return {
      editable,
      async handleSubmit() {
        try {
          let newEvent = await eventsService.createEvent(editable.value)
          Modal.getOrCreateInstance(document.getElementById('create-event')).hide()
          editable.value = {}
          router.push({ name: 'EventDetails', params: { id: newEvent.id } })
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