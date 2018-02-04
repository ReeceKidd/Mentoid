<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col-xs-6 col-xs-offset-3">
          <img :src="imageSrc" class="img-responsive">
          <br>
          <input @change="uploadImage" type="file" name="image" accept="image/*">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  const userAvater = require('../../assets/userAvatar.png')
  const uploadProfilePictureURL = 'http://localhost:4000/upload-profile-picture'
  export default {
    name: 'app',
    data() {
      return {
        imageSrc: userAvater,
        userID: this.$store.state.user.authUser._id
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
      }
    }
  }
</script>
<style>


</style>
