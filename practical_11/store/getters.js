export default {
  getCarById(state) {
    return state.getCarById
  },

  loadedCars(state) {
    return state.cars
  },

  selectedCar(state) {
    return state.selectedCar
  },

  isAuthenticated(state) {
    return state.token != null
  },
}
