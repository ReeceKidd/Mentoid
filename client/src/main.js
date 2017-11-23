import Vue from 'vue'

import VueRouter from 'vue-router'

import VueAxios from 'vue-axios'
import axios from 'axios'
import Vuelidate from 'vuelidate'

import App from './App.vue'
import CreateItem from './components/CreateItem.vue'
import DisplayItem from './components/DisplayItem.vue'
import EditItem from './components/EditItem.vue'
import Register from './components/Register.vue'
import HomePage from './components/HomePage.vue'
import Login from './components/Login.vue'
import AreasOfInterest from './components/AreasOfInterest.vue'

Vue.use(VueRouter)
Vue.use(VueAxios, axios)
Vue.use(Vuelidate)

const routes = [{
  name: 'CreateItem',
  path: '/create/item',
  component: CreateItem
},
{
  name: 'DisplayItem',
  path: '/',
  component: DisplayItem
},
{
  name: 'EditItem',
  path: '/edit/:id',
  component: EditItem
},
{
  path: '/home',
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
}
]

const router = new VueRouter({
  mode: 'history',
  routes: routes
})
new Vue(Vue.util.extend({
  router
}, App)).$mount('#app')
