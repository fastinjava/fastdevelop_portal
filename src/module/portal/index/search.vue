<template>
  <!--行宽  1920 -->
  <el-row>

    <el-col :span="1" style="min-height:1500px;background-color: #f3f3f5">
      <v-aside></v-aside>
    </el-col>
    <el-col :span="3" style="min-height:1500px;background-color:  #e7e8ef">2</el-col>
    <el-col :span="15" style="min-height:1500px;background-color: #f3f3f5">
      <el-row>

        <el-cascader
          style="width: 100%"
          :options="categoryTree"
          :props="props"
        ></el-cascader>

      </el-row>
    </el-col>
    <!--<el-col :span="3" style="min-height:1500px;background-color: #e7e8ef">4</el-col>-->
    <el-col :span="1" style="min-height:1500px;background-color: #e7e8ef">4</el-col>
    <el-col :span="5" style="min-height:1500px;background-color: #ffffff">5</el-col>
  </el-row>
</template>

<script>


  import vAside from "./aside";

  var jwtUtil = require("jsonwebtoken");
  import * as userApi from '../../user/api/user'
  import * as projectApi from '../../api/project'

  import * as categoryApi from '../../api/category'


  export default {
    name: "",
    components: {
      vAside,
    },
    data() {
      return {
        props: {  checkStrictly: true  },
        categoryTree:[],
      }
    },
    methods: {
      categorySelectTree(){
        categoryApi.categorySelectTree().then(res=>{
          console.log(res)
          this.categoryTree = res.data;
        })
      },
    },
    mounted() {
      this.categorySelectTree();
    }
  }
</script>

<style scoped>
  @import "../../../assets/css/style.css";

  .project_l {
    margin-left: 10px;
  }
</style>
