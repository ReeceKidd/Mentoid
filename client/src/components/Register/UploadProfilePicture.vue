<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-xs-12 text-center">
        <h1> Please upload a profile picture </h1>
      </div>
    </div>
    <br>
    <div class="row">
      <div class="col-xs-12 col-sm-4 col-sm-offset-4">
        <img :src="imageSrc" class="img-responsive uploadImage center-block">
        <br>
        <input @change="uploadImage" class="uploadButton" type="file" name="image" accept="image/*">
      </div>
    </div>
    <!-- Success message -->
    <br v-if="successMessage">
    <div class="row">
      <div class="text-center">
        <p class="successMessage" v-if="successMessage !== null">{{successMessage}}</p>
      </div>
    </div>
    <!-- End of success message -->
    <div class="row">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2">
        <hr>

        <!-- Desktop version of registration buttons -->
        <span class="hidden-xs">
          <button type="submit" class="btn btn-md btn-primary" @click="navigateTo('/register-education')">
            <i class="fas fa-arrow-left"></i> Previous: Education</button>
        </span>
        <span class="hidden-xs">
          <button style="float: right" class="btn btn-md btn-primary" @click="navigateTo('/mentor-preferences')"> Next: Mentoring Preferences
            <i class="fas fa-arrow-right"></i>
          </button>
        </span>
        <!-- End of desktop version -->

        <!-- Mobile version of registration buttons -->
        <span class="visible-xs text-center">
          <button type="submit" class="btn btn-md btn-primary" @click="navigateTo('/register-education')">
            <i class="fas fa-arrow-left"></i> Previous: Education</button>
        </span>
        <br class="visible-xs">
        <span class="visible-xs text-center">
          <button class="btn btn-md btn-primary" @click="navigateTo('/mentor-preferences')"> Next: Mentoring Preferences
            <i class="fas fa-arrow-right"></i>
          </button>
        </span>
        <!-- End of mobile version -->
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  const userAvater = require('../../assets/userAvatar.png')
  const uploadProfilePictureURL = 'http://localhost:4000/upload-profile-picture'
  export default {
    data() {
      return {
        imageSrc: userAvater,
        userID: this.$store.state.user.authUser._id,
        successMessage: null
      }
    },
    methods: {
      uploadImage: function (e) {
        var files = e.target.files
        if (!files[0]) {
          return
        }
        var data = new FormData()
        data.append('image', files[0])
        var reader = new FileReader()
        reader.onload = (e) => {
          this.imageSrc = e.target.result
        }
        axios.post(uploadProfilePictureURL, data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          params: {
            userID: this.userID
          }
        }).then(function (response) {
          reader.readAsDataURL(files[0])
        }).catch(function (error) {
          console.log(error) // catch your error
        })
        this.successMessage = 'Updated profile picture'
        setTimeout(() => {
          this.successMessage = null
        }, 3000)
      },
      navigateTo(route) {
        this.$router.push(route)
      }
    }
  }
</script>
<style>
  .successMessage {
    color: green;
  }

  .uploadImage {
    max-width: 200px;
    max-height: 200px;
  }

  .uploadButton {
    margin: auto;
  }


</style>
