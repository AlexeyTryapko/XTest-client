import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/PageHome'
import Codes from '../pages/CodesPage'
import PageCodeInfo from '../pages/PageCodeInfo'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/codes/:id',
      name: 'Codes',
      component: Codes,
      props: true,
    },
    {
      path: '/info/',
      name: 'InfoCode',
      component: PageCodeInfo,
      props: true,
    },
    {
      path: '*',
      redirect: '/'
    },
  ]
})
