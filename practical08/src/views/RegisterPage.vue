<template>
  <div class="main_form">
    <div class="m_form">
      <Form @submit="onSubmit" :validation-schema="schema">
        <h3>Create an Account</h3>
        <div class="mb-2">
          <label class="form-label">Name</label>
          <Field name="name" type="text" class="form-control" />
          <ErrorMessage name="name" class="text-danger" />
        </div>

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

        <div class="mb-2">
          <label class="form-label">Confirm Password</label>
          <Field type="password" name="cpassword" class="form-control" />
          <ErrorMessage class="text-danger" name="cpassword" />
        </div>

        <div class="mb-2">
          <label class="form-label">Role</label>
          <Field name="role" as="select" class="form-select form-control">
            <option disabled>Select Car</option>
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
            <option value="customer">Customer</option>
          </Field>
          <ErrorMessage class="text-danger" name="role" />
        </div>

        <div class="mb-2">
          <label>Gender :- &nbsp; </label>

          <Field name="gender" type="radio" value="men" />
          <label>Men &nbsp;</label>

          <Field name="gender" type="radio" value="women" />
          <label>Women</label><br />
          <ErrorMessage class="text-danger" name="gender" />
        </div>

        <div class="mb-2">
          <label>Age</label>
          <Field name="age" type="number" class="form-control" />
          <ErrorMessage class="text-danger" name="age" />
        </div>

        <div class="mb-2">
          <label>DOB</label>
          <Field name="dob" type="date" class="form-control" />
          <ErrorMessage class="text-danger" name="dob" />
        </div>

        <button class="btn btn-primary">Submit</button>
      </Form>
      <router-link to="/login"
        ><p class="login">Already have an account? Signin now!</p></router-link
      >
    </div>
  </div>
</template>
<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { mapActions } from "vuex";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object({
      name: yup.string().required(),
      email: yup.string().required().email(),
      password: yup
        .string()
        .required()
        .matches(
          /^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/,
          "Password should be atleast 8 characters long, max 12 characters,one special character and one number"
        ),
      cpassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Password doesn't match")
        .required(),
      role: yup.string().required(),
      gender: yup.string().required(),
      age: yup.number("age must be number").required(),
      dob: yup.date().required(),
    });
    return {
      schema,
    };
  },
  methods: {
    async onSubmit(values) {
      this.register(values);
    },
    ...mapActions({
      register: "register",
    }),
  },
};
</script>

<style>
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
