<template>
  <div>
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

export default {
  async asyncData(context) {
    return await axios
      .get(
        `https://testapi.io/api/dartya/resource/cardata/${context.route.params.id}`
      )
      .then((res) => {
        return {
          loadedCar: res.data,
        }
      })
      .catch((e) => context.error(e))
  },

  middleware: ['check-auth', 'auth'],
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
