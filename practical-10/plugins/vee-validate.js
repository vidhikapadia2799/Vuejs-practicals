import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import {
  required,
  email,
  min,
  max,
  confirmed,
  numeric,
} from 'vee-validate/dist/rules'

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

extend('required', {
  ...required,
  message: 'This field is required',
})
extend('email', {
  ...email,
  message: 'The email field must be a valid email',
})
extend('min', {
  ...min,
  message: 'The field must be at least 6 characters',
})
extend('max', {
  ...max,
  message: 'The field may exceed the number of characters',
})
extend('confirmed', {
  ...confirmed,
  message: 'Confirmed password does not match',
})

extend('numeric', {
  ...numeric,
  message: ' The field may only contain numeric characters',
})
