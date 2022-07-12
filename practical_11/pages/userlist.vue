<template>
  <div>
    <NavBar />

    <div class="d-flex flex-row-reverse">
      <button class="btn btn-secondary mt-2 me-2" @click="addUser">
        Add user
      </button>
    </div>

    <div class="container text-center">
      <table class="table table-bordered mt-2">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Age</th>
            <th scope="col">Birth Date</th>
            <th scope="col">Gender</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="userList in result" :key="userList.id">
            <td>{{ userList.name }}</td>
            <td>{{ userList.email }}</td>
            <td>{{ userList.role }}</td>
            <td>{{ userList.age }}</td>
            <td>{{ userList.dob }}</td>
            <td>{{ userList.gender }}</td>
          </tr>
        </tbody>
      </table>
      <p>page {{ currentPage }} of {{ lastPage }}</p>
      <p>
        <button @click="prev" type="button" class="btn btn-info">prev</button>
        <button @click="next" type="button" class="btn btn-info">next</button>
      </p>
    </div>
  </div>
</template>

<script>
import { computed, ref } from '@vue/composition-api'
import { useAsync, useRouter } from '@nuxtjs/composition-api'
import axios from 'axios'
import { usePagination } from 'vue-composable'

export default {
  middleware: ['check-auth', 'auth'],

  setup() {
    const router = useRouter()
    const userLists = ref([])

    useAsync(() => {
      axios.get(`https://testapi.io/api/dartya/resource/users`).then((res) => {
        userLists.value = res.data.data
        console.log(userLists.value)
      })
    })

    const addUser = () => {
      router.push('/addUser')
    }

    const { currentPage, lastPage, next, prev, offset, pageSize } =
      usePagination({
        currentPage: 0,
        pageSize: 10,
        total: computed(() => userLists.value.length),
      })

    const result = computed(() => {
      const array = userLists.value
      if (!Array.isArray(array)) return []
      return array.slice(offset.value, offset.value + pageSize.value)
    })

    return {
      userLists,
      addUser,
      currentPage,
      lastPage,
      next,
      prev,
      result,
    }
  },
}
</script>
