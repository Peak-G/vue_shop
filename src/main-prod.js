import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import './plugins/element.js'
import '../src/assets/css/global.css'
import store from './store'
import axiox from 'axios'
import TreeTable from 'vue-table-with-tree-grid'
// 富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// 富文本编辑器对应的样式
Vue.config.productionTip = false
Vue.prototype.$http = axiox
Vue.use(VueQuillEditor)
axiox.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 格式化时间
Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDay() + '').padStart(2, '0')
  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})
Vue.component('tree-table', TreeTable)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

axiox.interceptors.request.use(config => {
  config.headers.Authorization = store.state.token
  return config
})