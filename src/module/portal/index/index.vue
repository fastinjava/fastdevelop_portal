<template>
  <!--行宽  1920 -->
  <el-row>

    <el-col :span="1" style="min-height:1500px;background-color: #f3f3f5">
      <v-aside></v-aside>
    </el-col>
    <el-col :span="5" style="min-height:1500px;background-color:  #e7e8ef">2</el-col>
    <el-col :span="10" style="min-height:1500px;background-color: #f3f3f5">
      <el-card style="display: flex;flex-direction: row;padding: 0 10px;border-bottom: 1px solid rgba(0,0,0,0.22);margin-bottom: 10px;"
        v-for="(project , index) in projectList" :key="index"
      >
        <div style="display: flex;flex-direction: column;">
          <div>
            <a href="javascript:void(0);" style="font-size: 20px" @click="projectClick(project)">{{project['title']}}</a>
          </div>
          <div style="height: 10px;"></div>
          <div>
            {{project['subTitle']}}
          </div>
          <div style="display: flex;flex-direction: row;margin-top: 10px;">
            <div class="" style="margin-left: 0px;">
              <el-button style="padding: 10px;" type="text">{{project['categoryName']}}</el-button>
            </div>
            <div class="project_l">
              <el-button style="padding: 10px;" type="text">{{project['username']}}</el-button>

            </div>
            <div class="project_l">
              <el-button style="padding: 10px;" type="text">{{project['projectTypeName']}}</el-button>
            </div>
          </div>
        </div>
      </el-card>
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
        projectList: [],
        userInfoPojo: {
          userpic: ''
        }
      }
    },
    methods: {
      projectClick(projectDetail){
        console.log(projectDetail)
        if ("1" === projectDetail.projectType) {
          this.$message.info('去往博客详情页面')
          this.$router.push({name:'BLOG_DETAIL',query:{blogId:projectDetail.id}})
        }
        if ("2" === projectDetail.projectType) {
          this.$message.info('去往专栏详情页面')
          this.$router.push({name:'ALBUM_DETAIL',query:{albumId:projectDetail.id}})
        }

        if ("3" === projectDetail.projectType) {
          this.$message.info('去往wenda 详情页面')
          this.$router.push({name:'QA',query:{questionId:projectDetail.id}})
        }

      },
      getProjectList() {
        projectApi.listProjects({pageSize: 1000}).then(res => {
          console.log(res)
          this.projectList = res.data;
        })
      },
      projectDetail(id){
        projectApi.detailProject(id).then(res=>{
          console.log('albumDetail',res.data)
        })
      },

    },
    mounted() {
      this.getProjectList();
    }
  }
</script>

<style scoped>
  @import "../../../assets/css/style.css";

  .project_l {
    margin-left: 10px;
  }
</style>
