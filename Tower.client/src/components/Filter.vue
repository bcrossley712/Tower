<template>
  <div class="row bg-grey text-light shadow rounded p-3 text-center">
    <div class="col selectable" @click="handleSubmit">All</div>
    <div class="col selectable" @click="handleSubmit">Expos</div>
    <div class="col selectable" @click="handleSubmit">Conventions</div>
    <div class="col selectable" @click="handleSubmit">Exhibits</div>
    <div class="col selectable" @click="handleSubmit">Sports</div>
    <div class="col selectable" @click="handleSubmit">Digital</div>
    <div class="col selectable" @click="handleSubmit">Concerts</div>
  </div>
</template>


<script>
import { ref } from "@vue/reactivity"
import Pop from "../utils/Pop"
import { logger } from "../utils/Logger"
export default {
  setup() {
    return {
      async handleSubmit() {
        try {
          logger.error('Method not yet set up')
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