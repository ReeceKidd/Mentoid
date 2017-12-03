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
          <img src="..\..\assets\logo.png" class="main-logo"
            height=42 width=250 />
        </a>
        <a href="/" class="navbar-left">
          <img src="..\..\assets\logo.png" class="mobile-logo"
            height=45 />
        </a>
      </div>

      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse" id="navbar-collapse">
        <ul class="nav navbar-nav navbar-right">
          <button class="btn menu-btn"><i class="fa fa-sign-in" aria-hidden="true"></i> Login</button>
          <button class="btn menu-btn"><i class="fa fa-user-plus" aria-hidden="true"></i> Register</button>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    navigateTo(route) {
      this.$router.push(route)
    }
  }
}
</script>


<style scoped>

</style>
