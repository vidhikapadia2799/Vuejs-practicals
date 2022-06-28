<template>
  <div class="d-flex justify-content-end">
    <router-link to="/login"
      ><button class="btn text-white" v-if="!isAuthenticated">
        Login
      </button></router-link
    >
    <router-link to="/register" v-if="!isAuthenticated"
      ><button class="btn text-white">Register</button></router-link
    >

    <button
      @click="handleModel(true), handleFormHeading('Add Car')"
      class="btn add_btn text-white"
      v-if="isAuthenticated"
    >
      Add car
    </button>
  </div>

  <!-- modal for add and update car -->

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
            <Form
              @submit="handleSubmit"
              :validation-schema="schema"
              :initial-values="initialValues"
            >
              <Field type="hidden" name="id" class="form-control" />

              <div class="mb-2">
                <label class="form-label">Car Name</label>
                <Field type="text" name="name" class="form-control" />
                <ErrorMessage class="text-danger" name="name" />
              </div>
              <div class="mb-2">
                <label class="form-label">Car Image</label>
                <Field type="text" name="image" class="form-control" />
                <ErrorMessage class="text-danger" name="image" />
              </div>

              <div class="mb-2">
                <label class="form-label">Car Price</label>
                <Field type="number" name="price" class="form-control" />
                <ErrorMessage class="text-danger" name="price" />
              </div>
              <div class="mb-2">
                <label for="exampleInputPassword1" class="form-label"
                  >Car Details</label
                >
                <Field
                  as="textarea"
                  class="form-control"
                  name="details"
                  rows="2"
                />
                <ErrorMessage class="text-danger" name="details" />
              </div>

              <button type="submit" class="btn btn-primary">Submit</button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { mapGetters } from "vuex";

export default {
  name: "UpdateModalComponent",
  components: {
    Field,
    Form,
    ErrorMessage,
  },
  data() {
    const schema = yup.object({
      id: yup.string(),
      name: yup.string().required("car name shouldn't be empty"),
      details: yup
        .string()
        .required("car details shouldn't be empty")
        .min(30)
        .max(120),
      image: yup
        .string()
        .required("car image url shouldn't be empty")
        .url("imge should be in url format"),
      price: yup
        .number("price must be number")
        .required("car price shouldn't be empty"),
    });
    return {
      schema,
    };
  },
  props: {
    addCar: Function,
    showModel: Boolean,
    handleModel: Function,
    initialValues: Object,
    handleFormHeading: Function,
    formHeading: String,
  },
  methods: {
    async handleSubmit(values, formActions) {
      this.addCar(values);
      formActions.resetForm();
      this.handleModel(false);
    },
  },
  computed: {
    ...mapGetters({
      isAuthenticated: "IS_USER_AUTHENTICATED",
      SET_USERNAME: "SET_USERNAME",
    }),
  },
};
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
  margin-right: 220px;
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
