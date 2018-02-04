import Vue from 'vue'

import VueRouter from 'vue-router'

import VueAxios from 'vue-axios'
import axios from 'axios'
import Vuelidate from 'vuelidate'
import store from './store'

import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App.vue'

//  Registration Components
import BasicRegistration from './components/Register/BasicRegistration.vue'
import RegisterAreasOfInterest from './components/Register/RegisterAreasOfInterest.vue'
import RegisterJobHistory from './components/Register/RegisterJobHistory.vue'
import UploadProfilePicture from './components/Register/UploadProfilePicture.vue'
import RegisterBio from './components/Register/RegisterBio.vue'
import RegisterEducation from './components/Register/RegisterEducation.vue'
import MentorPreferences from './components/Register/MentorPreferences.vue'
import MenteePreferences from './components/Register/MenteePreferences.vue'

import UnknownHome from './components/UnknownHome.vue'
import Login from './components/Login.vue'
import Success from './components/Success.vue'
import SECRET from './components/SECRET.vue'
import Content from './components/Learn/Content.vue'
import Create from './components/Learn/Create.vue'
import PathsHome from './components/Learn/Paths/PathsHome.vue'
import PathsSubSection from './components/Learn/Paths/PathsSubSection.vue'
import ManageRelationships from './components/Mentoring/ManageRelationships.vue'
import MatchingHome from './components/Mentoring/Matching/MatchingHome.vue'
import MatchingMentorList from './components/Mentoring/Matching/MentorList.vue'
import MatchingMenteeList from './components/Mentoring/Matching/MenteesList.vue'
import Reporting from './components/Mentoring/Reporting.vue'
import Search from './components/Mentoring/Search.vue'
import EditProfile from './components/Profile/EditProfile.vue'
import Leaderboards from './components/Profile/Leaderboards.vue'
import Metrics from './components/Profile/Metrics.vue'
import ViewProfile from './components/Profile/ViewProfile.vue'
import SocialHome from './components/Social/SocialHome.vue'
import Feed from './components/Social/Feed.vue'
import Post from './components/Social/Post.vue'
import About from './components/About.vue'
import Contact from './components/Contact.vue'
import NotFound from './components/NotFound.vue'

Vue.use(VueRouter)
Vue.use(VueAxios, axios)
Vue.use(Vuelidate)
Vue.use(ElementUI, { locale })

// The Vue.config options below disable unwanted messages in the console.
Vue.config.devtools = false
Vue.config.productionTip = false

const routes = [
  {
    path: '/',
    name: 'root',
    component: UnknownHome
  },
  {
    path: '/register',
    name: 'register',
    component: BasicRegistration
  },
  {
    path: '/register-areas-of-interest',
    name: 'register-areas-of-interest',
    component: RegisterAreasOfInterest
  },
  {
    path: '/register-job-history',
    name: 'register-job-history',
    component: RegisterJobHistory
  },
  {
    path: '/register-education',
    name: 'register-education',
    component: RegisterEducation
  },
  {
    path: '/register-bio',
    name: 'register-bio',
    component: RegisterBio
  },
  {
    path: '/upload-profile-picture',
    name: 'upload-profile-picture',
    component: UploadProfilePicture
  },
  {
    path: '/mentor-preferences',
    name: 'mentor-preferences',
    component: MentorPreferences
  },
  {
    path: '/mentee-preferences',
    name: 'mentee-preferences',
    component: MenteePreferences
  },
  {
    path: '/login',
    name: 'login',
    component: Login
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
    component: PathsHome
  },
  {
    path: '/learn/paths/paths-sub-section',
    name: 'paths-sub-section',
    component: PathsSubSection
  },
  {
    path: '/mentoring/manage-relationships',
    name: 'manage-relationships',
    component: ManageRelationships
  },
  {
    path: '/mentoring/matching/home',
    name: 'matching-home',
    component: MatchingHome
  },
  {
    path: '/mentoring/matching/mentor-list',
    name: 'matching-mentor-list',
    component: MatchingMentorList
  },
  {
    path: '/mentoring/matching/mentee-list',
    name: 'matching-mentee-list',
    component: MatchingMenteeList
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
    path: '/social/home',
    name: 'social',
    component: SocialHome
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
