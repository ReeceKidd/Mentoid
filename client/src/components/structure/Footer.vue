<template>
   <footer class="footer-distributed footer">

        <div class="footer-left">

            <a href="index.html">
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
                <i class="fa fa-map-marker"></i>
                <p><span>University of Stirling</span> Stirling, Scotland</p>
            </div>

            <br>

            <div>
                <i class="fa fa-envelope"></i>
                <p><a href="mailto:support@mentoid.com">admin@mentoid.com</a></p>
            </div>

        </div>

        <div class="footer-right">

            <p class="footer-company-about">
                <span>About Mentoid</span> Mentoids goal is to connect Mentors, with the most compatible Mentees.
            </p>

            <div class="footer-icons">

                <a href="#" class="facebook"><i class="fa fa-facebook"></i></a>
                <a href="#" class="twitter"><i class="fa fa-twitter"></i></a>
                <a href="#" class="google"><i class="fa fa-google-plus"></i></a>
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

</style>
