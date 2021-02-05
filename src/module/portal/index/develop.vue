<template>
  <!--行宽  1920 -->
  <el-row>

    <el-col :span="1" style="min-height:1500px;background-color: #f3f3f5">
      <v-aside></v-aside>
    </el-col>
    <el-col :span="5" style="min-height:1500px;background-color:  #e7e8ef">2</el-col>
    <el-col :span="10" style="min-height:1500px;background-color: #f3f3f5">

      <el-row >
        <el-card>
          <div slot="header" class="clearfix">
            <span>在线JWT解析</span>
          </div>
          <div>
            <span>提示： JWT是目前最流行的跨域认证解决方案, 是一个开放式标准(RFC 7519), 用于在各方之间以JSON对象安全传输信息。我们不记录令牌，所有验证和调试都在客户端进行。</span>
          </div>
        </el-card>
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

      }
    },
    methods: {
    },
    mounted() {

    }
  }
</script>

<style scoped>
  @import "../../../assets/css/style.css";

  .project_l {
    margin-left: 10px;
  }
</style>
