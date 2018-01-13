<template>
  <div>
    <el-row>
      <el-col :span="7">
        <el-button> My Interests </el-button>
      </el-col>
      <el-col :span="10">
        <p> Search for path </p>
        <el-button> Search </el-button>
      </el-col>
      <el-col :span="7">
        <el-button> Create Path </el-button>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <h1> Paths </h1>
      </el-col>
    </el-row>

    <br>

    <el-row>
      <el-col :span="18" :offset="3">
        <h2> Paths help guide you in the right direction, providing you with the best learning materials to make the most of your
          time. </h2>
      </el-col>
    </el-row>

    <br>

    <el-row>
      <el-col :span="24">
        <p> ----- </p>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="18" :offset="3">
        <h2> Your Interests </h2>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="6" v-for="(areaOfInterest, index) in topAreasOfInterest" :key="areaOfInterest">
        {{ areaOfInterest }}
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <p> ------ </p>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <h2> Recommendations </h2>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="18" :offset="3">
        <h2> Master Muay Thai </h2>
        <p> Muay Thai </p>
        <p> 10 hours</p>
        <p> 100 upvotes, 3 downvotes
          <p>
            <p>Creator profile</p>
            <el-button>Preview</el-button>
            <el-button>Begin</el-button>
      </el-col>
    </el-row>
  </div>


</template>

<script>
  export default {
    data() {
      return {
        topAreasOfInterest: ['Hockey', 'Rugby', 'Water Polo', 'Programming']
      }
    }
  }
</script>

<style>


</style>
