<template>
  <!--行宽  1920 -->
  <el-row>

    <el-col :span="1" style="min-height:1500px;background-color: #f3f3f5">
      <v-aside></v-aside>
    </el-col>
    <el-col :span="5" style="min-height:1500px;background-color:  #e7e8ef">2</el-col>
    <el-col :span="10" style="min-height:1500px;background-color: #f3f3f5">
      <div style="margin: 0 auto;border-radius: 15px;">
        <v-md-editor
          ref="editor"
          :value="blogContent"
          mode="preview"
          style="
                    min-height: 1500px;
                  "
        ></v-md-editor>
      </div>
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
        blogContent:"# 暂无内容",
        projectList: [],
        userInfoPojo: {
          userpic: ''
        }
      }
    },
    methods: {


      blogContentGet(projectId){
        projectApi.blogContentGet(projectId,"3").then(res=>{
          console.log(res)
          this.blogContent = res.data;
        })
      },

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
      var query = this.$route.query;
      this.blogContentGet(query.chapterId);
    }
  }
</script>

<style scoped>
  @import "../../../assets/css/style.css";

  .project_l {
    margin-left: 10px;
  }
</style>
