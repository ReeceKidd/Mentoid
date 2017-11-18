<template>
<v-toolbar fixed class="blue" dark>
    <v-toolbar-title class="mr-4">
        <span
        class="logo"
        @click="navigateTo({name: 'root'})">
        Mentoid
        </span>
    </v-toolbar-title>
    <v-toolbar-items>
        <v-btn flat dark>
            Browse
        </v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items>
            <v-btn flat dark
            @click="navigateTo({name: 'login'})">
             <v-icon left dark>supervisor_account</v-icon>
                Login
            </v-btn>
    </v-toolbar-items>
    <v-toolbar-items>
            <v-btn flat dark
            @click="navigateTo({name: 'register'})">
                Sign Up
            </v-btn>
    </v-toolbar-items>
</v-toolbar>

</template>

<script>
export default {
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  }
}
</script>


<style scoped>
</style>
