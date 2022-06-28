<template>
  <div>
    <NavBar />
    <HomePage />
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  middleware: ['check-auth', 'auth'],
}
</script>
