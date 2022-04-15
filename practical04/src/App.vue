<template>
  <div>
    <app-header />
    <HomePage />
  </div>
</template>

<script>
import HomePage from "./components/HomePage.vue";

export default {
  name: "App",

  components: {
    HomePage,
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
