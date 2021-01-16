<template>
  <el-row>
    <el-row>
      <el-tabs v-model="activeName" >
        <el-tab-pane label="基础信息" name="first">
          <el-card style="width: 700px" >
            <el-form ref="projectDetailPojo" :model="projectDetailPojo" label-width="80px">
              <el-form-item label="id">
                <el-input v-model="projectDetailPojo.id"></el-input>
              </el-form-item>
              <el-form-item label="作者">
                <el-input disabled v-model="projectDetailPojo.username"></el-input>
              </el-form-item>
              <el-form-item label="标题">
                <el-input v-model="projectDetailPojo.title"></el-input>
              </el-form-item>
              <el-form-item label="子标题">
                <el-input v-model="projectDetailPojo.subTitle"></el-input>
              </el-form-item>
              <el-form-item label="项目类型">
                <el-select v-model="projectDetailPojo.projectType" placeholder="类型">
                  <el-option
                    v-for="item in projectTypes"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="分类">
                <el-cascader
                  v-model="projectDetailPojo.categoryId"
                  :options="categoryTree"
                  @change="handleSelectCategoryChange"
                ></el-cascader>
              </el-form-item>
              <!--<el-form-item label="分类名称">-->
                <!--<el-input v-model="projectDetailPojo.categoryName"></el-input>-->
              <!--</el-form-item>-->
              <el-form-item label="封面">
                <el-input v-model="projectDetailPojo.img"></el-input>
              </el-form-item>
              <el-form-item label="封面预览">
                <el-image
                  style="width: 100px; height: 100px"
                  :src="projectDetailPojo.img"
                  :fit="`fill`"></el-image>
              </el-form-item>
              <el-form-item label="创建时间">
                <el-input  disabled v-model="$moment(projectDetailPojo.createTime).format('YYYY-DD-MM hh:ss:mm')"></el-input>
              </el-form-item>
              <el-form-item label="更新时间">
                <el-input  disabled v-model="$moment(projectDetailPojo.updateTime).format('YYYY-DD-MM hh:ss:mm')"></el-input>
              </el-form-item>
            </el-form>
            <el-button @click="saveProject">保存</el-button>
          </el-card>
        </el-tab-pane>
        <el-tab-pane v-if="projectDetailPojo.projectType==='1'" label="博客内容" name="second">

          <el-button @click="$router.push({name: 'EDIT', query: {projectId: projectDetailPojo.id, projectType: projectDetailPojo.projectType}})"></el-button>

        </el-tab-pane>
        <el-tab-pane v-if="projectDetailPojo.projectType==='2'" label="章节内容" name="third">
          <h1>章节管理</h1>
          <el-row>
            <el-button @click="chapterMainClick">新增章</el-button>
          </el-row>
          <el-card accordion >
            <el-card v-for="(zhang,zhangIndex) in projectDetailPojo.chapterDTOList[0].children" :key="zhangIndex">
              <div>
                <span>{{zhang.chapterName}}</span>
                <el-popover
                placement="right"
                trigger="hover"
                 >
                  <div >
                    <el-button size="mini" type="text" @click="chapterSubClick(zhang)">新增节</el-button>
                  </div>
                <el-button slot="reference" type="text"><i class="el-icon-more"></i></el-button>
              </el-popover>
              </div>
              <div style="padding-left: 30px;" v-for="(jie,jieIndex) in zhang.children" :key="jieIndex">
                {{jie.chapterName}} <el-button type="text" @click="$router.push({name:'EDIT',query:{projectId:jie.chapterId,projectType:'3'}})">节编辑{{jie}}</el-button>
              </div>
            </el-card>
          </el-card>

        </el-tab-pane>
      </el-tabs>

    </el-row>


    <el-row>
      <el-dialog
        title="提示"
        :visible.sync="chapterDialogVisible"
        width="30%"
        >
        {{chapterPojo}}
        <el-card>
          id:<el-input v-model="chapterPojo.id"></el-input>
          pId:<el-input v-model="chapterPojo.pId"></el-input>
          title:<el-input v-model="chapterPojo.title"></el-input>
          chapterType:<el-input v-model="chapterPojo.chapterType"></el-input>
          num:<el-input v-model="chapterPojo.num"></el-input>
        </el-card>

        <span slot="footer" class="dialog-footer">
          <el-button @click="chapterDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="chapterSubmitClick">确 定</el-button>
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

        chapterDialogVisible:false,
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
        projectDetailPojo: {
          "chapterDTOList":[
            {
              "children": []
            }
          ]
        },
        activeName:'third',
        categoryTree: [],
        chapterPojo:{
          "id":"",
          "pId":"",
          "title":"",
          "chapterType":"",
          "num":"",
        }
      }
    },
    methods: {
      chapterSubmitClick(){
        this.chapterSave();
      },
      chapterSave(){
        projectApi.chapterInsert(this.chapterPojo).then(res=>{
          console.log(res)
          this.detailProject(this.$route.query.id);
        })
      },
      chapterSubClick(zhang){
        this.chapterDialogVisible = true;
        this.chapterPojo.pId = zhang.chapterId;
        this.chapterPojo.chapterType = '2'
      },
      chapterMainClick(){
        this.chapterDialogVisible = true;
        this.chapterPojo.pId = this.projectDetailPojo.id;
        this.chapterPojo.chapterType = '1'

      },
      categorySelectTree() {
        categoryApi.categorySelectTree().then(res => {
          this.categoryTree = res.data;
        })
      },
      handleSelectCategoryChange(value) {
        if (value) {
          var valueElement = value[value.length - 1];
          this.projectDetailPojo.categoryId = valueElement;
        }
      },
      saveProject(){

        let reload = {};
        reload.id = this.projectDetailPojo.id;
        reload.title = this.projectDetailPojo.title;
        reload.title = this.projectDetailPojo.title;
        reload.subTitle = this.projectDetailPojo.subTitle;
        reload.projectType = this.projectDetailPojo.projectType;
        reload.categoryId = this.projectDetailPojo.categoryId;
        reload.img = this.projectDetailPojo.img;
        projectApi.saveProject(reload).then(res=>{
          console.log(res)
        })
      },
      detailProject(id) {
        projectApi.detailProject(id).then(res => {
          if (res.success) {
            this.projectDetailPojo = res.data;
          }
        })
      }
    },
    mounted() {
      console.log(this.$route.query)
      this.detailProject(this.$route.query.id);
      this.categorySelectTree();
    }
  }
</script>

<style scoped>

</style>
