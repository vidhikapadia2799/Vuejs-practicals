<template>
  <nav class="navbar navbar-light bg-success">
    <div class="container-fluid center">
      <span class="navbar-brand mb-0 text-white">Car Showroom</span>
      <div>
        <button
          class="btn text-white"
          v-if="!['userlist'].includes($route.name)"
          @click="userList"
        >
          UserList
        </button>
        <button
          @click="
            $emit('handleModel', true), $emit('handleFormHeading', 'Add Car')
          "
          v-if="!['adduser', 'userlist', 'cars-id'].includes($route.name)"
          class="btn add_btn text-white"
        >
          Add car
        </button>
        <button @click="onLogout" class="btn add_btn text-white">Logout</button>
      </div>
    </div>
  </nav>
</template>

<script>
import { useRouter, useStore } from '@nuxtjs/composition-api'

export default {
  setup() {
    const router = useRouter()
    const store = useStore()

    const userList = () => router.push('/userlist')

    const onLogout = () => {
      store.dispatch('logout')
      router.push('/login')
    }

    return { userList, onLogout }
  },
}
</script>
