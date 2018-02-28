<template>
  <div class="container">
    <div class="row text-center">
      <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2">
        <br>
        <h1> Manage Mentoring Relationships </h1>
        <br>
      </div>
    </div>

    <!-- Current Mentors -->
    <div class="row">
      <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2">
        <div v-if="mentors.length > 0">
          <a href="#currentMentors" data-toggle="collapse">
            <h2>
              <i class="fas fa-chevron-down"></i> Current Mentors:
              <b class="successMessage">{{mentors.length }}</b>
            </h2>
          </a>
          <div id="currentMentors" v-if="mentors.length > 0" class="text-center collapse displayBox">
            <span v-for="(mentor, index) in mentors" :key="index">
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
              <br v-if="acceptedPotentialMenteeMessage !== null">
              <p v-if="acceptedPotentialMenteeMessage !== null" class="successMessage"> {{ acceptedPotentialMenteeMessage }} </p>
              <br v-if="acceptedPotentialMenteeErrorMessage !== null">
              <p v-if="acceptedPotentialMenteeErrorMessage !== null" class="errorMessage"> {{ acceptedPotentialMenteeErrorMessage }} </p>
              <hr>
              <br>
            </span>
          </div>
        </div>
        <div v-else>
          <h2>
            Current Mentors:
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

    <!-- Current Mentees -->
    <br>
    <div class="row">
      <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 outerDisplayBox">
        <div v-if="mentees.length > 0">
          <a href="#currentMentees" data-toggle="collapse">
            <h2>
              <i class="fas fa-chevron-down"></i> Current Mentees:
              <b class="successMessage">{{mentees.length }}</b>
            </h2>
          </a>
          <div id="currentMentees" v-if="mentees.length > 0" class="text-center collapse displayBox">
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
              <br v-if="acceptedPotentialMenteeMessage !== null">
              <p v-if="acceptedPotentialMenteeMessage !== null" class="successMessage"> {{ acceptedPotentialMenteeMessage }} </p>
              <br v-if="acceptedPotentialMenteeErrorMessage !== null">
              <p v-if="acceptedPotentialMenteeErrorMessage !== null" class="errorMessage"> {{ acceptedPotentialMenteeErrorMessage }} </p>
              <hr>
              <br>
            </span>
            <br>
          </div>
        </div>
        <div v-else>
          <h2>
            Current Mentees:
            <b class="errorMessage">0</b>
          </h2>
          <h4>
            <a href='edit-profile#mentee-settings'> Update your profile to increase your chances.
              <i class="fas fa-cog"></i>
            </a>
          </h4>
        </div>
      </div>
    </div>

    <!-- Potential Mentors section -->
    <br>
    <div class="row">
      <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 outerDisplayBox">
        <div v-if="potentialMentors.length > 0">
          <a href="#currentPotentialMentors" data-toggle="collapse">
            <h2>
              <i class="fas fa-chevron-down"></i> Potential Mentors:
              <b class="successMessage">{{potentialMentors.length }}</b>
            </h2>
          </a>
          <div id="currentPotentialMentors" v-if="potentialMentors.length > 0" class="text-center collapse displayBox">
            <span v-for="(potentialMentor, index) in potentialMentors" :key="index">
              <br>
              <img :src='getProfilePicture(potentialMentor._id)' class="profileImage">
              <h3> {{ potentialMentor.firstName + ' ' + potentialMentor.lastName }} </h3>
              <h4> @{{ potentialMentor.userName }} </h4>
              <button class="btn btn-primary btn-sm view-compatibility" @click="viewMentorCompatibility()"> View Compatibility </button>
              <button class="btn btn-primary btn-sm" @click="message()"> Message </button>
              <br>
              <br>
              <button class="btn btn-success btn-lg" @click="acceptPotentialMentor(potentialMentor._id)">
                <i class="fas fa-check"></i>
              </button>
              <button class="btn btn-danger btn-lg" @click="deletePotentialMentor()">
                <i class="fas fa-times"></i>
              </button>
              <br>
              <br v-if="acceptedPotentialMentorMessage !== null">
              <p v-if="acceptedPotentialMentorMessage !== null" class="successMessage"> {{ acceptedPotentialMentorMessage }} </p>
              <br v-if="acceptedPotentialMentorErrorMessage !== null">
              <p v-if="acceptedPotentialMentorErrorMessage !== null" class="errorMessage"> {{ acceptedPotentialMentorErrorMessage }} </p>
            </span>
            <br>
          </div>
        </div>
        <div v-else>
          <h2>
            Potential Mentors:
            <b class="errorMessage">0</b>
          </h2>
          <h4>
            <a href='edit-profile#mentee-settings'> Update your profile to increase your chances.
              <i class="fas fa-cog"></i>
            </a>
          </h4>
        </div>
      </div>
    </div>
    <br>

    <!-- Potential mentees -->
    <div class="row">
      <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2">
        <div v-if="potentialMentees.length > 0">
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
          </span>
          <br>
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
        <br>
      </div>
    </div>

    <!-- Past Mentors -->
    <div class="row">
      <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2">
        <div v-if="pastMentors.length > 0">
          <a href="#currentMentees" data-toggle="collapse">
            <h2>
              <i class="fas fa-chevron-down"></i> Past mentors:
              <b class="successMessage">{{pastMentors.length }}</b>
            </h2>
          </a>
          <span v-for="(pastMentor, index) in pastMentors" :key="index" class="text-center">
            <br>
            <img :src='getProfilePicture(pastMentor._id)' class="profileImage">
            <h3> {{ pastMentor.firstName + ' ' + pastMentor.lastName }} </h3>
            <h4> @{{ pastMentor.userName }} </h4>
            <button class="btn btn-primary btn-sm view-compatibility" @click="viewMenteeCompatibility()"> View Compatibility </button>
            <button class="btn btn-primary btn-sm" @click="message()"> Message </button>
            <br>
            <br>
            <button class="btn btn-success btn-lg" @click="acceptPotentialMentee(pastMentor._id)">
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
          </span>
          <br>
        </div>

        <div v-else>
          <h2>
            Past Mentors:
            <b class="errorMessage">0</b>
          </h2>
          <h4>
            You have never had a mentor.
          </h4>
        </div>
        <br>
      </div>
    </div>

    <!-- Past Mentees -->
    <div class="row">
      <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2">
        <div v-if="pastMentees.length > 0">
          <a href="#currentMentees" data-toggle="collapse">
            <h2>
              <i class="fas fa-chevron-down"></i> Past mentees:
              <b class="successMessage">{{pastMentees.length }}</b>
            </h2>
          </a>
          <span v-for="(pastMentee, index) in pastMentees" :key="index" class="text-center">
            <br>
            <img :src='getProfilePicture(pastMentee._id)' class="profileImage">
            <h3> {{ pastMentee.firstName + ' ' + pastMentee.lastName }} </h3>
            <h4> @{{ pastMentee.userName }} </h4>
            <button class="btn btn-primary btn-sm view-compatibility" @click="viewMenteeCompatibility()"> View Compatibility </button>
            <button class="btn btn-primary btn-sm" @click="message()"> Message </button>
            <br>
            <br>
            <button class="btn btn-success btn-lg" @click="acceptPotentialMentee(pastMentor._id)">
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
          </span>
          <br>
        </div>

        <div v-else>
          <h2>
            Past Mentees:
            <b class="errorMessage">0</b>
          </h2>
          <h4>
            You have never had a mentee.
          </h4>
        </div>
        <br>
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
        mentees: [],
        mentors: [],
        potentialMentors: [],
        potentialMentees: [],
        pastMentees: [],
        pastMentors: []
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
      },
      deletePotentialMentee(menteeID) {

      }
    },
    beforeMount() {
      var self = this
      var userID = this.currentUserID
      // Get users social media details
      const getManageRelationshipDetailsURL = 'http://localhost:4000/get/manage-relationships/'
      axios.get(getManageRelationshipDetailsURL + userID).then(function (response) {
        console.log(response.data)
        self.mentees = response.data.mentees
        self.mentors = response.data.mentors
        self.potentialMentees = response.data.potentialMentees
        self.potentialMentors = response.data.potentialMentors
        self.pastMentees = response.data.pastMentees
        self.pastMentors = response.data.pastMentors
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
