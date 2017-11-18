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
