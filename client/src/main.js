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
import UnknownHome from './components/UnknownHome.vue'
import Login from './components/Login.vue'
import AreasOfInterest from './components/AreasOfInterest.vue'
import Success from './components/Success.vue'
import SECRET from './components/SECRET.vue'
import Content from './components/Learn/Content.vue'
import Create from './components/Learn/Create.vue'
import Paths from './components/Learn/Paths.vue'
import ManageRelationships from './components/Mentoring/ManageRelationships.vue'
import Matching from './components/Mentoring/Matching.vue'
import Reporting from './components/Mentoring/Reporting.vue'
import Search from './components/Mentoring/Search.vue'
import EditProfile from './components/Profile/EditProfile.vue'
import Leaderboards from './components/Profile/Leaderboards.vue'
import Metrics from './components/Profile/Metrics.vue'
import ViewProfile from './components/Profile/ViewProfile.vue'
import Feed from './components/Social/Feed.vue'
import Post from './components/Social/Post.vue'
import About from './components/About.vue'
import Contact from './components/Contact.vue'
import NotFound from './components/NotFound.vue'

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
    component: UnknownHome
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
  },
  {
    path: '/learn/content',
    name: 'content',
    component: Content
  },
  {
    path: '/learn/create',
    name: 'create',
    component: Create
  },
  {
    path: '/learn/paths',
    name: 'paths',
    component: Paths
  },
  {
    path: '/mentoring/manage-relationships',
    name: 'manage-relationships',
    component: ManageRelationships
  },
  {
    path: '/mentoring/matching',
    name: 'matching',
    component: Matching
  },
  {
    path: '/mentoring/reporting',
    name: 'reporting',
    component: Reporting
  },
  {
    path: '/mentoring/search',
    name: 'search',
    component: Search
  },
  {
    path: '/profile/edit-profile',
    name: 'edit-profile',
    component: EditProfile
  },
  {
    path: '/profile/leaderboards',
    name: 'leaderboards',
    component: Leaderboards
  },
  {
    path: '/profile/metrics',
    name: 'metrics',
    component: Metrics
  },
  {
    path: '/profile/view-profile',
    name: 'view-profile',
    component: ViewProfile
  },
  {
    path: '/social/feed',
    name: 'feed',
    component: Feed
  },
  {
    path: '/social/post',
    name: 'post',
    component: Post
  },
  {
    path: '/contact',
    name: 'contact',
    component: Contact
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/404',
    name: 'not-found',
    component: NotFound
  },
  {
    path: '*',
    redirect: '/404'
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
