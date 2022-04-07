<template>
  <div>
    <app-header />
    <div class="main-car-card">
      <GalleryCard :cars="carsData" />
    </div>
  </div>
</template>

<script>
import GalleryCard from "./components/GalleryCard.vue";
import carData from "./data/carData.json";

export default {
  name: "App",
  data() {
    return {
      carsData: carData,
    };
  },
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
