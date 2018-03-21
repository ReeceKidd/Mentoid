<template>
  <div class="container fullPage">
    <div class="row text-right">
      <div class="col-xs-12 col-sm-12">
        <p>
          <a href='edit-profile#mentee-preferences'> Change your Mentee settings
            <i class="fas fa-cog"></i>
          </a>
        </p>
      </div>
    </div>

    <div v-if="potentialInPersonMentees !== null">
      <in-person-matches :mentees=potentialInPersonMentees></in-person-matches>
    </div>

    <div v-if="potentialOnlineMentees !== null">
      <online-matches :mentees=potentialOnlineMentees></online-matches>
    </div>

    <div v-if="potenetialOnlineAndInPersonMentees !== null">
      <online-and-in-person-matches :mentees=potenetialOnlineAndInPersonMentees></online-and-in-person-matches>
    </div>
  

  </div>

</template>
<script>
  import axios from 'axios'
  import InPersonMatches from './GetmenteesLists/InPerson.vue'
  import OnlineMatches from './GetmenteesLists/Online.vue'
  import OnlineAndInPersonMatches from './GetmenteesLists/OnlineAndInPerson.vue'
  export default {
    data() {
      return {
        currentUserID: this.$store.state.user.authUser._id,
        potentialInPersonMentees: null,
        potentialOnlineMentees: null,
        potenetialOnlineAndInPersonMentees: null
      }
    },
    methods: {
      matchmentees() {
        this.potentialInPersonMentees = null
        this.potentialOnlineMentees = null
        this.potenetialOnlineAndInPersonMentees = null
        var self = this
        console.log('Attempting to match mentees.')
        var getPotentialmenteesURL = 'http://localhost:4000/get/potential-mentees-list/' + this.currentUserID + '/' + this.userName +
          '/' + this.sortType
        axios.get(getPotentialmenteesURL)
          .then(response => {
            console.log(response)
            if (response.data.inPersonMentees) {
              console.log('Received in person mentees')
              self.potentialInPersonMentees = response.data.inPersonMentees
            } else if (response.data.onlineMentees) {
              console.log('Received online mentees')
              self.potentialOnlineMentees = response.data.onlineMentees
            } else if (response.data.onlineAndInPersonMentees) {
              console.log('Received online and in person mentees')
              self.potenetialOnlineAndInPersonMentees = response.data.onlineAndInPersonMentees
            }
          })
          .catch(errors => {
            console.log(errors)
          })
      }
    },
    beforeMount() {
      this.matchmentees()
    },
    components: {
      InPersonMatches,
      OnlineMatches,
      OnlineAndInPersonMatches
    }
  }
</script>
<style scoped>


</style>
