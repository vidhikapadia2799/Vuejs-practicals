<template>
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
      <div class="col-md-4" v-for="car in cars" :key="car.id">
        <GalleryCard
          :carImage="car.image"
          :carName="car.name"
          :carDetails="car.details"
          :carPrice="car.price"
          :carId="car.id"
          :editCar="editCar"
          :deleteCar="deleteCar"
          :carData="cars"
          :formHeading="formHeading"
          :handleFormHeading="handleFormHeading"
        />
      </div>
    </div>
  </div>
</template>

<script>
import GalleryCard from "./GalleryCard.vue";
import CarForm from "./CarForm.vue";
import axios from "axios";

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
    deleteCar(id) {
      this.deleteData(id);
    },
    async getCarData() {
      await axios
        .get(`https://testapi.io/api/dartya/resource/cardata`)
        .then((response) => {
          this.cars = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    sendData(data) {
      axios
        .post("https://testapi.io/api/dartya/resource/cardata", data)
        .then((response) => {
          // console.log(response);
          if (response.status === 201) {
            this.getCarData();
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Something went wrong please try again");
        });
    },
    addCar(car) {
      //handle edit submit
      if (car.id) {
        this.editData(car.id, car);
        this.resetInitialValues();
      } else {
        this.sendData(car);
      }
    },
    editData(id, data) {
      axios
        .put(`https://testapi.io/api/dartya/resource/cardata/${id}`, data)
        .then((response) => {
          if (response.status === 200) {
            this.getCarData();
          }
        })
        .catch((err) => {
          console.log(err);
          alert(`cannot update at this moment`);
        });
    },
    deleteData(id) {
      axios
        .delete(`https://testapi.io/api/dartya/resource/cardata/${id}`)
        .then((response) => {
          if (response.status === 204) {
            this.getCarData();
          }
        })
        .catch((err) => {
          console.log(err);
          alert("can't delete at this moment");
        });
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

<style scoped></style>
