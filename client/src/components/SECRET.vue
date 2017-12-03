<template>
  <div>
    
    <h1>SECRET PAGE</h1>
    <h1>{{ secret }} </h1>
    {{ $store.state.user.authUser }}
    <button @click="logout" v-if="$store.state.user.authUser">LOGOUT</button>
    <h3 v-else>You're not logged in</h3>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      secret: null
    }
  },
  created: function() {
    this.fetchSecret()
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    },
    fetchSecret() {
      // to access secret routes on the server you need to make a
      // request with an authorization header, it is saved in local storage when a user logs in
      const url = 'http://localhost:4000'

      axios({
        url: `/users/secret`,
        baseURL: url,
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + window.localStorage.getItem('mentoid')
        }
      })
        .then(response => {
          console.log(response)
          this.secret = response.data.message
        })
        .catch(error => {
          console.log(error)
          this.secret = 'Invalid secret'
        })
    }
  }
}
</script>