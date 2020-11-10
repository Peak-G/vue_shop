import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import '../src/assets/css/global.css'
import axiox from 'axios'
Vue.config.productionTip = false
Vue.prototype.$http = axiox
axiox.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
