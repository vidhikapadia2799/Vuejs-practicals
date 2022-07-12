<template>
  <div>
    <div class="main_form">
      <div class="m_form">
        <h4 class="text-center text-success">Add new user</h4>
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
                  class="form-control form-control-sm"
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
                  class="form-control form-control-sm"
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
                  class="form-control form-control-sm"
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
                  class="form-control form-control-sm"
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
                  class="form-select form-select-sm"
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
                <input type="radio" v-model="userData.gender" value="male" />
                <label>Male</label>
                <input type="radio" v-model="userData.gender" value="female" />
                <label>Female</label>
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
                  class="form-control form-control-sm"
                  v-model="userData.age"
                />
                <span class="text-danger">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
            <div class="form-group mb-2">
              <label>Birth Date</label>
              <input
                type="date"
                :max="disableDate"
                class="form-control form-control-sm"
                v-model="userData.dob"
              />
            </div>

            <button class="btn btn-primary btn-sm" type="submit">
              Add User
            </button>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter, reactive, computed } from '@nuxtjs/composition-api'
import axios from 'axios'

export default {
  middleware: ['check-auth', 'auth'],
  setup() {
    const router = useRouter()

    let userData = reactive({
      name: '',
      email: '',
      password: '',
      cpassword: '',
      role: '',
      gender: '',
      age: 0,
      dob: '',
    })

    const onSubmit = () => {
      axios
        .post(`https://testapi.io/api/dartya/resource/users`, userData)
        .then((res) => {
          if (res.status === 201) {
            router.push('/userlist')
          }
        })
        .catch((e) => alert('Something went wrong,try after sometime'))
    }

    const disableDate = computed(() => {
      let today
      today = new Date().toISOString()
      return today.slice(0, 10)
    })

    return {
      userData,
      onSubmit,
      disableDate,
    }
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
  max-width: 460px;
  padding: 15px;
  margin: auto;
  margin: 20px;
  background-color: #f5f5f5;
}
.login {
  margin-top: 10px;
}
</style>
