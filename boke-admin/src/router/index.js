import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import Index from '@/views/index'
import AddEssay from '@/views/addessay'
import EditEssay from '@/views/editEssay'
import indexInfo from '@/views/indexInfo'
import EssayList from '@/views/essayList'
import EssayTags from '@/views/essayTags'
import WebSet from '@/views/webSet'
import Remark from '@/views/remark'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component:Login
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      name: 'Index',
      component: Index,
      children:[{
        path: '/addessay',
        name: 'AddEssay',
        component:AddEssay
      },{
        path: '/index',
        name: 'indexInfo',
        component: indexInfo
      },{
          path: '/indexInfo',
          component: indexInfo
      },{
        path:'/essaylist',
        name:'EssayList',
        component: EssayList
      },{
        path:'/editEssay',
        name: 'EditEssay',
        component: EditEssay
      },{
        path:'/essayTags',
        name:'EssayTags',
        component: EssayTags
      },{
        path: '/setting',
        name: 'WebSet',
        component: WebSet
      },{
        path: '/remark',
        name: 'Remark',
        component: Remark
      }]
    },
  ]
})
router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  const isLogin = localStorage.bokeToken ? true : false;
  if(to.path == '/login' || to.path == '/register'){
    next()
  }else{
    isLogin ? next() : next('/login')
  }
})
export default router