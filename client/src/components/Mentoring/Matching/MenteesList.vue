<template>
  <div class="container">

    <div class="row">
      <h1 class="text-center"> Potential Mentees </h1>
    </div>

    <div class="row text-center">
      <button class="btn btn-primary" @click="matchMentees()">Find Mentees</button>
    </div>

    <br>

    <div class="row" v-for="user in matchedMentees" :key="user._id">
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
        matchedMentees: ''
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
      matchMentees() {
        console.log('Attempting to match mentees')
        var potentialMentees = []
        console.log('Number of potential users ' + this.users.length)
        for (var i = 0; i < this.users.length; i++) {
          console.log('Current User: ' + this.users[i].userName)
          var thisUser = this.users[i]
          if (thisUser._id === this.currentUser._id) {
            console.log('Current user: ' + this.currentUser.userName + ' and this user ' + thisUser.userName + ' are the same --excluding')
            continue
          }
          for (var j = 0; j < thisUser.hobbyInputs.length; j++) {
            var thisUserHobby = thisUser.hobbyInputs[j]
            for (var x = 0; x < this.currentUserHobbies.length; x++) {
              if (this.currentUserHobbies[x].value === thisUserHobby.value) {
                console.log('User: ' + this.currentUser.userName + ' and User: ' + thisUser.userName + ' share the same hobbies ' + this.currentUserHobbies[x].value + ' ' + thisUserHobby.value)
                console.log('Experience: ' + this.currentUserHobbies[x].years + ' vs ' + thisUserHobby.years)
                if (this.currentUserHobbies[x].years > thisUserHobby.years) {
                  potentialMentees.push(thisUser)
                } else {
                  continue
                }
              }
            }
          }
        }
        this.matchedMentees = potentialMentees
      }
    }
  }
</script>

<style>


</style>
