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

      <el-card>
        <div style="display: flex;flex-direction: row;justify-content: space-between">
          <div>
            <h2>{{blogDetail.title}}</h2>
            <br>
            <h5>{{blogDetail.subTitle}}</h5>
            <br>
            <el-button type="primary" style="padding: 5px;">{{blogDetail.categoryName}}</el-button>
          </div>
          <div>
            <el-image :src="blogDetail.img" style="width: 100px;height: 120px;"></el-image>
          </div>
        </div>
      </el-card>

      <el-row>
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
      </el-row>

    </el-col>
    <!--<el-col :span="3" style="min-height:1500px;background-color: #e7e8ef">4</el-col>-->
    <el-col :span="3" style="min-height:1500px;background-color: #e7e8ef">
      <!--<div style="margin:20px 20px;">-->
        <!--<el-button style="font-size: 30px"><i class="el-icon-star-off"></i></el-button>-->
        <!--<el-button style="font-size: 30px"><i class="el-icon-star-on" style="color: blue;"></i></el-button>-->
      <!--</div>-->
    </el-col>
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
        titles: [],
        blogDetail: {},
        blogContent: '# 暂无内容',
        projectList: [],
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
      blogContentGet(projectId) {
        projectApi.blogContentGet(projectId, "1").then(res => {
          console.log(res)
          this.blogContent = res.data;
        }).then((res) => {
          this.initTitles();
        });
      },
      detailProject(id) {
        projectApi.detailProject(id).then(res => {
          console.log(res)
          this.blogDetail = res.data;
        })
      },
      getProjectList() {
        projectApi.listProjects().then(res => {
          console.log(res)
          this.projectList = res.data;
        })
      }

    },
    mounted() {
      var query = this.$route.query;
      this.blogContentGet(query.blogId)
      this.detailProject(query.blogId)
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
