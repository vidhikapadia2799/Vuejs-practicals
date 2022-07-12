<template>
  <div>
    <transition name="modal-fade">
      <div v-show="showModel" class="modal-backdrop">
        <div
          class="modal"
          role="dialog"
          aria-labelledby="modalTitle"
          aria-describedby="modalDescription"
        >
          <header class="modal-header" id="modalTitle">
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
          </header>

          <section class="modal-body">
            <div class="form">
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

                  <ValidationProvider
                    name="image"
                    rules="url"
                    v-slot="{ errors }"
                  >
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
                    rules="required|max:200"
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
          </section>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { computed, useRouter, useStore } from '@nuxtjs/composition-api'

export default {
  props: {
    addCar: Function,
    showModel: Boolean,
    handleModel: Function,
    handleFormHeading: Function,
    formHeading: String,
  },

  setup(props) {
    const store = useStore()
    const router = useRouter()

    function onSubmit() {
      props.addCar({
        id: id.value,
        name: name.value,
        image: image.value,
        price: price.value,
        details: details.value,
      })
    }

    const id = computed({
      get() {
        return store.state.selectedCar.id
      },
      set(value) {
        store.commit('updateId', value)
      },
    })

    const name = computed({
      get() {
        return store.state.selectedCar.name
      },
      set(value) {
        store.commit('updateName', value)
      },
    })

    const price = computed({
      get() {
        return store.state.selectedCar.price
      },
      set(value) {
        store.commit('updatePrice', value)
      },
    })

    const details = computed({
      get() {
        return store.state.selectedCar.details
      },
      set(value) {
        store.commit('updateDetails', value)
      },
    })

    const image = computed({
      get() {
        return store.state.selectedCar.image
      },
      set(value) {
        store.commit('updateImage', value)
      },
    })

    return {
      onSubmit,
      id,
      name,
      image,
      price,
      details,
    }
  },
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(102, 151, 158, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  width: 30%;
  height: 88%;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  position: fixed;
  top: initial;
  left: initial;
  z-index: 1055;
  outline: 0;
}
.modal-header,
.modal-footer {
  display: flex;
}
.modal-header {
  position: relative;
  border-bottom: 1px solid #eeeeee;
  color: #0d6f73;
  font-weight: bold;
}
.modal-body {
  position: relative;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  transform: translateY(-200px);
}
.modal-fade-enter-to,
.modal-fade-leave-from {
  transform: translateY(0px);
}
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: transform 0.3s;
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
