<template>
  <div id="app">
       <mentoid-header></mentoid-header>
       <br>
      <main>
          <router-view></router-view>
      </main>
      <mentoid-footer></mentoid-footer>
  </div>
</template>

<script>
import MentoidHeader from './components/structure/UnknownUserHeader.vue'
import MentoidFooter from './components/structure/Footer.vue'
export default {
  name: 'app',
  components: {
    MentoidHeader,
    MentoidFooter
  }
}
</script>

<style>
</style>
