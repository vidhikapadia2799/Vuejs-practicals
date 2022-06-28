export default {
  setCars(state, cars) {
    state.cars = cars
  },
  getCarById(state, data) {
    state.getCarById = data
  },
  addCar(state, car) {
    state.cars.unshift(car)
  },
  editCar(state, editedCar) {
    const carIndex = state.cars.findIndex((car) => car.id === editedCar.id)
    state.cars.splice(carIndex, 1, editedCar)
  },
  deleteCar(state, id) {
    const carIndex = state.cars.findIndex((car) => car.id === id)
    state.cars.splice(carIndex, 1)
  },
  initialValues(state, data) {
    state.selectedCar.id = data.id
    state.selectedCar.name = data.name
    state.selectedCar.price = data.price
    state.selectedCar.image = data.image
    state.selectedCar.details = data.details
  },
  updateId(state, message) {
    state.selectedCar.id = message
  },
  updatePrice(state, message) {
    state.selectedCar.price = message
  },
  updateName(state, message) {
    state.selectedCar.name = message
  },
  updateImage(state, message) {
    state.selectedCar.image = message
  },
  updateDetails(state, message) {
    state.selectedCar.details = message
  },
  setToken(state, token) {
    state.token = token
  },
  clearToken(state) {
    state.token = null
  },
}
