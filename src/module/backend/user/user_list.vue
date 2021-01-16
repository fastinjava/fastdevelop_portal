<template>
  <el-row>
    <el-row style="padding: 20px">
      <el-button type="primary">新增</el-button>
    </el-row>
    <el-row>
      <el-table
        :data="userList"
        style="width: 100%"
        >
        <el-table-column
          prop="id"
          label="用户id"
          width="100"
          >
        </el-table-column>
        <el-table-column
          prop="username"
          label="登录名"
          width="100"
          >
        </el-table-column>
        <el-table-column
          prop="nickname"
          label="昵称"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="手机"
          width="150">
        </el-table-column>
        <!--<el-table-column-->
          <!--label="头像"-->
         <!--&gt;-->
          <!--<template slot-scope="scope">-->
            <!--<el-avatar :src="scope.row.userpic"></el-avatar>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column
          prop="email"
          label="邮箱"
          width="200">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          >
          <template slot-scope="scope">
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </el-row>
</template>

<script>

  import * as userApi from '../../api/user'

  export default {
    name: "",
    data(){
      return {
        userList:[]
      }
    },
    mounted() {
      userApi.userList({}).then(res => {
        this.userList = res.data;
      })

    }
  }
</script>

<style scoped>

</style>
