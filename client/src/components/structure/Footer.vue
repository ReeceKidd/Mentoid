<template>
  <footer class="footer-distributed footer">

    <div class="footer-left">

      <a a @click="navigateTo({ name : 'root'})">
        <div class="footer-logo">
          <img src="..\..\assets\logo.png" height=50 width=250 />

        </div>
      </a>

      <p class="footer-links">
        <a @click="navigateTo({ name : 'success'})">Home</a> ·
        <a @click="navigateTo({ name : 'about'})">About</a> ·
        <a @click="navigateTo({ name : 'contact'})">Contact</a>
      </p>

    </div>

    <div class="footer-center">

      <div>
        
        <p>
          <i class="fas fa-map-marker-alt"></i>
          University of Stirling, </p>
      </div>

      <br>

      <div>
        
        <p>
          <i class="fas fa-envelope"></i>
          <a href="mailto:support@mentoid.com">admin@mentoid.com</a>
        </p>

      </div>
       <br>
      <div>
        
      <p>
        <i class="fas fa-user"></i>
        Created by Reece Kidd </p>
      </div>
    </div>

    <div class="footer-right">

      <p class="footer-company-about">
        <span>About Mentoid</span> Mentoid aims to be the match.com of Mentoring.
      </p>

      <div class="footer-icons">

        <a href="" class="facebook">
          <i class="fab fa-facebook-f"></i>
        </a>
        <a href="" class="twitter">
          <i class="fab fa-twitter"></i>
        </a>
        <a href="" class="google">
          <i class="fab fa-google-plus-g"></i>
        </a>
      </div>

    </div>

  </footer>
</template>

<script>
  export default {
    methods: {
      navigateTo(route) {
        this.$router.push(route)
      }
    }
  }
</script>

<style>
.footer-distributed {
    background-color: #292c2f;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.12);
    box-sizing: border-box;
    width: 100%;
    text-align: left;
    font: bold 16px sans-serif;
    min-width: 100%;
  bottom: 0;
  padding: 1rem;
}

.i {
  color: white;
}

</style>
