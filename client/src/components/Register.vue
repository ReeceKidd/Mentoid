<template>
<div class="container">
    <div class="row center">
        <h1> Register for Mentoid</h1>
        <br>
        </div>
    <div class="row">
        <div class="col-xs-6 col-xs-offset-3">
            <form method="post" action="/users/register">
   <div class="form-group">
    <label>Name</label>
    <input type="text" class="form-control" placeholder="Name" name="name">
  </div>
  <div class="form-group">
    <label>Username</label>
    <input type="text" class="form-control" placeholder="Username" name="username">
  </div>
   <div class="form-group">
    <label>Email</label>
    <input type="email" class="form-control" placeholder="Email" name="email">
  </div>
  <div class="form-group">
    <label>Password</label>
    <input type="password" class="form-control" placeholder="Password" name="password">
  </div>
  <div class="form-group">
    <label>Confirm Password</label>
    <input type="password" class="form-control" placeholder="Password" name="password2">
  </div>
  <button type="submit" class="btn btn-default">Submit</button>
</form>
        </div>
    </div>
</div>
</template>

<script>
</script>
<style scoped>
</style>
