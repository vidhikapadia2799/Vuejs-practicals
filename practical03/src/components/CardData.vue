<template>
  <div>
    <img :src="carImage" class="card-img-top a_card_img" alt="Audi E-tron" />
    <div class="card-body main-card">
      <h5 class="card-title">{{ carName }}</h5>
      <p class="card-text cardHeight">
        {{ carDetails }}
      </p>
    </div>
    <div class="buttondesign">
      <button
        class="btn btn-primary btn-sm"
        v-if="
          carPrice === null
            ? (this.buttontext = 'Available Soon')
            : (this.buttontext = 'Info')
        "
        :disabled="carPrice === null"
        @click="carPrices(carPrice)"
      >
        {{ this.buttontext }}
      </button>

      <div>
        <span>
          <i class="fa-solid fa-pen-to-square edit" @click="editCar(carId)"></i>
        </span>
        <span>
          <i class="fa-solid fa-trash delete" @click="deleteCar(carId)"></i>
        </span>
      </div>
    </div>
    <UpdateModalComponent />
  </div>
</template>

<script>
import UpdateModalComponent from "./UpdateModalComponent.vue";
export default {
  props: {
    carData: Object,
    editCar: Function,
    carName: String,
    carImage: String,
    carDetails: String,
    carPrice: Number,
    carId: Number,
  },
  data() {
    return {
      buttontext: "Info",
    };
  },
  components: {
    UpdateModalComponent,
  },
  methods: {
    carPrices(priceparams) {
      console.log(priceparams);
      this.$emit("price", priceparams);
    },
    deleteCar(idparams) {
      alert("Delete car with id: " + idparams);
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
