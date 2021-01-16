<template>
  <el-container>
    <el-container style="min-height: 1500px">
      <el-aside width="250px" style="padding: 0;">
        <el-menu
          style="min-height: 3000px;padding: 0;"
          default-active="/backend_index"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :router="true"
        >
          <el-menu-item index="/backend_index">
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <span>用户管理</span>
            </template>
            <el-menu-item index="/backend_index/user_list">
              <span slot="title">用户列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <span>项目管理</span>
            </template>
            <el-menu-item index="/backend_index/project">
              <span slot="title">项目列表</span>
            </el-menu-item>
            <el-menu-item index="/backend_index/category">
              <span slot="title">项目分类</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>

      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import * as userApi from '../../user/api/user'

  var jwtUtil = require("jsonwebtoken");
  export default {
    name: "",
    data() {
      return {}
    },
    methods: {
      // getUserJwt(){
      //     userApi.userjwt().then(res=>{
      //       window.localStorage.setItem("fastdevelop_user_info", JSON.stringify(jwtUtil.decode(res.data)));
      //       window.localStorage.setItem("token", res.data);
      //     })
      // },
    },
    mounted() {

      // this.getUserJwt();


    }
  }
</script>

<style scoped>

  .el-aside {
    background-color: #D3DCE6;
  }

  .el-main {
    background-color: #fff;
  }


</style>
