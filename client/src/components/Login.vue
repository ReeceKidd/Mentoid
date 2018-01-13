<template>
  <div class="containter-fluid">
  <div class="row">
    <div class="col-xs-10 col-xs-offset-1 col-sm-4 col-sm-offset-4">
          <img src="..\assets\login-logo.png" class="img-responsive center-block">
          <form @submit.prevent="onSubmit">
            <div class="input">
              <label for="email">Email</label>
              <input type="email" id="email" v-model="email">
            </div>
            <div class="input">
              <label for="password">Password</label>
              <input type="password" id="password" v-model="password">
            </div>
            <p class="error" v-if="errorMessage">{{errorMessage}}</p>
            <div class="submit text-center">
              <button class="btn btn-primary text-center" >Submit</button>
            </div>
          </form>
    </div>
  </div>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        email: '',
        password: '',
        errorMessage: null
      }
    },
    methods: {
      onSubmit() {
        this.errorMessage = null
        this.$store
          .dispatch('login', {
            email: this.email,
            password: this.password
          })
          .then(() => {
            this.email = ''
            this.password = ''
            this.$router.push('/success')
          })
          .catch(e => {
            this.errorMessage = e.message
          })
      }
    }
  }
</script>

<style scoped>
  .error {
    color: red;
  }

  .input.invalid label {
    color: red;
  }

  .input.invalid input {
    border: 1px solid red;
    background-color: #ffc9aa;
  }

  .input {
    margin: 10px auto;
  }

  .input label {
    display: block;
    color: #4e4e4e;
    margin-bottom: 6px;
  }

  .input input {
    font: inherit;
    width: 100%;
    padding: 6px 12px;
    box-sizing: border-box;
    border: 1px solid #ccc;
  }

  .input input:focus {
    outline: none;
    border: 1px solid #104E8B;
    background-color: #eee;
  }

  .submit button[disabled],
  .submit button[disabled]:hover,
  .submit button[disabled]:active {
    border: 1px solid #ccc;
    background-color: transparent;
    color: #ccc;
    cursor: not-allowed;
  }

</style>
