<template>
  <!-- car details component -->
  <h1 v-if="isLoading" class="text-center mt-5">Loading...</h1>
  <div v-else>
    <div class="container">
      <div class="card mt-5 mb-5">
        <div class="row m_row">
          <div class="col-md-6 m_img">
            <img :src="getCarById.image" alt="carimage" class="m_image" />
          </div>
          <div class="col-md-6 m_details">
            <h4 class="mt-2">{{ getCarById.name }}</h4>
            <p>{{ getCarById.details }}</p>
            <h6>Price:${{ getCarById.price }}</h6>
          </div>
        </div>
      </div>
      <button class="btn btn-warning ml-5" @click="this.$router.go(-1)">
        Go back
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      id: this.$route.params.id,
    };
  },
  mounted() {
    this.carDetails(this.id);
  },
  computed: {
    ...mapGetters({
      getCarById: "getCarById",
      isLoading: "isLoading",
    }),
  },
  methods: {
    ...mapActions({
      carDetails: "getCarById",
    }),
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
