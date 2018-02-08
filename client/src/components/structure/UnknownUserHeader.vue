<template>
  <nav class="navbar navbar-default navbar-fixed-top">
    <div class="container">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a href="/" class="navbar-left">
          <img src="..\..\assets\logo.png" class="main-logo" height=50 width=250 />
        </a>
        <a href="/" class="navbar-left">
          <img src="..\..\assets\mobile-logo.png" class="mobile-logo" height=45 />
        </a>
      </div>


      <!-- Collect the nav links, forms, and other content for toggling -->

      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse" id="navbar-collapse">
        <ul class="nav navbar-nav navbar-right">
          <li>
            <a @click="navigateTo({ name : 'login'})">
              <i class="fas fa-sign-in-alt" aria-hidden="true"></i> Login</a>
          </li>
          <li>
            <a @click="navigateTo({ name : 'register'})">
              <i class="fas fa-user-plus" aria-hidden="true"></i> Register</a>
          </li>
          <!-- /.navbar-collapse -->
        </ul>
      </div>
    </div>
    <!-- /.container-fluid -->
  </nav>
</template>

<script>
  export default {
    data() {
      return {
        userLoggedIn: null
      }
    },
    methods: {
      navigateTo(route) {
        this.$router.push(route)
      }
    }
  }
</script>

<style scoped>


</style>
