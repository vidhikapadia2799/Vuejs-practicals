import axios from "axios";
import routes from "../router/index";
import cookies from "vue-cookies";
import jwt_decode from "jwt-decode";

export default {
  async fetchCars({ commit }) {
    commit("CHANGE_LOADER", true);
    await axios
      .get(
        `https://testapi.io/api/dartya/resource/cardata
      `
      )
      .then((response) => {
        commit("SET_CARS", response.data.data);
        commit("CHANGE_LOADER", false);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  async sendData({ dispatch }, data) {
    axios
      .post(
        `https://testapi.io/api/dartya/resource/cardata
      `,
        data
      )
      .then((response) => {
        if (response.status === 201) {
          dispatch("fetchCars");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong please try again");
      });
  },

  async editCar({ dispatch }, payload) {
    axios
      .put(
        `https://testapi.io/api/dartya/resource/cardata
      /${payload.id}`,
        payload.data
      )
      .then((response) => {
        if (response.status === 200) {
          dispatch("fetchCars");
        }
      })
      .catch((err) => {
        console.log(err);
        alert(`cannot update at this moment`);
      });
  },

  async deleteCar({ dispatch }, id) {
    axios
      .delete(
        `https://testapi.io/api/dartya/resource/cardata
      /${id}`
      )
      .then((response) => {
        if (response.status === 204) {
          dispatch("fetchCars");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("can't delete at this moment");
      });
  },

  async login({ commit }, values) {
    await axios
      .post(`http://localhost:8080/login`, values)
      .then((response) => {
        if (response.status == 200) {
          if (cookies.isKey("authUser")) {
            let cookie_value = cookies.get("authUser");
            let decoded = jwt_decode(cookie_value);

            commit("SETUSERNAME", decoded.name);
            commit("ISLOGGEDIN", true);
            commit("ISUSERAUTHENTICATED", true);
            routes.push("/");
          } else {
            alert("Something went wrong.Try again!");
          }
        }
      })
      .catch((error) => alert(error));
  },

  async register({ commit }, values) {
    console.log(values);
    await axios
      .post(`https://testapi.io/api/dartya/resource/users`, values)
      .then((response) => {
        if (response.status == 201) {
          commit("ADD_USER", response.data);
          routes.push("/login");
        }
      })
      .catch((error) => alert(error));
  },

  async getCarById({ commit }, id) {
    commit("CHANGE_LOADER", true);
    await axios
      .get(`https://testapi.io/api/dartya/resource/cardata/${id}`)
      .then((response) => {
        commit("GET_CAR_BY_ID", response.data);
        commit("CHANGE_LOADER", false);
      })
      .catch((error) => {
        alert(error);
      });
  },

  SET_USERNAME({ commit }, name) {
    commit("SET_USERNAME", name);
  },
};
