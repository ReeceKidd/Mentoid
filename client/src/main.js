import Vue from 'vue'

import VueRouter from 'vue-router'

import VueAxios from 'vue-axios'
import axios from 'axios'
import Vuelidate from 'vuelidate'

// import vuex store
import store from './store'

import App from './App.vue'
import CreateItem from './components/CreateItem.vue'
import DisplayItem from './components/DisplayItem.vue'
import EditItem from './components/EditItem.vue'
import Register from './components/Register.vue'
import HomePage from './components/HomePage.vue'
import Login from './components/Login.vue'
import AreasOfInterest from './components/AreasOfInterest.vue'
import Success from './components/Success.vue'
import SECRET from './components/SECRET.vue'

Vue.use(VueRouter)
Vue.use(VueAxios, axios)
Vue.use(Vuelidate)

const routes = [
  {
    name: 'CreateItem',
    path: '/create/item',
    component: CreateItem
  },
  {
    name: 'DisplayItem',
    path: '/display',
    component: DisplayItem
  },
  {
    name: 'EditItem',
    path: '/edit/:id',
    component: EditItem
  },
  {
    path: '/',
    name: 'root',
    component: HomePage
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/areas-of-interest',
    name: 'areas-of-interest',
    component: AreasOfInterest
  },
  {
    path: '/success',
    name: 'success',
    component: Success
  },
  {
    path: '/secret',
    name: 'secret',
    component: SECRET
  }
]

const router = new VueRouter({
  mode: 'history',
  routes: routes
})

// eslint throws disallows 'new' keyword so disable
// eslint-disable-next-line
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
