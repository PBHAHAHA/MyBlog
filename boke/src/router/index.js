import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index'
import Contents from '@/views/contents'
import SearchList from '@/views/searchList'
import TagsCont from '@/views/tagsCont'
import About from '@/views/about'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path:'/contents',
      name:'Contents',
      component: Contents
    },
    {
      path: '/searchList',
      name: 'SearchList',
      component: SearchList
    },
    {
      path: '/tagsCont',
      name: 'TagsCont',
      component: TagsCont
    },
    {
      path: '/about',
      name: 'About',
      component: About
    }
  ]
})
