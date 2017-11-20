<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar2">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
      </div>
      <div id="navbar" class="navbar-collapse collapse">
        <ul class="nav navbar-nav navbar-right">
           <button type="button" class="btn btn-primary btn-lg" @click="navigateTo({ name : 'login'})"> Login </button>
           <button type="button" class="btn btn-primary btn-lg" @click="navigateTo({ name : 'register'})"> Register </button>
        </ul>
      </div>
    </div>
  </nav>
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
