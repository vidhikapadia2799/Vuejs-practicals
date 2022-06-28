import axios from "axios";
import routes from "../router/index";
import cookies from "vue-cookies";
import jwt_decode from "jwt-decode";

export default {
  async fetchCars({ commit }) {
    commit("CHANGE_LOADER", true);

    const response = await axios
      .get(`${process.env.VUE_APP_CARDATA_API}`)
      .then((response) => {
        if (response.status === 200) {
          commit("SET_CARS", response.data.data);
          commit("CHANGE_LOADER", false);
        }

        return response;
      });

    return response;
  },

  async sendData({ dispatch }, data) {
    const response = await axios
      .post(`${process.env.VUE_APP_CARDATA_API}`, data)
      .then((response) => {
        if (response.status === 201) {
          dispatch("fetchCars");
        }
        return response;
      });
    return response;
  },

  async editCar({ dispatch }, payload) {
    const response = await axios
      .put(`${process.env.VUE_APP_CARDATA_API}/${payload.id}`, payload.data)
      .then((response) => {
        if (response.status === 200) {
          dispatch("fetchCars");
        }
        return response;
      });
    return response;
  },

  async deleteCar({ dispatch }, id) {
    const response = axios
      .delete(`${process.env.VUE_APP_CARDATA_API}/${id}`)
      .then((response) => {
        if (response.status === 204) {
          dispatch("fetchCars");
        }
        return response;
      });
    return response;
  },

  async login({ commit }, values) {
    const response = await axios
      .post(`http://localhost:8080/login`, values)
      .then((response) => {
        if (response.status == 200) {
          if (cookies.isKey("authUser")) {
            let cookie_value = cookies.get("authUser");
            let decoded = jwt_decode(cookie_value);

            commit("SET_USERNAME", decoded.name);
            commit("IS_LOGGED_IN", true);
            commit("IS_USER_AUTHENTICATED", true);

            routes.push("/");
          }
        }
        return response;
      });
    return response;
  },

  async register({ commit }, values) {
    const response = await axios
      .post(`${process.env.VUE_APP_REGISTER}`, values)
      .then((response) => {
        if (response.status == 201) {
          commit("ADD_USER", response.data);
          routes.push("/login");
        }
        return response;
      });
    return response;
  },

  async getCarById({ commit }, id) {
    commit("CHANGE_LOADER", true);
    const response = await axios
      .get(`${process.env.VUE_APP_CARDATA_API}/${id}`)
      .then((response) => {
        commit("GET_CAR_BY_ID", response.data);
        commit("CHANGE_LOADER", false);

        return response;
      });
    return response;
  },
  SET_USERNAME({ commit }, name) {
    commit("SET_USERNAME", name);
  },
};
