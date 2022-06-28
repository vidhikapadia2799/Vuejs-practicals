<template>
  <div>
    <div class="d-flex justify-content-end">
      <button
        @click="handleModel(true), handleFormHeading('Add Car')"
        class="btn add_btn text-white"
      >
        Add car
      </button>

      <button @click="onLogout" class="btn add_btn text-white">Logout</button>
    </div>

    <transition>
      <div v-show="showModel" class="model">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{ formHeading }}</h5>
              <button
                type="button"
                class="btn btn-danger"
                data-dismiss="modal"
                @click="handleModel(false)"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
                <form @submit.prevent="handleSubmit(onSubmit)">
                  <ValidationProvider name="id" v-slot="{ errors }">
                    <div class="form-group mb-2">
                      <input type="hidden" class="form-control" v-model="id" />
                      <span class="text-danger">{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>

                  <ValidationProvider
                    name="name"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <div class="form-group mb-2">
                      <label>Car Name</label>
                      <input type="text" class="form-control" v-model="name" />
                      <span class="text-danger">{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>

                  <ValidationProvider name="image" v-slot="{ errors }">
                    <div class="form-group mb-2">
                      <label>Car Image</label>
                      <input type="text" class="form-control" v-model="image" />
                      <span class="text-danger">{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>

                  <ValidationProvider
                    name="price"
                    rules="required|numeric"
                    v-slot="{ errors }"
                  >
                    <div class="form-group mb-2">
                      <label>Car Price</label>
                      <input type="text" class="form-control" v-model="price" />
                      <span class="text-danger">{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>

                  <ValidationProvider
                    name="details"
                    rules="required|max:30"
                    v-slot="{ errors }"
                  >
                    <div class="form-group mb-2">
                      <label>Car Details</label>
                      <textarea
                        type="text"
                        class="form-control"
                        v-model="details"
                      />
                      <span class="text-danger">{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>
                  <button class="btn btn-primary" type="submit">
                    Register Car
                  </button>
                </form>
              </ValidationObserver>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    addCar: Function,
    showModel: Boolean,
    handleModel: Function,
    handleFormHeading: Function,
    formHeading: String,
  },
  methods: {
    onSubmit() {
      this.addCar({
        id: this.id,
        name: this.name,
        image: this.image,
        price: this.price,
        details: this.details,
      })
    },
    onLogout() {
      this.$store.dispatch('logout')
      this.$router.push('/login')
    },
  },
  computed: {
    id: {
      get() {
        return this.$store.state.selectedCar.id
      },
      set(value) {
        this.$store.commit('updateId', value)
      },
    },
    name: {
      get() {
        return this.$store.state.selectedCar.name
      },
      set(value) {
        this.$store.commit('updateName', value)
      },
    },
    price: {
      get() {
        return this.$store.state.selectedCar.price
      },
      set(value) {
        this.$store.commit('updatePrice', value)
      },
    },
    details: {
      get() {
        return this.$store.state.selectedCar.details
      },
      set(value) {
        this.$store.commit('updateDetails', value)
      },
    },
    image: {
      get() {
        return this.$store.state.selectedCar.image
      },
      set(value) {
        this.$store.commit('updateImage', value)
      },
    },
  },
}
</script>

<style scoped>
.model {
  position: absolute;
  margin-left: 30%;
  top: 40px;
  z-index: 1;
  width: 500px;
}
.button_design {
  margin-top: -70px;
  position: relative;
  margin-right: 10px;
  margin-bottom: 10px;
}
.button_design:focus {
  outline: none;
  box-shadow: none;
}
.add_btn {
  margin-top: -45px;
  position: relative;
  margin-bottom: 40px;
}
.add_btn:focus {
  outline: none;
  box-shadow: none;
}
.backdrop1 {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
}
.v-enter-from,
.v-leave-to {
  transform: translateY(-200px);
}
.v-enter-to,
.v-leave-from {
  transform: translateY(0px);
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s;
}
</style>
