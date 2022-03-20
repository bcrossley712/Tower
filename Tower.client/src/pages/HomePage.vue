<template>
  <div class="container-fluid">
    <div class="row p-3">
      <div
        class="col-12 bg-img text-light rounded shadow border border-primary"
      >
        <div class="row h-100 ps-3">
          <div
            class="
              col-md-4
              h-100
              d-flex
              flex-column
              justify-content-center
              align-items-stretch
            "
          >
            <h3 class="m-2">Get ahead of the scalpers.</h3>
            <h3 class="m-2">Reserve your seats now with</h3>
            <h3 class="m-2">real events with real people.</h3>
          </div>
        </div>
      </div>
    </div>
    <div class="row p-3">
      <div class="col-12"><Filter /></div>
    </div>
    <div class="row p-3">
      <div class="col-12 col-md-4 col-lg-3" v-for="t in towerEvent" :key="t.id">
        <TowerEvent :towerEvent="t" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import { onMounted, watchEffect } from "@vue/runtime-core"
import { eventsService } from "../services/EventsService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
export default {
  name: 'Home',
  setup() {
    watchEffect(async () => {
      try {
        AppState.activeEvent = {}
        await eventsService.getEvents()
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      towerEvent: computed(() => AppState.towerEvents)
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card {
    width: 50vw;
    > img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
.bg-img {
  background-image: url("https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y29ycG9yYXRlJTIwZXZlbnQlMjAlMjBzZWF0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60");
  height: 30vh;
  // background-position: center;
  background-size: cover;
  backdrop-filter: blur(1px);
}
</style>
