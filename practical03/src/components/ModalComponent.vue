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
              <label for="title" class="col-form-label">Car Title</label>
              <Field id="title" name="title" type="text" class="form-control" />
              <ErrorMessage name="title" class="text-danger" />
            </div>

            <div>
              <label for="description" class="col-form-label"
                >Car Description</label
              >
              <Field
                id="description"
                name="description"
                type="text"
                class="form-control"
              />
              <ErrorMessage name="description" class="text-danger" />
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
              <label for="carimage" class="col-form-label">Car Image</label>
              <Field
                id="carimage"
                name="carimage"
                type="text"
                class="form-control"
              />
              <ErrorMessage name="carimage" class="text-danger" />
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
      title: Yup.string().required("Car Title is Required!"),
      description: Yup.string()
        .required("Car Description is Required!")
        .min(30)
        .max(120),
      price: Yup.number().required("Car Price is Required!"),
      carimage: Yup.string()
        .required("Car Image is Required!")
        .url("Car Image must be url Format!"),
    });

    function onSubmit(values) {
      alert(JSON.stringify(values, null, 2));
    }

    return {
      schema,
      onSubmit,
    };
  },
};
</script>

<style lang="scss" scoped></style>
