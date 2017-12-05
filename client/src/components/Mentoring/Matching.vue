<template>
  <div class="container">

    <div class="row">
      <h1 class="text-center"> Compatibility Checker </h1>
    </div>

    <br>

    <div class="row">
      <div class="col-xs-4 col-xs-offset-1">
        <!-- This is the first dropdown of users -->
        <div class="dropdown">
          <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true"
            aria-expanded="true">
            User List One
            <span class="caret"></span>
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
            <ul v-for="user in users" :key="user._id">
              <li>
                <a @click="user1=user"> {{ user.userName }}</a>
              </li>
            </ul>
          </ul>
        </div>
        <br>
        <h4> Selected User #1: {{ user1.userName }} </h4>
      </div>
      <div class="col-xs-4 col-xs-offset-1">
        <!-- This is the first dropdown of users -->
        <div class="dropdown center">
          <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true"
            aria-expanded="true">
            User List Two
            <span class="caret"></span>
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
            <ul v-for="user in users" :key="user._id">
              <li>
                <a @click="user2=user"> {{ user.userName }}</a>
              </li>
            </ul>
          </ul>
        </div>
        <br>
        <h4> Selected User #2: {{ user2.userName }} </h4>
      </div>
    </div>

    <br> 

     <div class="row text-center">
      <button class="btn btn-primary btn-lg" @click="euclideanSimilarity()"> Submit </button>
    </div>


    <div class="row">
      <h1 class="text-center"> List of registered users</h1>
    </div>


    <div class="row" v-for="user in users" :key="user._id">
      <h4 class="text-center"> {{ user.userName }}</h4>
    </div>

  </div>


</template>

<script>
  export default {
    data() {
      return {
        users: [],
        user1: '',
        user2: '',
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
      euclideanSimilarity() {
          console.log(this.user1.userName, this.user2.userName)
      }
    }
  }

</script>

<style>


</style>
