<template>
  <div>
    <div class="card demo">
      <img :src="carImage" class="card-img-top a_card_img" alt="carimage" />
      <div class="card-body main-card">
        <h5 class="card-title">{{ carName }}</h5>
        <p class="card-text cardHeight">
          {{ carDetails }}
        </p>
      </div>
      <div class="buttondesign">
        <router-link :to="{ name: 'CarDetailsPage', params: { id: carId } }"
          ><button
            class="btn btn-primary btn-sm"
            v-if="
              carPrice === null
                ? (this.buttontext = 'Available Soon')
                : (this.buttontext = 'Info')
            "
            :disabled="carPrice === null"
          >
            {{ this.buttontext }}
          </button></router-link
        >

        <div>
          <span>
            <i
              class="fa-solid fa-pen-to-square edit"
              @click="editCar(carId), handleFormHeading('Edit Car')"
            ></i>
          </span>
          <span>
            <i class="fa-solid fa-trash delete" @click="deleteCar(carId)"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    editCar: Function,
    deleteCar: Function,
    carName: String,
    carImage: String,
    carDetails: String,
    carPrice: String,
    carId: Number,
    carData: Array,
    handleFormHeading: Function,
  },
  data() {
    return {
      buttontext: "Info",
    };
  },
  components: {},

  methods: {
    carPrices() {
      this.$router.push("/cardetails");
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
.demo:hover {
  transform: scale(1.1);
  transition: 0.3s all ease-in-out;
}
.a_card_img {
  width: 100%;
  height: 160px;
}
.cardHeight {
  height: 8.3rem;
}
.buttondesign {
  display: flex;
  justify-content: space-between;
  padding-left: 5px;
}
span {
  padding: 5px;
}
.edit {
  color: green;
}
.delete {
  color: red;
}
i {
  cursor: pointer;
}
</style>
