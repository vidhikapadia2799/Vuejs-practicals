<template>
  <div>
    <h1>Car ShowRoom</h1>
    <div class="main-car-card">
      <GalleryCard />
    </div>
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

.main-car-card {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
