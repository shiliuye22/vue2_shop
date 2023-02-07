import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import '../src/assets/css/global.css'
import '../src/assets/fonts/iconfont.css'
import TreeTable from 'vue-table-with-tree-grid'
import axios from 'axios'
Vue.config.productionTip = false

axios.interceptors.request.use(config=>{
  console.log(config)
  config.headers.Authorization = window.localStorage.getItem('token')
  return config
})
Vue.component('tree-table',TreeTable)
Vue.prototype.$http = axios

// 配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
