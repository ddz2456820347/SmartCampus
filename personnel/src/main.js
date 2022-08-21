import Vue from 'vue'
import App from './App.vue'

//引入路由
import VueRouter from "vue-router"
import router from "./router/index"

//引入vuex
import store from "./store/index"

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import "../theme/index.css"

// 引入echarts

import * as echarts from "echarts";

Vue.prototype.$echarts = echarts;

// 引入动画库
// import animated from 'animate.css'
// Vue.use(animated)

// 引入viewui库

import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

Vue.use(ViewUI);


Vue.config.productionTip = false

import 'animate.css';

Vue.use(VueRouter)

Vue.use(ElementUI)
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
