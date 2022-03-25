<template>
  <div class="card demo" style="width: 18rem">
    <img :src="image" class="card-img-top" alt="Audi E-tron" />
    <div class="card-body">
      <h5 class="card-title">{{ heading }}</h5>
      <p class="card-text">
        {{ details }}
      </p>
      <button @click="carInfo()" class="btn btn-primary">Info</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      heading: "Audi E-Tron",
      image:
        "https://www.motortrend.com/uploads/sites/5/2021/06/2022-audi-e-tron-sportback-exterior-05.jpg",
      details:
        "The e-tron GT sets new standards for high-performance, luxury motoring with its leading-edge all-electric drive.",
      price: "$249,700",
    };
  },
  methods: {
    carInfo() {
      alert("Price is " + this.price);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.demo {
  margin-top: 20px;
}
</style>
