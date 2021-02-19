<template>

  <!--行宽  1920 -->
  <el-row>
    <el-col :span="1" style="min-height:1500px;"></el-col>
    <el-col :span="5" style="min-height:1500px;"></el-col>
    <el-col :span="10" style="min-height:1500px;background-color: #f3f3f5">
      <div>
        <div style="padding: 30px;">
          <el-tabs v-model="activeName">
            <el-tab-pane label="登录" name="first">
              <el-form :model="loginForm" :rules="loginFormRules" ref="loginForm" label-width="100px"
                       class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="loginForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="loginForm.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('loginForm')">立即登录</el-button>
                    <el-button @click="resetForm('loginForm')">重置</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="注册" name="second">注册</el-tab-pane>
          </el-tabs>
        </div>
        <div>
          <el-dialog
            title=""
            :visible.sync="dialogVisible"
            width="30%"
          >
            <span>登录成功正在为您跳转首页,倒计时{{rTime}}秒</span>
          </el-dialog>
        </div>
      </div>

    </el-col>
    <el-col :span="3" style="min-height:1500px"></el-col>
    <el-col :span="5" style="min-height:1500px"></el-col>
  </el-row>


</template>

<script>

  import * as userApi from '../../user/api/user'

  var jwtUtil = require("jsonwebtoken");
  export default {
    name: "",
    data() {
      return {
        rTime: 10,
        dialogVisible: false,
        activeName: "first",
        loginForm: {
          username: 'lifuyong',
          password: '123456',
          clientId: 'fastdevelop',
          clientSecret: '123456',
        },
        loginFormRules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
          ],
        }

      }
    },
    methods: {
      userLogin() {
        console.log(this.loginForm)
        userApi.userLogin(this.loginForm).then(res => {
          console.log(res)
          if (res.success) {
            this.dialogVisible = true;
            window.localStorage.setItem("fastdevelop_user_info", JSON.stringify(jwtUtil.decode(res.data)));
            window.localStorage.setItem("token", res.data);
            this.$message.success("登录成功");
            this.$router.push({name: 'Portal_Index'})
            //  sessionStorage.setItem("fastdevelop_user_info", JSON.stringify(jwtUtil.decode(res.data)));
            // sessionStorage.setItem("token", res.data);
            //
            // let that = this;
            // let interval = window.setInterval(() => {
            //   that.rTime = that.rTime - 1;
            //   console.log(that.rTime)
            //   if (that.rTime < 0) {
            //     window.clearInterval(interval);
            //     that.dialogVisible = false;
            //     that.$router.push({name: 'Backend_Index'})
            //   }
            // }, 1000);
          }
        })
      },

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //校验通过
            // alert('submit!');
            this.userLogin();
          } else {
            console.log('error submit!!');
            this.$message.error('请按照提示规则正确填写用户名和密码');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }

    },
    mounted() {
    }
  }
</script>

<style scoped>

</style>
