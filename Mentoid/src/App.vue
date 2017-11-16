<template>
  <div id="app">
    <v-app>
       <mentoid-header></mentoid-header>
      <main>
        <v-container fluid> 
          <router-view></router-view>
        </v-container>
      </main>
    </v-app> 
  </div>
</template>

<script>
import MentoidHeader from '@/components/Header.vue'
export default {
  name: 'app',
  components: {
    MentoidHeader
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.input-group-text-field input {
  border-bottom: solid black;
}

.btn_content {
  color: white;
}
</style>
