<template>
  <div class="col-sm-6 col-sm-offset-3">
      <h1> You have logged in successfully </h1>
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