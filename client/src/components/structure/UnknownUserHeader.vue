<template>
  <nav class="navbar navbar-default navbar-fixed-top">
    <div class="container">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a href="index.html" class="navbar-left">
          <img src="..\..\assets\logo.png" class="main-logo"
            height=42 width=250 />
        </a>
        <a href="index.html" class="navbar-left">
          <img src="..\..\assets\logo.png" class="mobile-logo"
            height=45 />
        </a>
      </div>

      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse" id="navbar-collapse">
        <ul class="nav navbar-nav">
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Techniques
              <span class="caret"></span>
            </a>
            <ul class="dropdown-menu">
              <li>
                <a href="kicks.html">Kicks</a>
              </li>
              <li>
                <a href="punches.html">Punches</a>
              </li>
              <li>
                <a href="elbows.html">Elbows</a>
              </li>
              <li>
                <a href="knees.html">Knees</a>
              </li>
              <li>
                <a href="clinch.html">Clinch</a>
              </li>
              <li>
                <a href="defense.html">Defensive</a>
              </li>
            </ul>
          </li>
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Improve Performance
              <span class="caret"></span>
            </a>
            <ul class="dropdown-menu">
              <li>
                <a href="conditioning.html">Conditioning</a>
              </li>
              <li>
                <a href="strength.html">Strength</a>
              </li>
              <li>
                <a href="nutrition.html">Nutrition</a>
              </li>
            </ul>
          </li>
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Culture
              <span class="caret"></span>
            </a>
            <ul class="dropdown-menu">
              <li>
                <a href="history.html">History</a>
              </li>
              <li>
                <a href="traditions.html">Traditions</a>
              </li>
              <li>
                <a href="music.html">Music</a>
              </li>
              <li>
                <a href="lifeofafighter.html">Life of a fighter</a>
                </li>
            </ul>
            </li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Fighting
                <span class="caret"></span>
              </a>
              <ul class="dropdown-menu">
                <li>
                  <a href="rules.html">Rules</a>
                </li>
                <li>
                  <a href="scoring.html">Scoring</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="videos.html">Videos</a>
            </li>

            <div class="input-group searchbar">
              <input type="text" class="form-control input-lg" placeholder="Search" />
              <span class="input-group-btn">
                <a class="search-input" href="searchresults.html">
                  <button class="btn btn-info btn-lg" type="button">
                    <i class="glyphicon glyphicon-search"></i>
                  </button>
                </a>
              </span>
            </div>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    methods: {
      navigateTo (route) {
        this.$router.push(route)
      }
    }
  }
</script>


<style scoped>


</style>
