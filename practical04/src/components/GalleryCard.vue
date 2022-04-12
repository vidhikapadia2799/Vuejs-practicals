<template>
  <UpdateModalComponent
    :showModel="showModel"
    :handleModel="handleModel"
    :initialValues="initialValues"
  />
  <div class="container">
    <div class="row">
      <div class="col-md-4" v-for="car in cars" :key="car.id">
        <CardData
          :carImage="car.image"
          :carName="car.name"
          :carDetails="car.details"
          :carPrice="car.price"
          :carId="car.id"
          :editCar="editCar"
          :carData="cars"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CardData from "./CardData.vue";
import UpdateModalComponent from "./UpdateModalComponent.vue";
import axios from "axios";

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
      cars: [],
    };
  },

  mounted() {
    this.getCarData();
  },
  methods: {
    editCar(id) {
      const car = this.cars.find((car) => car.id === id);
      this.initialValues = car;
      this.showModel = true;
    },
    async getCarData() {
      console.log("Car data called");
      try {
        const response = await axios.get(
          `https://testapi.io/api/dartya/resource/cardata`
        );
        this.cars = response.data.data;
      } catch (e) {
        this.errors.push(e);
      }
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

<style scoped></style>
