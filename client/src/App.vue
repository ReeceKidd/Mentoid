<template>
  <div id="app">
       <mentoid-header></mentoid-header>
      <main>
          <router-view></router-view>
      </main>
  </div>
</template>

<script>
import MentoidHeader from './components/Header.vue'
export default {
  name: 'app',
  components: {
    MentoidHeader
  }
}
</script>

<style>
#app {
  text-align: center;
}
</style>
