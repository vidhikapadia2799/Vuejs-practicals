<template>
  <div>
    <div class="v_form">
      <div class="m_form">
        <h3 class="text-center text-success">Signin</h3>
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(onSubmit)">
            <ErrorMessage :errorMessage="errorMessage" :isError="isError" />
            <ValidationProvider
              name="email"
              rules="required|email"
              v-slot="{ errors }"
            >
              <div class="form-group mb-2">
                <label>Email</label>
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

            <button class="btn btn-primary btn-sm" type="submit">Submit</button>
          </form>
        </ValidationObserver>
        <nuxt-link to="/register">
          <p class="register">Don't have an account? Register now!</p>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, useStore, useRouter } from '@nuxtjs/composition-api'
import Cookie from 'js-cookie'
import ErrorMessage from '~/components/ErrorMessage.vue'

export default {
  components: { ErrorMessage },
  setup() {
    const store = useStore()
    const router = useRouter()

    let email = ref('')
    let password = ref('')
    let isLogin = ref(true)
    let isError = ref(false)
    let errorMessage = ref('')

    function onSubmit() {
      store
        .dispatch('authenticateUser', {
          isLogin: this.isLogin,
          email: this.email,
          password: this.password,
        })
        .then((result) => {
          store.commit('setToken', result.idToken)
          localStorage.setItem('token', result.idToken)
          localStorage.setItem(
            'tokenExpiration',
            new Date().getTime() + Number.parseInt(result.expiresIn) * 1000
          )
          Cookie.set('jwt', result.idToken)
          Cookie.set(
            'expirationDate',
            new Date().getTime() + Number.parseInt(result.expiresIn) * 1000
          )
          router.push('/')
        })
        .catch((error) => {
          isError.value = true
          errorMessage.value = error.response.data.error.errors[0].message
          email.value = ''
          password.value = ''
        })
    }

    return {
      email,
      password,
      isLogin,
      isError,
      errorMessage,
      onSubmit,
    }
  },
}
</script>

<style scoped>
.v_form {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.m_form {
  width: 100%;
  max-width: 460px;
  padding: 60px;
  background-color: #f5f5f5;
}
.register {
  margin-top: 10px;
}
</style>
