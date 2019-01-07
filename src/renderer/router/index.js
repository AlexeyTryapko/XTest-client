import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/PageHome'
import Codes from '../pages/CodesPage'
import Info from '../pages/PageCodeInfo'

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
      path: '/info/:id',
      name: 'Info',
      component: Info,
      props: true,
    },
    {
      path: '*',
      redirect: '/'
    },
  ]
})
