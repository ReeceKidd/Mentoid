import Vue from 'vue';

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios, axios);

import App from './App.vue';
import CreateItem from './components/CreateItem.vue'
import DisplayItem from './components/DisplayItem.vue'
import EditItem from './components/EditItem.vue'
import Register from './components/Register'
import HomePage from './components/HomePage'
import Login from './components/Login'

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
  }
];

const router = new VueRouter({
  mode: 'history',
  routes: routes
});
new Vue(Vue.util.extend({
  router
}, App)).$mount('#app');
