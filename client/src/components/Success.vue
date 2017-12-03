<template>
    <div class="container text-center">
      <h1> {{ $store.state.user.authUser.userName }} You have logged in successfully </h1>
    </div>
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