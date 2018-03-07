<template>
  <div class="row">
    <br>
        <img :src="profilePictureURL" class="img-responsive uploadImage center-block" v-if="hasProfilePicture">
        <img :src="imageSrc" class="img-responsive uploadImage center-block" v-else>
        <br>
        <label for="file-upload" class="btn btn-primary">
          Choose Profile Picture
        </label>
        <input @change="uploadImage" id="file-upload" type="file" name="image" accept="image/*">
    <!-- Success message -->
    <br v-if="successMessage">
      <div class="text-center">
        <p class="successMessage" v-if="successMessage !== null">{{successMessage}}</p>
      </div>
  </div>
</template>

<script>
  import axios from 'axios'
  const userAvater = require('../../../assets/userAvatar.png')
  const uploadProfilePictureURL = 'http://localhost:4000/upload-profile-picture'
  const getProfilePictureURL = 'http://localhost:4000/get/profile-picture/'
  export default {
    data() {
      return {
        imageSrc: userAvater,
        profilePictureURL: getProfilePictureURL + this.$store.state.user.authUser._id,
        profileImageLoaded: true,
        profileCompleteness: {},
        userID: this.$store.state.user.authUser._id,
        successMessage: null,
        hasProfilePicture: false
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
        this.hasProfilePicture = false
        setTimeout(() => {
          this.successMessage = null
        }, 3000)
      },
      imageLoadError() {
        this.profileImageLoaded = false
        console.log('User does not have a profile picture')
      },
      navigateTo(route) {
        this.$router.push(route)
      }
    },
    beforeMount() {
      var self = this
      var userID = this.$store.state.user.authUser._id
      // Gets users first name and last name
      axios.get(getProfilePictureURL + userID).then(function (response) {
        // Checks if user already has a profile picture.
        if (response) {
          self.hasProfilePicture = true
        }
      })
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
    border-radius: 50%;
    padding: 1px;
    border: 1px solid #021a40;
  }

  .custom-file-upload {
    margin: auto;
  }

  input[type="file"] {
    display: none;
  }

</style>
