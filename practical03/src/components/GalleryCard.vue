<template>
  <UpdateModalComponent
    :showModel="showModel"
    :handleModel="handleModel"
    :initialValues="initialValues"
  />
  <div class="card demo" v-for="car in cars" :key="car.id">
    <CardData
      :carImage="car.image"
      :carName="car.heading"
      :carDetails="car.details"
      :carPrice="car.price"
      :carId="car.id"
      @price="carMethod($event)"
      :editCar="editCar"
    />
  </div>
</template>

<script>
import CardData from "./CardData.vue";
import UpdateModalComponent from "./UpdateModalComponent.vue";
import carData from "../data/carData.json";
export default {
  data() {
    return {
      showModel: false,
      initialValues: {
        id: 0,
        heading: "",
        details: "",
        image: "",
        price: null,
      },
    };
  },
  props: {
    cars: Array,
  },
  methods: {
    carMethod(price) {
      alert("Price is " + price);
    },
    editCar(id) {
      const car = carData.find((car) => car.id === id);
      this.initialValues = car;
      this.showModel = true;
    },
    handleModel(status) {
      this.showModel = status;
      this.resetInitialValues();
    },
    resetInitialValues() {
      this.initialValues = {
        id: 0,
        heading: "",
        details: "",
        image: "",
        price: null,
      };
    },
  },
  components: {
    CardData,
    UpdateModalComponent,
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
