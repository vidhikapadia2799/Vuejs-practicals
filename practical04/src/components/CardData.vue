<template>
  <div>
    <div class="card demo">
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
            <i
              class="fa-solid fa-pen-to-square edit"
              @click="editCar(carId)"
            ></i>
          </span>
          <span>
            <i class="fa-solid fa-trash delete" @click="deleteCar(carId)"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
  <UpdateModalComponent />
</template>

<script>
import UpdateModalComponent from "./UpdateModalComponent.vue";
import axios from "axios";

export default {
  props: {
    editCar: Function,
    carName: String,
    carImage: String,
    carDetails: String,
    carPrice: String,
    carId: Number,
    carData: Array,
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
      alert("Price is " + priceparams);
    },
    async deleteCar(idparams) {
      await axios
        .delete(`https://testapi.io/api/dartya/resource/cardata/${idparams}`)
        .then(async (response) => {
          if (response.status === 204) {
            this.$parent.getCarData();
          } else {
            console.log("error in response");
          }
        })
        .catch((error) => alert("Delete api error", error));
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
