<template>
   <div class="row">
      <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 displayBox">
        <div v-if="pastMentees.length > 0" class="text-center">
          <a href="#currentMentees" data-toggle="collapse">
            <h2>
              <i class="fas fa-chevron-down"></i> Past mentees:
              <b class="successMessage">{{pastMentees.length }}</b>
            </h2>
            <br>
          </a>
          <span v-for="(pastMentee, index) in pastMentees" :key="index" class="text-center">
            <img :src='getProfilePicture(pastMentee._id)' class="profileImage">
            <h3> {{ pastMentee.firstName + ' ' + pastMentee.lastName }} </h3>
            <h4> @{{ pastMentee.userName }} </h4>
            <button class="btn btn-primary btn-sm view-compatibility" @click="viewMenteeRelationship()"> View Relationship </button>
            <button class="btn btn-primary btn-sm" @click="message()"> Message </button>
            <button class="btn btn-danger btn-sm" @click="deleteRelationship()"><i class="fas fa-times"></i> Delete </button>
            <br v-if="index !== pastMentees.length-1">
            <hr v-if="index !== pastMentees.length-1">
            <br v-if="index !== pastMentees.length-1">
          </span>
          <br>
        </div>
        <div v-else>
          <h2>
            Past Mentees:
            <b class="errorMessage">0</b>
          </h2>
          <h4>
            You have no past mentees.
          </h4>
        </div>
        <br>
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
        pastMentees: [],
        deletedMenteeMessage: null,
        deletedMenteeErrorMessage: null
      }
    },
    methods: {
      getProfilePicture(menteeID) {
        return getProfilePictureURL + menteeID
      },
      deleteRelationship(menteeID) {
        const deleteMenteeURL = 'http://localhost:4000/delete-mentee'
        axios.post(deleteMenteeURL, {
          userID: this.currentUserID,
          menteeID: menteeID
        }).then(response => {
          this.deletedMenteeMessage = response.data.message
          setTimeout(() => {
            this.deletedMenteeMessage = null
          }, 3000)
        }).catch(error => {
          this.deletedMenteeErrorMessage = error.response.data.message
          setTimeout(() => {
            this.deletedMenteeMessage = null
          }, 3000)
        })
      }
    },
    beforeMount() {
      var self = this
      var userID = this.currentUserID
      // Get users social media details
      const getPastMenteesURL = 'http://localhost:4000/get/past-mentees/'
      axios.get(getPastMenteesURL + userID).then(function (response) {
        self.pastMentees = response.data.pastMentees
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
