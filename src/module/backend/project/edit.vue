<template>
  <el-row>
    <el-row>
      <el-tabs v-model="activeName">
        <el-tab-pane label="查看" name="first">

          <el-row>
            <div style="width: 900px;margin: 0 auto;border-radius: 15px;box-shadow: 0 8px 16px 0 rgba(28,31,33,.1);">
              <v-md-editor
                ref="editor"
                :value="mdContent"
                mode="preview"
                style="
                    border-radius: 15px;
                    min-height: 1500px;
                  "
              ></v-md-editor>
            </div>
          </el-row>

        </el-tab-pane>
        <el-tab-pane label="编辑" name="second">

          <v-md-editor
            :value="mdContent"
            @save="blog_contentSet"
            style=" background-color: rgba(255,255,255,0.93);min-height: 1500px;"
          ></v-md-editor>

        </el-tab-pane>
      </el-tabs>


    </el-row>
  </el-row>
</template>

<script>
  import * as projectApi from '../../api/project'

  export default {
    name: "",
    data() {
      return {
        mdContent: '请输入内容',
        activeName: 'first'
      }
    },

    methods: {
      blog_contentSet(text, html) {
        console.log(text);
        console.log(html);
        this.blogContentSet(
          {
            id: this.$route.query.projectId,
            content: text,
            projectType: this.$route.query.projectType
          }
        )
      },
      goBack() {
        console.log('go back');
      },
      blogContentSet(reload) {
        projectApi.blogContentSet(reload).then(res => {
          if (res.success) {
            this.$message.success('保存成功');
            this.blogContentGet(this.$route.query.projectId,this.$route.query.projectType)
          }
        })

      },

      blogContentGet(projectId, projectType) {
        projectApi.blogContentGet(projectId, projectType).then(res => {
          this.mdContent = res.data;
        })
      },

    },
    mounted() {
      var projectId = this.$route.query.projectId;
      var projectType = this.$route.query.projectType;
      this.blogContentGet(projectId, projectType);
      console.log(projectId)
      console.log(projectType)
    }
  }
</script>

<style scoped>

</style>
