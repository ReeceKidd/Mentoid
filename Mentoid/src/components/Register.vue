<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <div class="white elevation-2">
        <v-toolbar flat dense class="cyan" dark>
        </v-toolbar>
        <div class="pl-4 pr-2 pt-2 pb-2">
        <h1> Register </h1>
    <v-text-field
    name="Email"
    label="Email"
    v-model="email"/>
    </v-text-field>
    <br>
     <v-text-field
    name="Password"
    label="Password"
    v-model="password"/>
    </v-text-field>
    <br>
    <v-btn
    @click="register"> Register </v-btn>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async register () {
      const response = await AuthenticationService.register({
        email: this.email,
        password: this.password
      })
      console.log(response.data)
    }
  }
}
</script>


<style scoped>
</style>
