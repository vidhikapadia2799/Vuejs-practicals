<template>
  <div>
    <CarForm
      :showModel="showModel"
      :handleModel="handleModel"
      :addCar="addCar"
      :formHeading="formHeading"
      :handleFormHeading="handleFormHeading"
    />
    <div class="container">
      <div class="row">
        <div class="col-md-4" v-for="car in loadedCars" :key="car.id">
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
            :handleForm="handleForm"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModel: false,
      formHeading: '',
    }
  },
  computed: {
    loadedCars() {
      return this.$store.getters.loadedCars
    },
  },

  methods: {
    editCar(id) {
      const car = this.loadedCars.find((car) => car.id === id)
      this.$store.commit('initialValues', car)
      this.showModel = true
    },
    deleteCar(id) {
      this.$store.dispatch('deleteCar', id).then(() => {
        this.$router.push('/')
      })
    },
    addCar(car) {
      //handle edit submit
      if (car.id) {
        let payload = { id: car.id, data: car }
        this.$store.dispatch('editCar', payload)
        this.handleModel(false)
      } else {
        this.$store.dispatch('addCar', car)
        this.handleModel(false)
      }
    },
    handleFormHeading(heading) {
      this.formHeading = heading
    },
    handleModel(status) {
      this.showModel = status
      const data = {
        id: null,
        name: '',
        details: '',
        image: '',
        price: '',
      }
      this.$store.commit('initialValues', data)
    },
    handleForm(status) {
      this.showModel = status
    },
  },
}
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
