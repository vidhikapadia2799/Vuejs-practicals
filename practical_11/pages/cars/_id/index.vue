<template>
  <div>
    <NavBar />
    <div class="container">
      <div class="card mt-5 mb-5">
        <div class="row m_row">
          <div class="col-md-6 m_img">
            <img :src="loadedCar.image" alt="carimage" class="m_image" />
          </div>
          <div class="col-md-6 m_details">
            <h4 class="mt-2">{{ loadedCar.name }}</h4>
            <p>{{ loadedCar.details }}</p>
            <h6>Price:${{ loadedCar.price }}</h6>
          </div>
        </div>
      </div>
      <button class="btn btn-warning ml-5" @click="$router.go(-1)">
        Go back
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {
  computed,
  reactive,
  ref,
  useAsync,
  useRoute,
  useRouter,
} from '@nuxtjs/composition-api'

export default {
  middleware: ['check-auth', 'auth'],
  setup() {
    const route = useRoute()
    const id = computed(() => route.value.params.id)

    const loadedCar = ref({})

    useAsync(() => {
      axios
        .get(`https://testapi.io/api/dartya/resource/cardata/${id.value}`)
        .then((res) => {
          loadedCar.value = res.data
        })
    })
    return {
      loadedCar,
    }
  },
}
</script>

<style scoped>
.m_row {
  display: flex;
  width: 100%;
}
.m_img {
  width: 50%;
}
.m_image {
  width: 100%;
  height: 50vh;
}
.m_details {
  width: 50%;
}
</style>
