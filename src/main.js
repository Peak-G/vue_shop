import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import '../src/assets/css/global.css'
import store from './store'
import axiox from 'axios'
Vue.config.productionTip = false
Vue.prototype.$http = axiox
axiox.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

axiox.interceptors.request.use(config => {
  config.headers.Authorization = store.state.token
  return config
})