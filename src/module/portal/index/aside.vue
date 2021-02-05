<template>
  <ul class="nav">
    <li>
      <a href="javascript:void(0);">
        <el-dropdown>
                  <span class="el-dropdown-link">
                    <el-image
                      style="width: 50px; height: 50px; border-radius: 25%"
                      :src="userInfoPojo.userpic"
                      :fit="`fill`"
                    >
                    </el-image>
                  </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item disabled>{{
              userInfoPojo.name
              }}
            </el-dropdown-item>
            <el-dropdown-item>小记</el-dropdown-item>
            <el-dropdown-item  @click.native="$router.push({name:'Backend_Index_Index'})">工作台</el-dropdown-item>
            <el-dropdown-item>写文章</el-dropdown-item>
            <el-dropdown-item>个人主页</el-dropdown-item>
            <el-dropdown-item>账户设置</el-dropdown-item>
            <el-dropdown-item>帮助文档</el-dropdown-item>
            <el-dropdown-item @click.native="userLogOut">
              退出登录
            </el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </a>
    </li>
    <li>
      <el-button
        href="javascript:void(0);"
        @click="$router.push({ name: 'Portal_Index' })"
        style="background-color: rgba(93,174,247,0.25)"
      >首页</el-button
      >
    </li>

    <li><a href="">搜索</a></li>
    <li>
      <el-button
        href="javascript:void(0);"
        @click="$router.push({ name: 'DEVELOP_TOOL' })"
        style="background-color: rgba(93,174,247,0.25)"
      >工具</el-button
      >
    </li>
    <li><a href="">下载管理</a></li>
  </ul>
</template>

<script>
  var jwtUtil = require("jsonwebtoken");
  import * as userApi from '../../user/api/user'

  export default {
    name: "",
    data() {
      return {
        userInfoPojo: {
          userpic: ''
        }
      }
    },
    methods: {
      getUserJwt() {
        let token = window.localStorage.getItem("token");
        this.userInfoPojo = jwtUtil.decode(token)
      },

    },
    created() {
      this.getUserJwt();
    }
  }
</script>

<style scoped>


  ul,
  ol {
    list-style: none;
  }

  .nav > li > a {
    /*flex 布局*/
    display: flex;
    /*实现垂直居中*/
    align-items: center;
    /*实现水平居中*/
    justify-content: center;
    height: 82px;
    width: 100%;
  }

  a {
    text-decoration: none;
    color: rgba(0, 0, 0, 0.67);
  }
</style>
