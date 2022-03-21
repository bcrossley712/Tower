<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <Modal id="create-event">
    <template #title>New Event</template>
    <template #body><CreateEventForm /></template>
  </Modal>
  <Modal id="edit-account">
    <template #title>Edit Account</template>
    <template #body><EditAccountForm /></template>
  </Modal>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
</style>
