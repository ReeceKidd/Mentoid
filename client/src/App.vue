<template>
  <div id="app">
       <authenticated-header v-if="$store.state.user.authUser"></authenticated-header>
       <mentoid-header v-else></mentoid-header>
       <br>
      <main class="main">
          <router-view></router-view>
      </main>
      <mentoid-footer></mentoid-footer>
  </div>
</template>

<script>

import MentoidHeader from './components/structure/UnknownUserHeader.vue'
import AuthenticatedHeader from './components/structure/LoggedInUser.vue'
import MentoidFooter from './components/structure/Footer.vue'

export default {
  name: 'app',
  components: {
    AuthenticatedHeader,
    MentoidHeader,
    MentoidFooter
  }
}
</script>

<style>
.main {
  padding-top: 5%;
  padding-bottom: 5%;
 
}
</style>
