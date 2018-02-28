<template>
  <!-- Current Mentors -->
  <div class="row">
    <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 displayBox">
      <div v-if="mentees.length > 0">
        <a href="#currentMentors" data-toggle="collapse">
          <h2>
            <i class="fas fa-chevron-down"></i> Current Mentees:
            <b class="successMessage">{{mentees.length }}</b>
          </h2>
        </a>
        <div id="currentMentors" v-if="mentees.length > 0" class="text-center collapse">
          <span v-for="(mentee, index) in mentees" :key="index">
            <br v-if="index === 0">
            <img :src='getProfilePicture(mentee._id)' class="profileImage">
            <h3> {{ mentee.firstName + ' ' + mentee.lastName }} </h3>
            <h4> @{{ mentee.userName }} </h4>
            <button class="btn btn-primary btn-md view-compatibility" @click="viewMenteeRelationship()"> View Relationship </button>
            <button class="btn btn-success btn-md" @click="viewMenteeProfile()"> View Profile </button>
            <button class="btn btn-primary btn-md" @click="message()"> Message </button>
            <br>
            <br>
            <button class="btn btn-danger btn-sm" @click="deleteMentee()">
              <i class="fas fa-times"></i> End relationship
            </button>
            <br>
            <hr>
            <br>
          </span>
        </div>
      </div>
      <div v-else>
        <h2>
          Current Mentees:
          <b class="errorMessage">0</b>
        </h2>
        <h4>
          <a href='edit-profile#mentee-settings'> Update your profile to increase your chances
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
        mentees: []
      }
    },
    methods: {
      getProfilePicture(mentorsID) {
        return getProfilePictureURL + mentorsID
      }
    },
    beforeMount() {
      var self = this
      var userID = this.currentUserID
      // Get users social media details
      const getMenteesURL = 'http://localhost:4000/get/mentees/'
      axios.get(getMenteesURL + userID).then(function (response) {
        self.mentees = response.data.mentees
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
