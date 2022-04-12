<template>
  <div
    class="modal fade"
    id="staticBackdrop"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <Form @submit="onSubmit" :validation-schema="schema">
            <div>
              <label for="name" class="col-form-label">Car Title</label>
              <Field id="name" name="name" type="text" class="form-control" />
              <ErrorMessage name="name" class="text-danger" />
            </div>

            <div>
              <label for="details" class="col-form-label"
                >Car Description</label
              >
              <Field
                id="details"
                name="details"
                type="text"
                class="form-control"
              />
              <ErrorMessage name="details" class="text-danger" />
            </div>

            <div>
              <label for="price" class="col-form-label">Car Price</label>
              <Field
                id="price"
                name="price"
                type="number"
                class="form-control"
              />
              <ErrorMessage name="price" class="text-danger" />
            </div>

            <div>
              <label for="image" class="col-form-label">Car Image</label>
              <Field id="image" name="image" type="text" class="form-control" />
              <ErrorMessage name="image" class="text-danger" />
            </div>

            <button class="btn btn-primary mt-3">Submit</button>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Field, Form, ErrorMessage } from "vee-validate";
import * as Yup from "yup";
import axios from "axios";
export default {
  name: "ModalComponent",
  data() {
    return {};
  },
  components: {
    Field,
    Form,
    ErrorMessage,
  },
  setup() {
    const schema = Yup.object().shape({
      name: Yup.string().required("Car Title is Required!"),
      details: Yup.string()
        .required("Car Description is Required!")
        .min(30)
        .max(120),
      price: Yup.number().required("Car Price is Required!"),
      image: Yup.string()
        .required("Car Image is Required!")
        .url("Car Image must be url Format!"),
    });

    function onSubmit(values) {
      axios
        .post("https://testapi.io/api/dartya/resource/cardata", values)
        .then((response) => {
          if (response.status === 201) {
            this.$parent.getCarData();
          }
        })
        .catch((e) => console.log(e));
    }

    return {
      schema,
      onSubmit,
    };
  },
};
</script>

<style lang="scss" scoped></style>
