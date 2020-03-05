import Vue from 'vue';
import App from "./App.vue";
import router from './Router'
import 'bulma/css/bulma.css'

Vue.config.productionTip = false;

window.Vue = Vue;
window.bus = new Vue;
new Vue({
  router,
//   store,
  render: h => h(App)
}).$mount("#app");