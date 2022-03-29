<template>
  <div>
    <img
      :src="carData.image"
      class="card-img-top a_card_img"
      alt="Audi E-tron"
    />
    <div class="card-body main-card">
      <h5 class="card-title">{{ carData.heading }}</h5>
      <p class="card-text cardHeight">
        {{ carData.details }}
      </p>
    </div>
    <div class="text-center">
      <button
        class="btn btn-primary"
        v-if="
          carData.price === ''
            ? (this.buttontext = 'Available Soon')
            : (this.buttontext = 'Info')
        "
        :disabled="carData.price === ''"
        @click="carPrice(carData.price)"
      >
        {{ this.buttontext }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    carData: Object,
  },
  data() {
    return {
      buttontext: "Info",
    };
  },
  methods: {
    carPrice(priceparams) {
      console.log(priceparams);
      this.$emit("price", priceparams);
    },
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
.a_card_img {
  width: 100%;
  height: 160px;
}
.cardHeight {
  height: 8.3rem;
}
</style>
