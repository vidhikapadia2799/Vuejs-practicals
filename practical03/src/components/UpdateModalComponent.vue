<template>
  <div v-show="showModel" class="model">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Update Car</h5>
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
              <Field type="text" name="heading" class="form-control" />
              <ErrorMessage class="text-danger" name="heading" />
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

            <button type="submit" class="btn btn-primary">
              Update Car Details
            </button>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
  name: "UpdateModalComponent",
  components: {
    Field,
    Form,
    ErrorMessage,
  },
  data() {},
  props: {
    showModel: Boolean,
    handleModel: Function,
    initialValues: Object,
  },
  methods: {
    handleSubmit(values, formActions) {
      console.log(values);
      alert(JSON.stringify(values));
      formActions.resetForm();
      this.handleModel(false);
    },
  },
  setup() {
    const schema = yup.object({
      id: yup.string(),
      heading: yup.string().required("car name shouldn't be empty"),
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
};
</script>

<style scoped>
.model {
  position: absolute;
  top: 40px;
  z-index: 1;
  width: 500px;
}
</style>
