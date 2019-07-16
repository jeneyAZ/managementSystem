import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import iView from 'iview'
import axios from 'axios'
import 'iview/dist/styles/iview.css'
import './permission'

Vue.config.productionTip = false
Vue.use(iView)

import { getHttp, postHttp } from './request/http'
Vue.prototype.$get=getHttp
Vue.prototype.$post=postHttp

// 设置基础URL
// axios.defaults.baseURL = ''
// 设置请求超时时间
// axios.defaults.timeout = 5000
Vue.prototype.$axios = axios

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})