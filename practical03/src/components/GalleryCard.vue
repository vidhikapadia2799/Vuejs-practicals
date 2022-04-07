<template>
  <div class="card demo" v-for="car in cars" :key="car.id">
    <CardData :carData="car" @price="carMethod($event)" />
  </div>
</template>

<script>
import CardData from "./CardData.vue";
export default {
  props: {
    cars: Array,
  },
  methods: {
    carMethod(price) {
      alert("Price is " + price);
    },
  },
  components: {
    CardData,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.demo {
  margin-top: 20px;
  width: 18rem;
  height: 25rem;
}
</style>
