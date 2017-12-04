<template>

  <body>
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
          <a href='/' class="navbar-left">
            <img src="..\..\assets\logo.png" class="main-logo" height=50 width=250 />
          </a>
          <a href='/' class="navbar-left">
            <img src="..\..\assets\mobile-logo.png" class="mobile-logo" height=45 />
          </a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="navbar-collapse">
          <ul class="nav navbar-nav">
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Mentoring
                <span class="caret"></span>
              </a>
              <ul class="dropdown-menu">
                <li>
                  <a>Matching</a>
                </li>
                <li>
                  <a>Manage relationships</a>
                </li>
                <li>
                  <a>Search</a>
                </li>
                <li>
                  <a>Reporting</a>
                </li>
              </ul>
            </li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Learn
                <span class="caret"></span>
              </a>
              <ul class="dropdown-menu">
                <li>
                  <a>Paths</a>
                </li>
                <li>
                  <a>Content</a>
                </li>
                <li>
                  <a>Create</a>
                </li>
              </ul>
            </li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Social
                <span class="caret"></span>
              </a>
              <ul class="dropdown-menu">
                <li>
                  <a>Feed</a>
                </li>
                <li>
                  <a>Post</a>
                </li>
              </ul>
            </li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"> {{ $store.state.user.authUser.userName }}
                <span class="caret"></span>
              </a>
              <ul class="dropdown-menu">
                <li>
                  <a>Edit profile</a>
                </li>
                <li>
                  <a>View profile</a>
                </li>
                <li>
                  <a>Metrics</a>
                </li>
                <li>
                  <a>Leaderboards</a>
                </li>
              </ul>
            </li>
            <li>
              <a @click="logout">
                <i class="fa fa-sign-out" aria-hidden="true"></i>Logout</a>
            </li>
          </ul>
          <!-- /.navbar-collapse -->
        </div>
      </div>
      <!-- /.container-fluid -->
    </nav>
  </body>
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
