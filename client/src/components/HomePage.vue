<template>
      <div class="container-fluid">
       <div class="row center">
         <div class="col-xs-12">
           <button type="button" class="btn btn-primary" @click="navigateTo({ name : 'login'})"> Login </button>
           <button type="button" class="btn btn-primary" @click="navigateTo({ name : 'register'})"> Register </button>
           </div>
       </div>
      </div>
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


