<template>

  <body>

    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container-fluid">
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
              <a href="#" v-if="profileImageLoaded" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                <img :src="profilePictureURL" id="profilePictureURL" @error="imageLoadError">
                <span class="caret"></span>
              </a>
              <a href="#" v-else class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                {{ $store.state.user.authUser.userName }}
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
                  <a @click="navigateTo({ name : 'settings'})"> <i class="fas fa-cog"></i> Settings</a>
                </li>
              </ul>
            </li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-globe" id="globe"></i> 
                <span class="caret"></span>
              </a>
              <ul class="dropdown-menu dropdown-menu-right">
                <li>
                  <a>English</a>
                </li>
                <li>
                  <a>German</a>
                </li>
                <li>
                  <a>Spanish</a>
                </li>
              </ul>
            </li>
            <li>
              <a @click="logout">
                <i class="fas fa-sign-out-alt" aria-hidden="true"></i>Logout</a>
            </li>
          </ul>
          <!-- /.navbar-collapse -->
        </div>
      </div>
    </nav>
  </body>
</template>

<script>
  const getProfilePictureURL = 'http://localhost:4000/get/profile-picture/'

  export default {
    data() {
      return {
        profilePictureURL: getProfilePictureURL + this.$store.state.user.authUser._id,
        profileImageLoaded: true
      }
    },
    methods: {
      navigateTo(route) {
        this.$router.push(route)
      },
      logout() {
        this.$store
          .dispatch('logout', {
            _id: this._id
          })
          .catch(e => {
            this.errorMessage = e.message
          })
      },
      imageLoadError() {
        this.profileImageLoaded = false
        console.log('User does not have a profile picture')
      }
    }
  }
</script>

<style scoped>
  #profilePictureURL {
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }

  #globe {
    font-size: 21px;
  }

  .dropdown-menu-right {
    text-align: right;
  }

</style>
