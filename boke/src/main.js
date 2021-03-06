// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import BootstrapVue from 'bootstrap-vue'
import router from './router'
import Axios from 'axios'
import NProgress from 'nprogress'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'font-awesome/css/font-awesome.min.css'
import 'nprogress/nprogress.css'

Vue.config.productionTip = false
Vue.use(BootstrapVue);
Vue.prototype.$axios = Axios

NProgress.configure({     
  easing: 'ease',  // 动画方式    
  speed: 500,  // 递增进度条的速度    
  showSpinner: true, // 是否显示加载ico    
  trickleSpeed: 200, // 自动递增间隔    
  minimum: 0.3 // 初始化时的最小百分比
})

//当路由进入前
router.beforeEach((to, from , next) => {
    // 每次切换页面时，调用进度条
   NProgress.start();
   document.body.scrollTop = 0
   // firefox
   document.documentElement.scrollTop = 0
   // safari
   window.pageYOffset = 0
   // 这个一定要加，没有next()页面不会跳转的。这部分还不清楚的去翻一下官网就明白了
    next();
});
//当路由进入后：关闭进度条
router.afterEach(() => {  
   // 在即将进入新的页面组件前，关闭掉进度条
   NProgress.done()
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
