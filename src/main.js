import Vue from 'vue'
import store from './store'
import App from './App.vue'
import router from "./router";
import Axios from 'axios'


Vue.prototype.$http = Axios;

router.beforeEach((to, from, next) => {
  if (to.is_auth) next({ name: '#sign_in' })
  else next()
})

function add(accumulator, a) {
  return accumulator + a;
}

Array.prototype.sum = function () {
  return this.reduce(add,0)
}

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')


