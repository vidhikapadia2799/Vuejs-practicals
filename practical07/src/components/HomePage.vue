<template>
  <h1 v-if="isLoading" class="text-center mt-5">Loading...</h1>
  <div v-else>
    <CarForm
      :showModel="showModel"
      :handleModel="handleModel"
      :initialValues="initialValues"
      :addCar="addCar"
      :formHeading="formHeading"
      :handleFormHeading="handleFormHeading"
    />
    <div class="container">
      <div class="row">
        <transition-group name="list">
          <div class="col-md-4" v-for="car in getCarData" :key="car.id">
            <GalleryCard
              :carImage="car.image"
              :carName="car.name"
              :carDetails="car.details"
              :carPrice="car.price"
              :carId="car.id"
              :editCar="editCar"
              :deleteCar="deleteCar"
              :formHeading="formHeading"
              :handleFormHeading="handleFormHeading"
            />
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import GalleryCard from "./GalleryCard.vue";
import CarForm from "./CarForm.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      showModel: false,
      formHeading: "",
      initialValues: {
        id: 0,
        name: "",
        details: "",
        image: "",
        price: null,
      },
    };
  },

  mounted() {
    this.$store.dispatch("fetchCars");
  },
  computed: {
    ...mapGetters({
      getCarData: "getCars",
      isLoading: "isLoading",
    }),
  },
  methods: {
    editCar(id) {
      const car = this.getCarData.find((car) => car.id === id);
      this.initialValues = car;
      this.showModel = true;
    },
    deleteCar(id) {
      this.deleteData(id);
    },

    ...mapActions({
      sendData: "sendData",
      editData: "editCar",
      deleteData: "deleteCar",
    }),

    addCar(car) {
      //handle edit submit
      if (car.id) {
        let payload = { id: car.id, data: car };
        this.editData(payload);
        this.resetInitialValues();
      } else {
        console.log("add car", car);
        this.sendData(car);
      }
    },

    handleFormHeading(heading) {
      this.formHeading = heading;
    },
    handleModel(status) {
      this.showModel = status;
      this.resetInitialValues();
    },
    resetInitialValues() {
      this.initialValues = {
        id: 0,
        name: "",
        details: "",
        image: "",
        price: null,
      };
    },
  },
  components: {
    GalleryCard,
    CarForm,
  },
};
</script>

<style>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}
</style>
