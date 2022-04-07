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
    <div class="buttondesign">
      <button
        class="btn btn-primary btn-sm"
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

      <div>
        <span>
          <i
            class="fa-solid fa-pen-to-square edit"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop1"
          ></i>
        </span>
        <span>
          <i
            class="fa-solid fa-trash delete"
            @click="deleteCar(carData.id)"
          ></i>
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
    carPrice(priceparams) {
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
</style>
