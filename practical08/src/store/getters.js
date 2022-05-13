export default {
  getCars: (state) => state.cars,
  getCarById: (state) => state.getCarById,
  isLoading: (state) => state.isLoading,
  isUserAuthenticated: (state) => state.isUserAuthenticated,
  setUserName: (state) => state.username,
};
