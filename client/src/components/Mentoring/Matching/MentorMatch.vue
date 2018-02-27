<template>
  <div class="container">
    <div class="row">
      <div class="text-center">
        <button class="btn btn-primary btn-md sticky">Message</button>
      </div>
      <button class="btn btn-success btn-md sticky">Apply for Mentorship</button>
      <br>
      <br>
      <h1 class="text-center">Potential Mentor</h1>
      <br>
      <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 displayBox">
        <br>
        <img :src="profilePictureURL" class="img-responsive uploadImage center-block" v-if="hasProfilePicture">
        <img :src="imageSrc" class="img-responsive uploadImage center-block" v-else>
        <h2 class="text-center">{{ firstName + ' ' + lastName}}</h2>
        <h4 class="text-center">@{{userName}}</h4>
        <br>
      </div>
    </div>
    <br>
    <div class="row text-center">
      <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 displayBox">
        <p class="infoMessage"> Number of shared interests: {{ sharedNumberOfSharedInterests}} </p>
        <br>
        <h2> Mentoring Areas of Interest </h2>
        <div v-if="hasMoreExperienceIn !== null">
          <span v-for="(areaOfInterest, index) in hasMoreExperienceIn" :key="index">
            <p class="areaOfInterest"> {{ areaOfInterest.value }} | {{ areaOfInterest.yearsOfExperience }} </p>
          </span>
        </div>
        <div v-if="hasLessExperienceIn.length !== 0 && hasSameExperienceIn.length !== 0">
          <h3>
            <u> Shared Interests </u>
          </h3>
          <span v-if="hasSameExperienceIn.length !== 0" v-for="(areaOfInterest, index) in hasSameExperienceIn" :key="index">
            <p class="areaOfInterest"> {{ areaOfInterest.value }} | {{ areaOfInterest.yearsOfExperience }} </p>
          </span>
          <span v-if="hasLessExperienceIn.length !== 0" v-for="(areaOfInterest, index) in mentor.hasLessExperienceIn" :key="index">
            <p class="areaOfInterest"> {{ areaOfInterest.value }} | {{ areaOfInterest.yearsOfExperience }} </p>
          </span>
        </div>
        <div>
          <h3>
            <u>Other Areas Of Interest</u>
          </h3>
          <br>
          <span v-if="areasOfInterest.length !== 0" v-for="(areaOfInterest, index) in areasOfInterest" :key="index">
            <p class="otherInterest"> {{ areaOfInterest.value }} | {{ areaOfInterest.years }} </p>,
          </span>
          <br>
          <br>
        </div>
      </div>
      <br>
    </div>
    <br>
    <div class="row text-center" v-if="education.length !== null">
      <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 displayBox">
        <br>
        <h2> Compatibility </h2>
        <h3> Number of education matches: {{ numberOfEducationMatches }} </h3>
        <h3> Distance compatibility </h3>
        <h3> Language matches </h3>
        <h3> Age match </h3>
      </div>
    </div>
    <br>
    <div class="row text-center" v-if="education.length !== null">
      <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 displayBox">
        <br>
        <h2> Mentoring Format Information </h2>
        <p> Preffered format </p>
      </div>
    </div>
    <br>
    <div class="row text-center" v-if="education.length !== null">
      <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 displayBox">
        <p class="infoMessage"> Number of education matches: {{ numberOfEducationMatches}} </p>
        <br>
        <h2> Mentors Education </h2>
        <span v-for="(degree, index) in education" :key="index">
          <h4 v-if="degree.isMatch === true"> {{ index + 1 }}
            <i class="fas fa-check match"></i>
          </h4>
          <h4 v-else> {{ index + 1 }}
            <i class="fas fa-times notAMatch"></i>
          </h4>
          <h4>{{ degree.school }}</h4>
          <h5> {{ degree.country }}</h5>
          <h4>{{ degree.degree }}</h4>
          <h4>
            <b>{{ degree.fieldOfStudy }}</b>
          </h4>
          <h5>Start year: {{ degree.startYear }} </h5>
          <h5>End year: {{ degree.endYear }} </h5>
          <hr>
        </span>
      </div>
    </div>
    <br>
    <div class="row text-center" v-if="education.length !== null">
      <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 displayBox">
        <br>
        <h2> Mentors Job History </h2>
        <span v-for="(experience, index) in jobHistory" :key="index">
          <h4>
            <i> {{ index + 1 }} </i>
          </h4>
          <h4>
            <b>{{ experience.title }}</b>
          </h4>
          <h5>
            <i>{{ experience.company }}</i>
          </h5>
          <h5>Start Year: {{ experience.startYear }}</h5>
          <h5 v-if="experience.isWorkingHere === 'Yes'">
            Currently working here
          </h5>
          <h5 v-else>
            End Year: {{ experience.endYear }}
          </h5>
          <hr>
        </span>
      </div>
    </div>
    <br>
    <div class="row text-center">
      <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 displayBox">
        <br>
        <h2> Social Media </h2>
        <a>
          <p v-if="facebook !== null">
            <i class="fab fa-facebook-f"></i>: {{ facebook}} </p>
        </a>
        <a>
          <p v-if="instagram !== null">
            <i class="fab fa-instagram"></i>: {{ instagram}} </p>
        </a>
        <a>
          <p v-if="twitter !== null">
            <i class="fab fa-twitter"></i>: {{ twitter }} </p>
        </a>
        <a>
          <p v-if="snapchat !== null">
            <i class="fab fa-snapchat"></i>: {{ snapchat }} </p>
        </a>
        <a>
          <p v-if="linkedin !== null">
            <i class="fab fa-linkedin-in"></i>: {{linkedIn}}</p>
        </a>
        <a>
          <p v-if="medium !== null">
            <i class="fab fa-medium"></i>: {{medium}}</p>
        </a>
        <a>
          <p v-if="youtube !== null">
            <i class="fab fa-youtube"></i>: {{youtube}}</p>
        </a>
        <a>
          <p v-if="website !== null">
            <i class="fas fa-globe"></i>: {{website}}</p>
        </a>
        <br>
      </div>
    </div>
    <br>
  </div>
