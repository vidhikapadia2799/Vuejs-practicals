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
    const promise = this.$store.dispatch("fetchCars");
    promise.catch((error) => {
      this.$toast.error(error.message, {
        position: "top-right",
        duration: 5000,
      });
    });
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
      // this.deleteData(id);
      const promise = this.$store.dispatch("deleteCar", id);
      promise
        .then((res) => {
          if (res.status === 204) {
            this.$toast.success(`Car Deleted Successfully`, {
              position: "top-right",
              duration: 2000,
            });
          }
        })
        .catch((error) => {
          this.$toast.error(error.message, {
            position: "top-right",
            duration: 2000,
          });
        });
    },

    ...mapActions({
      // sendData: "sendData",
      // editData: "editCar",
      // deleteData: "deleteCar",
      SET_USERNAME: "SET_USERNAME",
    }),

    addCar(car) {
      //handle edit submit
      if (car.id) {
        let payload = { id: car.id, data: car };
        // this.editData(payload);
        const promise = this.$store.dispatch("editCar", payload);
        promise
          .then((res) => {
            if (res.status === 200) {
              this.$toast.success(`Car Edited Successfully`, {
                position: "top-right",
                duration: 2000,
              });
            }
          })
          .catch((error) => {
            this.$toast.error(error.message, {
              position: "top-right",
              duration: 2000,
            });
          });

        this.resetInitialValues();
      } else {
        const promise = this.$store.dispatch("sendData", car);
        promise
          .then((res) => {
            if (res.status === 201) {
              this.$toast.success(`Car Added Successfully`, {
                position: "top-right",
                duration: 2000,
              });
            }
          })
          .catch((error) => {
            this.$toast.error(error.message, {
              position: "top-right",
              duration: 2000,
            });
          });
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
