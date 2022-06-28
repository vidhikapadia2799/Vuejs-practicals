<template>
  <div class="v_form">
    <div class="m_form">
      <Form @submit="onSubmit" :validation-schema="schema">
        <h3>Login</h3>

        <div class="mb-2">
          <label class="form-label">Email</label>
          <Field name="email" type="email" class="form-control" />
          <ErrorMessage name="email" class="text-danger" />
        </div>

        <div class="mb-2">
          <label class="form-label">Password</label>
          <Field name="password" type="password" class="form-control" />
          <ErrorMessage name="password" class="text-danger" />
        </div>

        <button class="btn btn-primary">Submit</button>
      </Form>
      <router-link to="/register"
        ><p class="register">
          Don't have an account? Register now!
        </p></router-link
      >
    </div>
  </div>
</template>
<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object({
      email: yup.string().required().email(),
      password: yup
        .string()
        .required()
        .matches(
          /^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/,
          "Password should be atleast 8 characters long, max 12 characters,one special character and one number"
        ),
    });
    return {
      schema,
    };
  },
  methods: {
    onSubmit(values) {
      const promise = this.$store.dispatch("login", values);
      promise
        .then((res) => {
          if (res.status === 200) {
            this.$toast.success(`Login successful`, {
              position: "top-right",
              duration: 1500,
            });
          }
        })
        .catch((error) => {
          this.$toast.error(error.message, {
            position: "top-right",
            duration: 2000,
          });
        });
    },
  },
};
</script>

<style>
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
