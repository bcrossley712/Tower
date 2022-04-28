<template>
  <router-link
    v-if="new Date(towerEvent.startDate) > new Date()"
    :to="{ name: 'EventDetails', params: { id: towerEvent.id } }"
  >
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
          align-items-end
        "
      >
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
          "
        >
          <span class="fs-4 text-shadow">{{ towerEvent.name }}</span>
          <span class="text-shadow">{{ towerEvent.location }}</span>
          <span class="text-shadow">{{
            new Date(towerEvent.startDate).toDateString()
          }}</span>
          <span
            v-if="towerEvent.capacity <= 0"
            class="rounded bg-danger darken-20 w-100 text-center text-light"
            >At capacity</span
          >
          <span
            v-else-if="towerEvent.isCanceled"
            class="rounded bg-danger darken-20 w-100 text-center text-light"
            >Cancelled</span
          >
          <span v-else class="text-end text-shadow"
            >{{ towerEvent.capacity }} spots left</span
          >
        </div>
      </div>
    </div>
  </router-link>
</template>


<script>
import { computed, ref } from "@vue/reactivity"
import Pop from "../utils/Pop"
import { logger } from "../utils/Logger"
export default {
  props: {
    towerEvent: {
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
      backgroundImage: computed(() => `url('${props.towerEvent.coverImg}')`)
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
}
.text-shadow {
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.514),
    -1px -1px 3px rgba(0, 0, 0, 0.514);
}
</style>