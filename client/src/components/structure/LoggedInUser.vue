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
        <ul class="nav navbar-nav">
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                Hi {{ $store.state.user.authUser.userName }}
                <span class="caret"></span>
              </a>
              <ul class="dropdown-menu">
                <li>
                  <a @click="logout">Logout</a>
                </li>
              </ul>
            </li>
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
    },
    logout() {
      this.$store.dispatch('logout')
    }
  }
}
</script>


<style scoped>

</style>
