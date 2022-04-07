<template>
  <div>
    <nav class="navbar navbar-light bg-success">
      <div class="container-fluid center">
        <span class="navbar-brand mb-0 h1">Car Showroom</span>
        <button
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          class="btn btn-primary"
        >
          Add Car
        </button>
      </div>

      <ModalComponent />
    </nav>
  </div>
</template>

<script>
import ModalComponent from "./ModalComponent.vue";
export default {
  components: {
    ModalComponent,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
