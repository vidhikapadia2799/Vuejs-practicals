<template>
  <div>
    <NavBar />
    <div class="v_form">
      <div class="m_form">
        <h3>Login</h3>
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(onSubmit)">
            <ValidationProvider
              name="email"
              rules="required|email"
              v-slot="{ errors }"
            >
              <div class="form-group mb-2">
                <label>Name</label>
                <input type="email" class="form-control" v-model="email" />
                <span class="text-danger">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>

            <ValidationProvider
              name="password"
              rules="required|max:8"
              v-slot="{ errors }"
            >
              <div class="form-group mb-2">
                <label>Password</label>
                <input
                  type="password"
                  class="form-control"
                  v-model="password"
                />
                <span class="text-danger">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>

            <button class="btn btn-primary" type="submit">Submit</button>
          </form>
        </ValidationObserver>
        <nuxt-link to="/register"
          ><p class="register">
            Don't have an account? Register now!
          </p></nuxt-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      isLogin: true,
    }
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch('authenticateUser', {
          isLogin: this.isLogin,
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$router.push('/')
        })
    },
  },
}
</script>

<style scoped>
.v_form {
  display: flex;
  justify-content: center;
}
.m_form {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
  margin: 20px;
  background-color: #f5f5f5;
}
.register {
  margin-top: 10px;
}
</style>
