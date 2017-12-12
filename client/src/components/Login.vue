<template>
  <div id="signin">
    <div class="signin-form">
      <img src="..\assets\login-logo.png" class="img-responsive center-block">
      <form @submit.prevent="onSubmit">
        <div class="input">
          <label for="email">Email</label>
          <input
                  type="email"
                  id="email"
                  v-model="email">
        </div>
        <div class="input">
          <label for="password">Password</label>
          <input
                  type="password"
                  id="password"
                  v-model="password">
        </div>
        <p class="error" v-if="errorMessage">{{errorMessage}}</p>
        <div class="submit">
          <button class="btn btn-primary">Submit</button>
        </div>
      </form>
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
.signin-form {
  width: 400px;
  margin: 30px auto;
  border: 1px solid #eee;
  padding: 20px;
  box-shadow: 0 2px 3px #ccc;
}
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
