import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authToken: null,
  },
  mutations: {
    setAuthToken: (state, payload) => {
      state.authToken = payload;
    },
  },
  actions: {},
  modules: {},
  getters: {
    getAuthToken: (state) => state.authToken,
  },
});
