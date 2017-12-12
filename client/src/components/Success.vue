<template>
  <div class="container text-center">

    <!-- This short section is my current method of getting the current user name -->
    <input v-model="currentUserName" :hidden="true"> {{ $store.state.user.authUser.userName}}
    </input>

    <div class="row">
      Current user: {{ currentUserName }}
    </div>

    <div class="row">
      <h1> Hello {{ currentUserName }} welcome to Mentoid </h1>
    </div>
    <div class="row">
      <h1> Your interests: </h1>
      <ul v-for="hobby in currentUser.hobbyInputs" :key="hobby._id">
        <li>
          {{ hobby }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        users: [],
        currentUserName: '',
        currentUser: ''
      }
    },
    mounted: function () {
      this.fetchUsers(),
      this.getUser()
    },
    methods: {
      fetchUsers() {
        let uri = 'http://localhost:4000/users'
        this.axios.get(uri).then(response => {
          this.users = response.data
        })
      },
      getUser() {
        this.currentUser = this.users.filter(function (user) {
          console.log(user)
          if (user.userName == this.currentUserName) {
            return user
          } else {
            console.log("Could not find a user with that username")
          }
        })
      },
      navigateTo(route) {
        this.$router.push(route)
      }
    }
  }
</script>


<style scoped>


</style>
