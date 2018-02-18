import Vue from 'vue'

import VueRouter from 'vue-router'

import VueAxios from 'vue-axios'
import axios from 'axios'
import Vuelidate from 'vuelidate'
import store from './store'

import '../theme/index.css'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'

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
import SocialMediaDetails from './components/Register/SocialMedia.vue'

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
    path: '/social-media-details',
    name: 'social-mendia-details',
    component: SocialMediaDetails
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
    path: '/content',
    name: 'content',
    component: Content
  },
  {
    path: '/create',
    name: 'create',
    component: Create
  },
  {
    path: '/paths',
    name: 'paths',
    component: PathsHome
  },
  {
    path: '/paths-sub-section',
    name: 'paths-sub-section',
    component: PathsSubSection
  },
  {
    path: '/manage-relationships',
    name: 'manage-relationships',
    component: ManageRelationships
  },
  {
    path: '/matching',
    name: 'matching',
    component: MatchingHome
  },
  {
    path: '/mentor-matching',
    name: 'matching-mentor-list',
    component: MatchingMentorList
  },
  {
    path: '/mentee-matching',
    name: 'matching-mentee-list',
    component: MatchingMenteeList
  },
  {
    path: '/mentoring-reporting',
    name: 'reporting',
    component: Reporting
  },
  {
    path: '/mentoring-search',
    name: 'search',
    component: Search
  },
  {
    path: '/edit-profile',
    name: 'edit-profile',
    component: EditProfile
  },
  {
    path: '/leaderboards',
    name: 'leaderboards',
    component: Leaderboards
  },
  {
    path: '/metrics',
    name: 'metrics',
    component: Metrics
  },
  {
    path: '/view-profile',
    name: 'view-profile',
    component: ViewProfile
  },
  {
    path: '/social-home',
    name: 'social',
    component: SocialHome
  },
  {
    path: '/social-feed',
    name: 'feed',
    component: Feed
  },
  {
    path: '/social-post',
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
  routes: routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
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
