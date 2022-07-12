<template>
  <div class="alert alert-danger" role="alert" v-if="isError">
    {{ errorMessage }}
  </div>
</template>

<script>
export default {
  props: {
    errorMessage: String,
    isError: Boolean,
  },
}
</script>
