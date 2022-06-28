<template>
  <div>
    <NavBar />
    <div class="main_form">
      <div class="m_form">
        <h3>Create an account</h3>
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(onSubmit)">
            <ValidationProvider
              name="name"
              rules="required"
              v-slot="{ errors }"
            >
              <div class="form-group mb-2">
                <label>Name</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="userData.name"
                />
                <span class="text-danger">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>

            <ValidationProvider
              name="emailId"
              rules="required|email"
              v-slot="{ errors }"
            >
              <div class="form-group mb-2">
                <label>Email</label>
                <input
                  type="email"
                  class="form-control"
                  v-model="userData.email"
                />
                <span class="text-danger">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>

            <ValidationProvider
              name="password"
              rules="required|min:6|max:8"
              v-slot="{ errors }"
            >
              <div class="form-group mb-2">
                <label>Password</label>
                <input
                  type="password"
                  class="form-control"
                  v-model="userData.password"
                />
                <span class="text-danger">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>

            <ValidationProvider
              name="cpassword"
              rules="required|min:6|max:8|confirmed:password"
              v-slot="{ errors }"
            >
              <div class="form-group mb-2">
                <label>Confirm Password</label>
                <input
                  type="password"
                  class="form-control"
                  v-model="userData.cpassword"
                  data-vv-as="password"
                />
                <span class="text-danger">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>

            <ValidationProvider
              name="role"
              rules="required"
              v-slot="{ errors }"
            >
              <div class="mb-2">
                <label class="form-label">Role</label>
                <select
                  name="role"
                  class="form-select form-control"
                  v-model="userData.role"
                >
                  <option disabled>Select Car</option>
                  <option value="admin">Admin</option>
                  <option value="employee">Employee</option>
                  <option value="customer">Customer</option>
                </select>
                <span class="text-danger">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>

            <ValidationProvider
              name="gender"
              rules="required"
              v-slot="{ errors }"
            >
              <div class="form-group mb-2">
                <label>Gender</label><br />
                <input type="radio" v-model="userData.gender" value="men" />
                <label>Men</label>
                <input type="radio" v-model="userData.gender" value="women" />
                <label>Women</label>
                <span class="text-danger">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>

            <ValidationProvider
              name="age"
              rules="required|numeric"
              v-slot="{ errors }"
            >
              <div class="form-group mb-2">
                <label>Age</label>
                <input
                  type="number"
                  class="form-control"
                  v-model="userData.age"
                />
                <span class="text-danger">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>

            <ValidationProvider name="dob" rules="required" v-slot="{ errors }">
              <div class="form-group mb-2">
                <label>Birth Date</label>
                <input
                  type="date"
                  class="form-control"
                  v-model="userData.dob"
                />
                <span class="text-danger">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>

            <button class="btn btn-primary" type="submit">Register</button>
          </form>
        </ValidationObserver>
        <nuxt-link to="/login">
          <p class="register">Already have an account? Signin now!</p>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userData: {
        name: '',
        email: '',
        password: '',
        cpassword: '',
        role: '',
        gender: '',
        age: 0,
        dob: '',
      },
    }
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('register', this.userData).then(() => {
        this.$router.push('/login')
      })
    },
  },
}
</script>

<style scoped>
.main_form {
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
.login {
  margin-top: 10px;
}
</style>
