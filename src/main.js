import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from './inter'
import comp from './comp'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import echarts from 'echarts'

Vue.prototype.$echarts = echarts
Vue.use(comp)
Vue.prototype.$axios = axios

Vue.config.productionTip = false
// axios.interceptors.request.use((config) => {
//   var result = localStorage.getItem('content')
//   let token = result ? JSON.parse(result).token : null
//   config.headers.Authorization = `Bearer ${token}`
//   return config
// }, (err) => {
//   return Promise.reject(err)
// })

router.beforeEach((to, from, next) => {
  nprogress.start()
  document.title = to.meta.title || 'project'
  console.log(from)
  if (to.path.startsWith('/home')) {
    let result = window.localStorage.getItem('content')
    if (result) {
      let result = window.localStorage.getItem('content')
      let content = JSON.parse(result)
      if (content.token) {
        next()
      } else {
        next('/login')
      }
    }
  } else {
    next()
  }
})
router.afterEach(() => {
  nprogress.done()
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
