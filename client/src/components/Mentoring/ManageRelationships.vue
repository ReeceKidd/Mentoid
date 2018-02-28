<template>
  <div class="container">
    <div class="row text-center">
      <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2">
        <br>
        <h1> Manage Mentoring Relationships </h1>
        <br>
      </div>
    </div>

    <mentors></mentors>
    <br>
    <mentees></mentees>
    <br>
    <potential-mentors></potential-mentors>
    <br>
    <potential-mentees></potential-mentees>
    <br>
    <past-mentors></past-mentors>
    <br>
    <past-mentees></past-mentees>


  </div>
</template>
<script>
  import Mentees from './ManageRelationships/Mentees'
  import Mentors from './ManageRelationships/Mentors'
  import PastMentees from './ManageRelationships/PastMentees'
  import PastMentors from './ManageRelationships/PastMentors'
  import PotentialMentees from './ManageRelationships/PotentialMentees'
  import PotentialMentors from './ManageRelationships/PotentialMentors'
  export default {
    components: {
      Mentees,
      Mentors,
      PastMentees,
      PastMentors,
      PotentialMentees,
      PotentialMentors
    }
  }
</script>

<style scoped>
</style>
