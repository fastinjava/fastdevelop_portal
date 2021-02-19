<template>
  <!--行宽  1920 -->
  <el-row>

    <el-col :span="1" style="min-height:1500px;background-color: #f3f3f5">
      <v-aside></v-aside>
    </el-col>
    <el-col :span="5" style="min-height:1500px;background-color:  #e7e8ef">2</el-col>
    <el-col :span="10" style="min-height:1500px;background-color: #f3f3f5">

      <el-row>
        <el-card>
          <el-button type="primary" style="padding: 20px;">问题描述</el-button>
          <br>
          <h4>{{projectDetailPojo.title}}</h4>
          <br>
        </el-card>
      </el-row>

      <el-row>

        <el-row>
          <el-card v-for="(answer,index) in answerList" :key="index">

            <div slot="header" class="clearfix">
              <el-button type="primary" style="padding: 10px;"><span>答案{{answer.num}}</span></el-button>
            </div>

            <v-md-editor
              ref="editor"
              :value="answer.contentStr"
              mode="preview"
            ></v-md-editor>

          </el-card>

        </el-row>
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

        projectDetailPojo:{},
        projectList: [],
        answerList: [],
        userInfoPojo: {
          userpic: ''
        }
      }
    },
    methods: {
      listAnswersClick(){

        var query = this.$route.query;
        var questionId = query.questionId;

        let reload = {};
        reload.projectId = questionId;
        projectApi.answerListAnswers(reload).then(res=>{
          console
            .log(res)

          if (res.success) {
            this.answerList = res.data;
          }

        })
      },
      detailProject(id) {
        projectApi.detailProject(id).then(res => {
          if (res.success) {
            this.projectDetailPojo = res.data;
          }
        }).then(res=>{

          if (this.projectDetailPojo.projectType === '3') {
            this.listAnswersClick();
          }

        });
      }
    },
    mounted() {



      var query = this.$route.query;
      var questionId = query.questionId;
      this.$message.info('问题id:\n'+questionId)

      this.detailProject(questionId);


    }
  }
</script>

<style scoped>
  @import "../../../assets/css/style.css";

  .project_l {
    margin-left: 10px;
  }
</style>
