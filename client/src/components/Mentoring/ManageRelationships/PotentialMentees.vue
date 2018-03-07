<template>
  <div class="row">
    <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 displayBox">
      <div v-if="potentialMentees.length > 0" class="text-center">
        <a href="#currentMentees" data-toggle="collapse">
          <h2>
            <i class="fas fa-chevron-down"></i> Potential Mentees:
            <b class="successMessage">{{potentialMentees.length }}</b>
          </h2>
        </a>
        <span v-for="(potentialMentee, index) in potentialMentees" :key="index" class="text-center">
          <br>
          <img :src='getProfilePicture(potentialMentee._id)' class="profileImage">
          <h3> {{ potentialMentee.firstName + ' ' + potentialMentee.lastName }} </h3>
          <h4> @{{ potentialMentee.userName }} </h4>
          <button class="btn btn-primary btn-sm view-compatibility" @click="viewMenteeCompatibility()"> View Compatibility </button>
          <button class="btn btn-primary btn-sm" @click="message()"> Message </button>
          <br>
          <br>
          <button class="btn btn-success btn-lg" @click="acceptPotentialMentee(potentialMentee._id)">
            <i class="fas fa-check"></i>
          </button>
          <button class="btn btn-danger btn-lg" @click="deletePotentialMentee()">
            <i class="fas fa-times"></i>
          </button>
          <br>
          <br v-if="acceptedPotentialMenteeMessage !== null">
          <p v-if="acceptedPotentialMenteeMessage !== null" class="successMessage"> {{ acceptedPotentialMenteeMessage }} </p>
          <br v-if="acceptedPotentialMenteeErrorMessage !== null">
          <p v-if="acceptedPotentialMenteeErrorMessage !== null" class="errorMessage"> {{ acceptedPotentialMenteeErrorMessage }} </p>
          <br v-if="index !== potentialMentees.length-1">
            <hr v-if="index !== potentialMentees.length-1">
            <br v-if="index !== potentialMentees.length-1">
        </span>
      </div>
      <div v-else>
        <h2>
          Potential Mentees:
          <b class="errorMessage">0</b>
        </h2>
        <h4>
          <a href='edit-profile'> Update your profile to increase your chances.
            <i class="fas fa-cog"></i>
          </a>
        </h4>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  const getProfilePictureURL = 'http://localhost:4000/get/profile-picture/'
  export default {
    data() {
      return {
        currentUserID: this.$store.state.user.authUser._id,
        acceptedPotentialMenteeMessage: null,
        acceptedPotentialMenteeErrorMessage: null,
        potentialMentees: []
      }
    },
    methods: {
      getProfilePicture(mentorsID) {
        return getProfilePictureURL + mentorsID
      },
      acceptPotentialMentee(menteeID) {
        const acceptPotentialMenteeURL = 'http://localhost:4000/accept/potential-mentee'
        axios.post(acceptPotentialMenteeURL, {
          userID: this.currentUserID,
          menteeID: menteeID
        }).then(response => {
          this.acceptedPotentialMenteeMessage = response.data.message
          setTimeout(() => {
            this.acceptedPotentialMenteeMessage = null
          }, 3000)
        }).catch(error => {
          this.acceptedPotentialMenteeErrorMessage = error.response.data.message
          setTimeout(() => {
            this.errorMessage = null
          }, 3000)
        })
      }
    },
    beforeMount() {
      var self = this
      var userID = this.currentUserID
      // Get users social media details
      const getPotentialMenteesURL = 'http://localhost:4000/get/potential-mentees/'
      axios.get(getPotentialMenteesURL + userID).then(function (response) {
        self.potentialMentees = response.data.potentialMentees
      })
    }
  }
</script>

<style scoped>
  .infoMessage {
    position: absolute;
    top: 0px;
    right: 0px;
    padding-right: 10px;
    padding-left: 10px;
    background: #104E8B;
    color: white;
    font-size: 1.5rem;
  }

  .noMatchesMessage {
    position: absolute;
    top: 0px;
    right: 0px;
    padding-right: 10px;
    padding-left: 10px;
    background: #A80000;
    color: white;
    font-size: 1.5rem;
  }

  .profileImage {
    max-width: 200px;
    max-height: 200px;
    border-radius: 50%;
    padding: 1px;
    border: 1px solid #021a40;
  }

  .view-compatibility {
    background-color: purple;
  }

  .view-compatibility:hover {
    background-color: #333;
  }

  .successMessage {
    color: green;
  }

  .errorMessage {
    color: red;
  }

  .accordion-toggle:after {
    font-family: 'FontAwesome';
    content: "\f078";
    float: right;
  }

  .accordion-opened .accordion-toggle:after {
    content: "\f054";
  }

  hr {
    border: 0;
    border-top: 1px solid black;
  }

</style>
