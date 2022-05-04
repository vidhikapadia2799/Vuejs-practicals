<template>
  <!-- car details component -->
  <div class="container">
    <div class="card mt-5 mb-5">
      <div class="row m_row">
        <div class="col-md-6 m_img">
          <img :src="car.image" alt="carimage" class="m_image" />
        </div>
        <div class="col-md-6 m_details">
          <h4 class="mt-2">{{ car.name }}</h4>
          <p>{{ car.details }}</p>
          <h6>Price:${{ car.price }}</h6>
        </div>
      </div>
    </div>
    <button class="btn btn-warning ml-5" @click="this.$router.go(-1)">
      Go back
    </button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      id: this.$route.params.id,
      car: {},
    };
  },
  mounted() {
    this.carDetails();
  },
  methods: {
    async carDetails() {
      await axios
        .get(`https://testapi.io/api/dartya/resource/cardata/${this.id}`)
        .then((response) => {
          this.car = response.data;
        })
        .catch((error) => {
          alert(error);
        });
    },
  },
};
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
