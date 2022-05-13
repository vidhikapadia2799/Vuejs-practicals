export default {
  SET_CARS(state, cars) {
    state.cars = cars;
  },
  ADD_USER(state, data) {
    state.userInfo = data;
  },
  GET_CAR_BY_ID(state, data) {
    state.getCarById = data;
  },
  CHANGE_LOADER(state, data) {
    state.isLoading = data;
  },
  ISLOGGEDIN(state, data) {
    state.isLogged = data;
  },
  ISUSERAUTHENTICATED(state, data) {
    state.isUserAuthenticated = data;
  },
  SETUSERNAME(state, data) {
    state.username = data;
  },
};
