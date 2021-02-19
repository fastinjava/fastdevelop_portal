<template>
  <!--行宽  1920 -->
  <el-row>

    <el-col :span="1" style="min-height:1500px;background-color: #f3f3f5">
      <v-aside></v-aside>
    </el-col>
    <el-col :span="5" style="min-height:1500px;background-color:  #e7e8ef">

      <!--写目录todo-->
      <el-card style="float: right;margin-right: 20px;min-height: 1800px;">
        <div
          v-for="(anchor,index) in titles"
          :key="index"
          :style="{ padding: `0 0 0 ${anchor.indent * 20}px`,'margin-top':'5px' }"
          @click="handleAnchorClick(anchor)"
        >
          <a style="cursor: pointer" class="iocItem">{{ anchor.title }}</a>
        </div>
      </el-card>
    </el-col>
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
    <el-col :span="5" style="min-height:1500px;background-color: #ffffff">
      <g-scroll></g-scroll>
    </el-col>
  </el-row>
</template>

<script>


  import vAside from "./aside";

  import gScroll from '../../../components/goScroll'

  var jwtUtil = require("jsonwebtoken");
  import * as userApi from '../../user/api/user'
  import * as projectApi from '../../api/project'

  export default {
    name: "",
    components: {
      vAside,gScroll
    },
    data() {
      return {
        blogContent:"# 暂无内容",
        projectList: [],
        titles: [],
        userInfoPojo: {
          userpic: ''
        }
      }
    },
    methods: {



      initTitles() {
        const anchors = this.$refs.editor.$el.querySelectorAll(
          ".v-md-editor-preview h1,h2,h3,h4,h5,h6"
        );
        const titles = Array.from(anchors).filter(
          (title) => !!title.innerText.trim()
        );

        if (!titles.length) {
          this.titles = [];
          return;
        }

        const hTags = Array.from(
          new Set(titles.map((title) => title.tagName))
        ).sort();

        this.titles = titles.map((el) => ({
          title: el.innerText,
          lineIndex: el.getAttribute("data-v-md-line"),
          indent: hTags.indexOf(el.tagName),
        }));
      },

      handleAnchorClick(anchor) {
        const {editor} = this.$refs;
        const {lineIndex} = anchor;

        const heading = editor.$el.querySelector(
          `.v-md-editor-preview [data-v-md-line="${lineIndex}"]`
        );

        if (heading) {
          editor.previewScrollToTarget({
            target: heading,
            scrollContainer: window,
            top: 60,
          });
        }
      },

      blogContentGet(projectId){
        projectApi.blogContentGet(projectId,"3").then(res=>{
          console.log(res)
          this.blogContent = res.data;
        }).then((res) => {
          this.initTitles();
        });
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

  .iocItem:hover {
    background-color: rgba(0, 0, 255, 0.39);
  }
</style>
