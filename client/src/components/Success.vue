<template>
  <div class="container">
    <div class="row text-center">
      <h1> Hello {{ currentUser.userName }} welcome to Mentoid </h1>
    </div>

    <div class="row text-center">
      <h3 id="interestsHeader"> Your interests </h3>
    </div>

    <br>

    <div class="row text-center">
      <div class="col-xs-4">
        <br>
      </div>
      <div class="col-xs-4">
        <table class="table table-hover">
          <thead>
            <tr>
              <td><h4><strong>Area of Interest</strong></h4></td>
              <td><h4><strong>Years of Experience</strong></h4></td>
            </tr>
          </thead>

          <tbody>
            <tr v-for="hobby in currentUser.hobbyInputs" :key="hobby._id">
              <td>{{ hobby.value }}</td>
              <td>{{ hobby.years }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-xs-4">
        <br>
      </div>
    </div>

      <br>

      <div class="row text-center">
        <h3> Find your Mentoring Partner </h3>
        <br>
        <button class="btn btn-primary btn-lg" @click="navigateTo({ name : 'matching-home'})"> Begin </button>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        currentUser: this.$store.state.user.authUser
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
#interestsHeader {
  text-decoration: underline;
  text-decoration: bold;
}

table, th, td {
   border: 1px solid black;
}

</style>
