<template>
  <div class="container">

    <div class="row">
      <h1 class="text-center"> Potential Mentors </h1>
    </div>

    <div class="row text-center">
      <button class="btn btn-primary" @click="matchMentors()">Find Mentors</button>
    </div>

    <br>

    <div class="row" v-for="user in matchedMentors" :key="user._id">
      <div class="col-xs-6 col-xs-offset-3">
        <div class="jumbotron">
          <h3> {{ user.userName }}</h3>
          <table class="table table-hover">
            <thead>
              <tr>
                <td>
                  <h4>
                    <strong>Areas of Interest</strong>
                  </h4>
                </td>
                <td>
                  <h4>
                    <strong>Years of Experience</strong>
                  </h4>
                </td>
              </tr>
            </thead>

            <tbody>
              <tr v-for="hobby in user.hobbyInputs" :key="hobby._id">
                <td>{{ hobby.value }}</td>
                <td>{{ hobby.years }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        users: [],
        currentUser: this.$store.state.user.authUser,
        currentUserHobbies: this.$store.state.user.authUser.hobbyInputs,
        matchedMentors: ''
      }
    },
    created: function () {
      this.fetchUsers()
    },
    methods: {
      fetchUsers() {
        let uri = 'http://localhost:4000/users'
        this.axios.get(uri).then(response => {
          this.users = response.data
        })
      },
      matchMentors() {
        console.log('Attempting to match mentors')
        var potentialMentors = []
        console.log('Number of potential users ' + this.users.length)
        for (var i = 0; i < this.users.length; i++) {
          console.log('Current User: ' + this.users[i].userName)
          var thisUser = this.users[i]
          if (thisUser._id === this.currentUser._id) {
            continue
          }
          for (var j = 0; j < thisUser.hobbyInputs.length; j++) {
            var thisUserHobby = thisUser.hobbyInputs[j]
            for (var x = 0; x < this.currentUserHobbies.length; x++) {
              if (this.currentUserHobbies[x].value === thisUserHobby.value) {
                if (this.currentUserHobbies[x].years < thisUserHobby.years) {
                  potentialMentors.push(thisUser)
                }
              }
            }
          }
        }
        this.matchedMentors = potentialMentors
      }
    }
  }
</script>

<style>


</style>
