<template>
  <div>
    <NavBar @handleModel="handleModel" @handleFormHeading="handleFormHeading" />
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
import { computed, ref } from '@vue/composition-api'
import { useRouter, useStore } from '@nuxtjs/composition-api'

export default {
  setup() {
    const store = useStore()
    const router = useRouter()

    let showModel = ref(false)
    let formHeading = ref('')

    const loadedCars = computed(() => {
      return store.getters.loadedCars
    })

    const editCar = (id) => {
      const car = loadedCars.value.find((car) => car.id === id)
      store.commit('initialValues', car)
      showModel.value = true
    }

    const deleteCar = (id) => {
      store.dispatch('deleteCar', id).then(() => {
        router.push('/')
      })
    }

    const addCar = (car) => {
      if (car.id) {
        let payload = { id: car.id, data: car }
        store.dispatch('editCar', payload)
        handleModel(false)
      } else {
        store.dispatch('addCar', car)
        handleModel(false)
      }
    }

    const handleFormHeading = (heading) => {
      formHeading.value = heading
    }

    const handleModel = (status) => {
      showModel.value = status
      const data = {
        id: null,
        name: '',
        details: '',
        image: '',
        price: '',
      }
      store.commit('initialValues', data)
    }

    const handleForm = (status) => {
      showModel.value = status
    }

    return {
      showModel,
      formHeading,
      loadedCars,
      editCar,
      deleteCar,
      addCar,
      handleFormHeading,
      handleModel,
      handleForm,
    }
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
