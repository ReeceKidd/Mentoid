<template>

  <body>
    <div class="container-fluid">
    <nav class="navbar navbar-default navbar-fixed-top">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a @click="navigateTo({ name : 'success'})" class="navbar-left">
            <img src="..\..\assets\logo.png" class="main-logo" height=50 width=250 />
          </a>
          <a @click="navigateTo({ name : 'success'})" class="navbar-left">
            <img src="..\..\assets\mobile-logo.png" class="mobile-logo" />
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
                  <a @click="navigateTo({ name : 'matching-home'})">Matching</a> 
                </li>
                <li>
                  <a @click="navigateTo({ name : 'manage-relationships'})">Manage relationships</a>
                </li>
                <li>
                  <a @click="navigateTo({ name : 'search'})">Search</a>
                </li>
                <li>
                  <a @click="navigateTo({ name : 'reporting'})">Reporting</a>
                </li>
              </ul>
            </li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Learn
                <span class="caret"></span>
              </a>
              <ul class="dropdown-menu">
                <li>
                  <a @click="navigateTo({ name : 'paths'})">Paths</a>
                </li>
                <li>
                  <a @click="navigateTo({ name : 'content'})">Content</a>
                </li>
                <li>
                  <a @click="navigateTo({ name : 'create'})">Create</a>
                </li>
              </ul>
            </li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Social
                <span class="caret"></span>
              </a>
              <ul class="dropdown-menu">
                <li>
                  <a @click="navigateTo({ name : 'feed'})">Feed</a>
                </li>
                <li>
                  <a @click="navigateTo({ name : 'post'})">Post</a>
                </li>
              </ul>
            </li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"> {{ $store.state.user.authUser.userName }}
                <span class="caret"></span>
              </a>
              <ul class="dropdown-menu">
                <li>
                  <a @click="navigateTo({ name : 'edit-profile'})">Edit profile</a>
                </li>
                <li>
                  <a @click="navigateTo({ name : 'view-profile'})">View profile</a>
                </li>
                <li>
                  <a @click="navigateTo({ name : 'metrics'})">Metrics</a>
                </li>
                <li>
                  <a @click="navigateTo({ name : 'leaderboards'})">Leaderboards</a>
                </li>
              </ul>
            </li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li>
              <a @click="logout">
                <i class="fa fa-sign-out" aria-hidden="true"></i>Logout</a>
            </li>
          </ul>
          <!-- /.navbar-collapse -->
        </div>
    </nav>
    </div>
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
