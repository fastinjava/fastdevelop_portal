<template>
  <!--行宽  1920 -->
  <el-row>

    <el-col :span="1" style="min-height:1500px;background-color: #f3f3f5">
      <v-aside></v-aside>
    </el-col>
    <el-col :span="5" style="min-height:1500px;background-color:  #e7e8ef">2</el-col>
    <el-col :span="10" style="min-height:1500px;background-color: #f3f3f5">
      <el-row>
        <div style="background-color: #fff;margin-bottom: 10px;padding: 20px;display: flex;flex-direction: row;border-bottom: 1px solid rgba(231,232,239,0.37);" v-for="(project , index) in projectList" :key="index">
          <div style="margin-right: 20px;">
            <el-image
              style="width: 50px; height: 50px; border-radius: 25%"
              :src="project.img"
              :fit="`fill`"
            >
            </el-image>
          </div>
          <div style="display: flex;flex-direction: column;">
            <div><el-button type="text" style="color: #000;font-size: 16px; ">{{project.title}}</el-button></div>
            <div style="height: 10px;"></div>
            <div><el-tag type="success">{{project.categoryName}}</el-tag>  &nbsp;&nbsp;&nbsp;&nbsp; {{project.username}} &nbsp;&nbsp;&nbsp;&nbsp; {{$moment(project.createTime).format('YYYY年MM月DD日 ')}}</div>
          </div>
        </div>
      </el-row>
    </el-col>
    <!--<el-col :span="3" style="min-height:1500px;background-color: #e7e8ef">4</el-col>-->
      <el-col :span="3" style="min-height:1500px;background-color: #e7e8ef">4</el-col>
    <el-col :span="5" style="min-height:1500px;background-color: #ffffff">5</el-col>
  </el-row>
</template>

<script>


  import vAside from "./aside";

  var jwtUtil = require("jsonwebtoken");
  import * as userApi from '../../user/api/user'
  import * as projectApi from '../../api/project'

  export default {
    name: "",
    components: {
      vAside,
    },
    data() {
      return {
        projectList:[],
        userInfoPojo: {
          userpic: ''
        }
      }
    },
    methods: {

      getProjectList(){
        projectApi.listProjects().then(res=>{
          console.log(res)
          this.projectList = res.data;
        })
      }

    },
    mounted() {
this.getProjectList()
    }
  }
</script>

<style scoped>
  @import "../../../assets/css/style.css";
</style>
