<template>
  <div>
    <nav class="navbar navbar-light bg-success">
      <div class="container-fluid d-flex">
        <router-link to="/" class="me-auto"
          ><button class="btn text-white btnhome">Home</button></router-link
        >
        <button class="btn text-white" v-if="IS_USER_AUTHENTICATED">
          {{ SET_USERNAME }}
        </button>

        <button
          class="btn text-white"
          @click="logout"
          v-if="IS_USER_AUTHENTICATED"
        >
          Logout
        </button>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import cookies from "vue-cookies";
export default {
  computed: {
    ...mapGetters({
      IS_USER_AUTHENTICATED: "IS_USER_AUTHENTICATED",
      SET_USERNAME: "SET_USERNAME",
    }),
  },
  methods: {
    logout() {
      this.$store.commit("IS_USER_AUTHENTICATED", false);
      cookies.remove("authUser");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.btnhome:focus {
  outline: none;
  box-shadow: none;
}
</style>
