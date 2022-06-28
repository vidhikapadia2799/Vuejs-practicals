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
  IS_LOGGED_IN(state, data) {
    state.isLogged = data;
  },
  IS_USER_AUTHENTICATED(state, data) {
    state.IS_USER_AUTHENTICATED = data;
  },
  SET_USERNAME(state, data) {
    state.username = data;
  },
};
