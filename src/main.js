import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Vuetify from "vuetify";
import Toasted from "vue-toasted";

import axios from "axios";
import VueAxios from "vue-axios";

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
Vue.use(Toasted, {
  fullWidth: true,
});
Vue.use(Vuetify, {
  iconfont: "mdi" || "fa" || "fa4",
});

new Vue({
  router,
  store,
  vuetify,
  axios,
  render: (h) => h(App),
}).$mount("#app");
