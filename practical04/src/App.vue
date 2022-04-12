<template>
  <div>
    <app-header />
    <GalleryCard />
  </div>
</template>

<script>
import GalleryCard from "./components/GalleryCard.vue";

export default {
  name: "App",

  components: {
    GalleryCard,
  },
};
</script>

<style scoped>
h1 {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
