<template>
  <el-row>
    <el-row style="padding: 20px">
      <el-button type="primary" @click="dialogVisible = true">新增</el-button>
      <el-button type="primary" @click="findByPid">刷新</el-button>
    </el-row>
    <el-row>
      <el-table :data="categoryList">
        <el-table-column
          prop="id"
          label="分类id"
          >
        </el-table-column>
        <el-table-column
          prop="pId"
          label="分类父id"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="分类名称"
          >
        </el-table-column>

        <el-table-column
          label="创建时间"
        >
          <template slot-scope="scope">
            <span>{{$moment(scope.row.createTime).format('YYYY年MM月DD日 ')}}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="更新时间"
        >
          <template slot-scope="scope">
            <span>{{$moment(scope.row.updateTime).format('YYYY年MM月DD日 ')}}</span>
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
                <el-dropdown-item @click.native="edit(scope.row,'edit_project_content')">编辑文章</el-dropdown-item>
                <el-dropdown-item>狮子头</el-dropdown-item>
                <el-dropdown-item>螺蛳粉</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>

      </el-table>
    </el-row>
    <el-row>

      <el-dialog
        title="新增分类"
        :visible.sync="dialogVisible"
        width="50%"
      >
        <el-card>
          {{categoryPojo}}
        </el-card>
        <el-form :model="categoryPojo" ref="categoryPojo" label-width="100px"
                 class="demo-ruleForm">
          <el-form-item label="父分类">
            <el-cascader
              v-model="categoryPojo.pId"
              :options="categoryTree"
              :props="props"
              @change="handleSelectCategoryChange"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="标题">
            <el-input v-model="categoryPojo.name"></el-input>
          </el-form-item>
          <el-form-item label="分类描述">
            <el-input v-model="categoryPojo.description"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveCategorySubmit">确 定</el-button>
        </span>
      </el-dialog>
    </el-row>
  </el-row>
</template>

<script>
  import * as categoryApi from '../../api/category'

  export default {
    name: "",
    data() {
      return {
        dialogVisible:false,
        categoryList: [],
        categoryPojo:{
          "id": "",
          "name": "",
          "pId": "0",
          "description": "",

        },
        categoryTree:[],
        props: {  checkStrictly: true  },
      }
    },
    methods: {
      handleSelectCategoryChange(value) {
        if (value) {
          var valueElement = value[value.length-1];
          this.categoryPojo.pId = valueElement;
        }
      },
      saveCategorySubmit(){
        this.categorySave()
        this.dialogVisible = false;
      },
      categorySelectTree(){
        categoryApi.categorySelectTree().then(res=>{
          console.log(res)
          this.categoryTree = res.data;
        })
      },
      categorySave(){
        categoryApi.categorySave(this.categoryPojo).then(res=>{
          this.categoryPojo = {};
          console.log(res);
          this.findByPid();
          this.categorySelectTree();
        })
      },

      findByPid() {
        categoryApi.listAll({}).then(res => {
          this.categoryList = res.data;
        })
      }

    },
    mounted() {
      this.findByPid();
      this.categorySelectTree();
    }
  }
</script>

<style scoped>

</style>
