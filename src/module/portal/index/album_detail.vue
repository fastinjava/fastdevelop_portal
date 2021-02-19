<template>
  <!--行宽  1920 -->
  <el-row style="padding: 0;">

    <el-col :span="1" style="min-height:1500px;background-color: #f3f3f5">
      <v-aside></v-aside>
    </el-col>
    <el-col :span="5" style="min-height:1500px;background-color:  #e7e8ef">2</el-col>
    <el-col :span="10" style="min-height:1500px;background-color: #f3f3f5">
      <el-card>

        <div style="display: flex;flex-direction: row;justify-content: space-between">
          <div>
            <h2>{{albumDetail.title}}</h2>
            <br>
            <h5>{{albumDetail.subTitle}}</h5>
            <br>
            <el-button type="primary" style="padding: 5px;">{{albumDetail.categoryName}}</el-button>
          </div>
          <div>
            <el-image :src="albumDetail.img" style="width: 100px;height: 120px;"></el-image>
          </div>
        </div>

      </el-card>

      <el-card style="min-height: 1900px;">
        <el-card v-for="(zhang,zhangIndex) in albumDetail.chapterDTOList[0].children" :key="zhangIndex">
          <h5>
            <el-button
              style="padding: 20px"
              @click="$router.push({name:'CHARPTER_DETAIL',query:{
                          chapterId:zhang.chapterId
                       }})">{{zhang.chapterName}}
            </el-button>
          </h5>
          <div style="height: 20px;"></div>
          <div v-for="(jie,jieIndex) in zhang.children" :key="jieIndex" style="padding-left: 40px">
            <el-button type="text" style="padding: 5px;"
                       @click="$router.push({name:'CHARPTER_DETAIL',query:{
                          chapterId:jie.chapterId
                       }})"
            >
              {{jie.chapterName}}
            </el-button>
          </div>
        </el-card>
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
        albumDetail: {
          chapterDTOList: [
            {}
          ]
        },
        projectList: [],
        userInfoPojo: {
          userpic: ''
        }
      }
    },
    methods: {
      projectClick(projectDetail) {
        console.log(projectDetail)
        if ("1" === projectDetail.projectType) {
          this.$message.info('去往博客详情页面')
          this.$router.push({name: 'BLOG_DETAIL', query: {blogId: projectDetail.id}})
        }
      },
      getProjectList() {
        projectApi.listProjects().then(res => {
          console.log(res)
          this.projectList = res.data;
        })
      }
      ,
      projectDetail(id) {
        projectApi.detailProject(id).then(res => {
          console.log('albumDetail', res.data)
          this.albumDetail = res.data;
        })
      },

    },
    mounted() {
      this.getProjectList();
      var query = this.$route.query;
      this.projectDetail(query.albumId)
    }
  }
</script>

<style scoped>
  @import "../../../assets/css/style.css";

  .project_l {
    margin-left: 10px;
  }
</style>
