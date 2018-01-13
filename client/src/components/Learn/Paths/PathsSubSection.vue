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
        <h1> {{ titleOfSubSection }} </h1>
      </el-col>
    </el-row>

    <br>

    <el-row>
      <el-col :span="24">
        <p> ----- </p>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <h1> RECOMENDDED FOR YOU </h1>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24" v-for="(path, index) in paths" :key="path">
        <h4>{{ path.title }}</h4>
      </el-col>
    </el-row>


  </div>


</template>

<script>
  export default {
    data() {
      return {
        titleOfSubSection: 'Muay Thai',
        paths: [{
          title: 'Beginning Muay Thai',
          areaOfInterest: 'Muay Thai',
          // Need to come up with a document that stores all the necessary information on the areas of interest.
          areaOfInterestLink: 'areaOfInterest/MuayThai',
          estimatedTime: '40 Hours',
          votes: '100 upvotes, 9 downvotes',
          creatorProfilePic: 'PICTURE',
          creatorName: 'Bob Dylan',
          previewLink: 'previewLink.com',
          beginLink: 'beginLink.com'
        }]
      }
    }
  }
</script>

<style>


</style>
