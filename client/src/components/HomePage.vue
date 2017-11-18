<template>
  <div class="col-sm-6 col-sm-offset-3">
      <h1> Mentoid - A complete solution to mentoring! </h1>
      <button class="btn btn-primary" @click="navigateTo({ name : 'login'})"> Login </button>
      <button class="btn btn-primary" @click="navigateTo({ name : 'register'})"> Register </button>
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


