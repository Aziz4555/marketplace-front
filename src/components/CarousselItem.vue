<template>
  <div id="carousel-item" class="absolute top-0 left-0 right-0 bottom-0" v-show="currentSlide===index">
    <img class="mx-auto" :src="image" :alt="title"  >
  </div>
</template>

<script>
export default {
  name: "CarousselItem",
  props:['image', 'title', "currentSlide","index"],

  mounted() {

  }
}
</script>

<style scoped>

</style>