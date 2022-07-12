import axios from 'axios'
import Cookie from 'js-cookie'

export default {
  nuxtServerInit(vuexContext, context) {
    return this.$axios
      .$get('/cardata')
      .then((res) => {
        const carsArray = []
        for (const key in res.data) {
          carsArray.push({ ...res.data[key] })
        }
        vuexContext.commit('setCars', carsArray)
      })
      .catch((e) => context.error(e))
  },

  async getCarById(vuexContext, id) {
    await this.$axios
      .$get(`/cardata/${id}`)
      .then((response) => {
        vuexContext.commit('getCarById', response)
        console.log(response)
      })
      .catch((e) => {
        console.log(e)
      })
  },

  async register(vuexContext, authData) {
    let authUrl =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
      process.env.APIKey

    return this.$axios.$post(authUrl, {
      email: authData.email,
      password: authData.password,
      returnSecureToken: true,
    })
  },

  async addCar(vuexContext, data) {
    await this.$axios
      .$post(`/cardata`, data)
      .then((response) => {
        vuexContext.commit('addCar', response)
      })
      .catch((e) => console.log(e))
  },

  async deleteCar(vuexContext, id) {
    return await axios
      .delete(`https://testapi.io/api/dartya/resource/cardata/${id}`)
      .then((response) => {
        if (response.status === 204) {
          vuexContext.commit('deleteCar', id)
        }
      })
      .catch((e) => console.log(e))
  },

  async editCar(vuexContext, payload) {
    await this.$axios
      .$put(`/cardata/${payload.id}`, payload.data)
      .then((response) => {
        vuexContext.commit('editCar', payload.data)
      })
      .catch((e) => console.log(e))
  },

  authenticateUser(vuexContext, authData) {
    let authUrl =
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' +
      process.env.APIKey

    return this.$axios.$post(authUrl, {
      email: authData.email,
      password: authData.password,
      returnSecureToken: true,
    })
  },

  initAuth(vuexContext, req) {
    let token
    let expirationDate
    if (req) {
      if (!req.headers.cookie) {
        return
      }
      const jwtCookie = req.headers.cookie
        .split(';')
        .find((c) => c.trim().startsWith('jwt='))
      if (!jwtCookie) {
        return
      }
      token = jwtCookie.split('=')[1]
      expirationDate = req.headers.cookie
        .split(';')
        .find((c) => c.trim().startsWith('expirationDate='))
        .split('=')[1]
    } else {
      token = localStorage.getItem('token')
      expirationDate = localStorage.getItem('tokenExpiration')
    }
    if (new Date().getTime() > +expirationDate || !token) {
      console.log('No token or invalid token')
      vuexContext.dispatch('logout')
      return
    }
    vuexContext.commit('setToken', token)
  },

  logout(vuexContext) {
    vuexContext.commit('clearToken')
    Cookie.remove('jwt')
    Cookie.remove('expirationDate')
    if (process.client) {
      localStorage.removeItem('token')
      localStorage.removeItem('tokenExpiration')
    }
  },
}