</template>

<script>
  const userAvater = require('../../../assets/userAvatar.png')
  const getProfilePictureURL = 'http://localhost:4000/get/profile-picture/'

  export default {
    props: ['mentor'],
    data() {
      return {
        profilePictureURL: getProfilePictureURL + this.mentor._id,
        imageSrc: userAvater,
        age: this.mentor.age,
        areasOfInterest: this.mentor.areasOfInterest,
        areasOfInterestRegistrationComplete: this.mentor.areasOfInterestRegistrationComplete,
        basicRegistrationComplete: this.mentor.basicRegistrationComplete,
        distanceKM: this.mentor.distanceKM,
        education: this.mentor.education,
        educationMatches: this.mentor.educationMatches,
        email: this.mentor.email,
        facebook: this.mentor.facebook,
        firstName: this.mentor.firstName,
        hasLessExperienceIn: this.mentor.hasLessExperienceIn,
        hasMoreExperienceIn: this.mentor.hasMoreExperienceIn,
        hasProfilePicture: this.mentor.hasProfilePicture,
        hasSameExperienceIn: this.mentor.hasSameExperienceIn,
        instagram: this.mentor.instagram,
        isCurrentUserTooOld: this.mentor.isCurrentUserTooOld,
        isCurrentUserTooYoung: this.mentor.isCurrentUserTooYoung,
        isMentorTooOld: this.mentor.isMentorTooOld,
        isMentorTooYoung: this.mentor.isMentorTooYoung,
        isUserLoggedIn: this.mentor.isUserLoggedIn,
        isWithinUsersRange: this.mentor.isWithinUsersRange,
        jobHistory: this.mentor.jobHistory,
        language: this.mentor.language,
        languageMatches: this.mentor.languageMatches,
        lastName: this.mentor.lastName,
        linkedIn: this.mentor.linkedIn,
        location: this.mentor.location,
        medium: this.mentor.medium,
        menteeSettings: this.mentor.menteeSettings,
        mentees: this.mentor.mentees,
        mentorSettings: this.mentor.mentorSettings,
        mentorSettingsComplete: this.mentor.mentorSettingsComplete,
        mentors: this.mentor.mentors,
        numberOfEducationMatches: this.mentor.numberOfEducationMatches,
        sharedNumberOfSharedInterests: this.mentor.sharedNumberOfSharedInterests,
        snapchat: this.mentor.snapchat,
        socialMediaComplete: this.mentor.socialMediaComplete,
        twitter: this.mentor.twitter,
        userIsWithinMentorsRange: this.mentor.userIsWithinMentorsRange,
        userName: this.mentor.userName,
        website: this.mentor.website,
        youtube: this.mentor.youtube
      }
    }
  }
</script>

<style scoped>
  .uploadImage {
    max-width: 200px;
    max-height: 200px;
    border-radius: 50%;
    padding: 1px;
    border: 1px solid #021a40;
  }

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

  .errorMessage {
    color: red;
  }

  .match {
    color: green;
  }

  .notAMatch {
    color: red;
  }

  .sticky {
    position: fixed;
    /* Fixed/sticky position */
    z-index: 99;
    /* Make sure it does not overlap */
    cursor: pointer;
    /* Add a mouse pointer on hover */
  }

</style>
