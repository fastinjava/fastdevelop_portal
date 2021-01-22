<template>
  <el-row>
    <el-row style="padding: 20px">
      <el-button type="primary" @click="dialogVisible = true">新增</el-button>
      <el-button type="primary" @click="listProjects">刷新</el-button>
    </el-row>
    <el-row>
      <el-table
        :data="projectList"
        style="width: 100%"
      >
        <el-table-column
          prop="id"
          label="id"
          width="300"
        >
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
        >
        </el-table-column>
        <el-table-column
          prop="subTitle"
          label="子标题"

        >
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="projectTypeName"
          label="类型"
          width="150">
        </el-table-column>
        <!--<el-table-column-->
        <!--label="头像"-->
        <!--&gt;-->
        <!--<template slot-scope="scope">-->
        <!--<el-avatar :src="scope.row.userpic"></el-avatar>-->
        <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
        <!--prop="createTime"-->

        <!--label="创建时间"-->
        <!--width="200">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
        <!--prop="updateTime"-->
        <!--label="更新时间"-->
        <!--width="200">-->
        <!--</el-table-column>-->
        <el-table-column
          label="分类名称"
        >
          <template slot-scope="scope">
            {{scope.row.categoryName}}
          </template>
        </el-table-column>
        <el-table-column
          label="封面"
        >
          <template slot-scope="scope">
            <el-image
              style="width: 40px; height: 40px"
              :src="scope.row.img"
              :fit="`fill`"></el-image>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
        >
          <template slot-scope="scope">
            <el-dropdown>
              <span class="el-dropdown-link">
                <el-button type="text">操作</el-button>
              </span>
              <el-dropdown-menu slot="dropdown">
                <!--<el-dropdown-item @click.native="edit(scope.row,'edit_project_content')">编辑文章</el-dropdown-item>-->
                <el-dropdown-item @click.native="$router.push({name:'PROJECT_DETAIL',query:{id:scope.row.id,projectType:scope.row.projectType}})">查看详情</el-dropdown-item>
                <el-dropdown-item>螺蛳粉</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row>
      <div style="float: right;margin-top: 20px;">
        <el-button type="primary" size="small" @click="prePageClick">上一页</el-button>
        <el-button type="primary" size="small" @click="nextPageClick">下一页</el-button>
      </div>
    </el-row>
    <el-row>
      <el-dialog
        title="新增/更新项目基础信息"
        :visible.sync="dialogVisible"
        width="50%"
      >
        <el-form :model="form" ref="form" label-width="100px"
                 class="demo-ruleForm">
          <!--<el-form-item label="id">-->
          <!--<el-input v-model="form.id"></el-input>-->
          <!--</el-form-item>-->
          <el-form-item label="父分类">
            <el-cascader
              v-model="form.categoryId"
              :options="categoryTree"
              :props="props"
              @change="handleSelectCategoryChange"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="标题">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="子标题">
            <el-input v-model="form.subTitle"></el-input>
          </el-form-item>
          <el-form-item label="封面">
            <el-input v-model="form.img"></el-input>
          </el-form-item>

          <el-form-item label="项目类型">
            <el-select v-model="form.projectType" placeholder="类型">
              <el-option
                v-for="item in projectTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveProjectSubmit">确 定</el-button>
        </span>
      </el-dialog>

    </el-row>
  </el-row>
</template>

<script>
  import * as projectApi from '../../api/project'
  import * as categoryApi from '../../api/category'

  export default {
    name: "",
    data() {
      return {
        projectReqDTO:{
          "pageNum":0,
          "pageSize":10
        },
        props: {  checkStrictly: true  },
        projectList: [],
        dialogVisible: false,
        projectTypes: [
          {
            label: '博客',
            value: '1',
          },
          {
            label: '专栏',
            value: '2',
          },
          {
            label: '问答',
            value: '3',
          },
        ],
        categoryTree: [],
        form: {
          "id": "",
          "title": "",
          "subTitle": "",
          "userId": null,
          "projectType": "1",
          "categoryId": "",
          "img": "https://gitee.com/leefuyong/blogimg/raw/master/null/user_avatar.jpg",
        }
      }
    },
    methods: {
      prePageClick(){
        this.projectReqDTO.pageNum = this.projectReqDTO.pageNum - 1;
        this.listProjects();
      },
      nextPageClick(){
        this.projectReqDTO.pageNum = this.projectReqDTO.pageNum + 1;
        this.listProjects();
      },
      handleSelectCategoryChange(value) {
        if (value) {
          var valueElement = value[value.length - 1];
          this.form.categoryId = valueElement;
        }
      },
      saveProjectSubmit() {
        this.save_project();
      },
      categorySelectTree() {
        categoryApi.categorySelectTree().then(res => {
          console.log(res)
          this.categoryTree = res.data;
        })
      },
      edit(project, type) {
        if (type === 'edit_project_content') {
          this.$router.push({name: 'EDIT', query: {projectId: project.id, projectType: project.projectType}})
        }
        this.$message.info(type)
      },

      listProjects() {
        projectApi.listProjects(this.projectReqDTO).then(res => {
          this.projectList = res.data;
        })
      },
      save_project() {
        projectApi.saveProject(this.form).then(res => {
          if (res.success) {
            this.$message.success('操作成功');
            this.dialogVisible = false;
            this.listProjects();
          }
        })
      }
    },
    mounted() {
      this.listProjects();
      this.categorySelectTree();
    }
  }
</script>

<style scoped>

</style>
