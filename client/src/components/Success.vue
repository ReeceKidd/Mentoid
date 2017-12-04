<template>
    <div class="container text-center">
      <h1> Hello {{ $store.state.user.authUser.userName }} welcome to Mentoid </h1>
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