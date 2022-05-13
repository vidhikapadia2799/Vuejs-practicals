<template>
  <div>
    <nav class="navbar navbar-light bg-success">
      <div class="container-fluid d-flex">
        <router-link to="/" class="me-auto"
          ><button class="btn text-white btnhome">Home</button></router-link
        >
        <button class="btn text-white" v-if="isUserAuthenticated">
          {{ setUserName }}
        </button>

        <button
          class="btn text-white"
          @click="logout"
          v-if="isUserAuthenticated"
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
      isUserAuthenticated: "isUserAuthenticated",
      setUserName: "setUserName",
    }),
  },
  methods: {
    logout() {
      this.$store.commit("ISUSERAUTHENTICATED", false);

      let a = cookies.remove("authUser");
      console.log(a);
      // cookies.remove("authUser", "/", "localhost");

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
