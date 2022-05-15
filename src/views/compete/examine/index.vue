<template>
  <div class="post">
    <basic-container>
      <el-tabs v-model="tabIndex" type="card">
        <el-tab-pane label="待审核" name="0" lazy>
          <avue-crud
            ref="crud"
            :option="tableOption"
            v-model="form"
            :page.sync="page"
            :table-loading="listLoading"
            :data="list"
            @on-load="getList"
            @search-change="searchChange"
            @refresh-change="refreshChange"
            @size-change="sizeChange"
            @current-change="currentChange">
            <template slot-scope="{type,size,row,index}" slot="menu">
              <el-button icon="el-icon-view" :size="size" v-if="row.isRelease=='0'" @click="handleView(row)" :type="type">审核</el-button>
            </template>
          </avue-crud>
        </el-tab-pane>
        <el-tab-pane label="已处理" name="1" lazy>
          <history-page/>
        </el-tab-pane>
      </el-tabs>

        <el-dialog
          :visible.sync="centerDialogVisible"
          :show-close="false"
          top="0vh"
          width="90%"
          class="dialog-exam"
          >
          <el-row :gutter="20">
            <el-col :span="12">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>意向信息表</span>
                </div>
                <avue-form ref="form" v-model="obj" :option="option">
                </avue-form>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>竞聘者信息</span>
                  <el-button style="float: right;" @click="centerDialogVisible=false" size="mini" icon="el-icon-close" circle></el-button>
                </div>
                <el-form label-position="right" label-width="100px" :model="formLabelAlign">
<!--                  <el-form-item label="竞聘者姓名">-->
<!--                    <el-input v-model="formLabelAlign.name" disabled></el-input>-->
<!--                  </el-form-item>-->
                  <el-form-item label="申请时间">
                    <el-input v-model="formLabelAlign.applyTime" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="通过志愿">
                    <el-radio-group v-model="formLabelAlign.okZy" :disabled="optionFormButton && optionFormButton.passedGwId!=null">
                      <el-radio v-for="item in dicData" :key="item.id" :label="item.id">{{item.postName}}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="审核意见">
                    <el-input type="textarea" rows="7"  v-model="formLabelAlign.remark"></el-input>
                  </el-form-item>
                </el-form>
                <el-button type="primary" icon="el-icon-check" v-if="optionFormButton && optionFormButton.optList.indexOf('2')> -1" plain @click="handleExamine(2)">通过待竞聘答辩</el-button>
                <el-button type="warning" icon="el-icon-check" v-if="optionFormButton && optionFormButton.optList.indexOf('1')> -1" plain @click="handleExamine(1)">通过无需竞聘答辩</el-button>
                <el-button type="danger" icon="el-icon-close" v-if="optionFormButton && optionFormButton.optList.indexOf('3')> -1" plain  @click="handleExamine(3)">不通过</el-button>
              </el-card>
              <el-card class="box-card" style="margin-top: 20px;">
                <div slot="header" class="clearfix">
                  <span>审核进程</span>
                </div>
                <div style="overflow-y: auto;height: 27.5vh">
                  <el-timeline>
                    <el-timeline-item
                      v-for="(activity, index) in examineHistory"
                      :key="index"
                      color='#61CEAE'
                      :timestamp="activity.timestamp">
                      {{activity.content}}
                    </el-timeline-item>
                  </el-timeline>
                </div>
              </el-card>
              <el-card class="box-card" style="margin-top: 20px;">
                <div slot="header" class="clearfix">
                  <span>操作记录</span>
                </div>
                <div style="overflow-y: auto;height: 27.5vh">
                  <el-timeline>
                    <el-timeline-item
                      v-for="(activity, index) in activities"
                      :key="index"
                      color='#61CEAE'
                      :timestamp="activity.timestamp">
                      {{activity.content}}
                    </el-timeline-item>
                  </el-timeline>
                </div>
              </el-card>

            </el-col>
          </el-row>
        </el-dialog>
    </basic-container>
  </div>
</template>



<script>
import {mapGetters} from "vuex";
import {examFormOption, examineOption} from "@/views/compete/examine/examineOption";
import {
  fetchApplyList,
  fetchDeliverListList, fetchExamineHistory,
  getBottomTimelineInfo,
  getLeftFormInfo, getOptionButtton,
  postExamine
} from "@/api/compete/examine";
import historyPage from './historyExamine'
import {exportExcel} from "@/api/recuit/post/post";

export default {
  name:'examine',
  components:{historyPage},
  data() {
    return{
      activities: [],
      tabIndex:0,
      searchForm: {
        yearTime:new Date().getFullYear()
      }, //搜索条件
      obj:{},//竞聘者表单信息
      option:examFormOption,//竞聘者表单配置项
      centerDialogVisible:false,
      formLabelAlign: {
        userId:'', //用户ID
        name: '', // 竞聘者姓名
        okZy:'', // 通过志愿
        applyTime:'',// 申请时间
        remark:'',//审核意见
        id:'', // 列表ID
      }, //竞聘者配置项
      form: {}, //表单
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20, // 每页显示多少条,
        isAsc: false// 是否倒序
      },
      dicData:[], //申请列表数据
      list: [],
      tableOption:examineOption,
      listLoading: true,
      optionFormButton:null, //按钮权限组
      examineHistory:[], //审核记录
    }
  },
  computed: {
    ...mapGetters(['permissions'])
  },
  watch:{
    centerDialogVisible:function (val){
      if(!val){
        this.formLabelAlign = {
          userId:'', //用户ID
          name: '', // 竞聘者姓名
          okZy:'', // 通过志愿
          applyTime:'',// 申请时间
          remark:'',//审核意见
          id:'', // 列表ID
        };
      }
    }
  },
  methods:{
    //导出
    exportExcel() {
      let queryParams = {
        "token":null,
        "yearTime":this.searchForm.yearTime,
        "postName": this.searchForm.hasOwnProperty("postName") ?  this.searchForm.postName:"",
        "postTypeId":this.searchForm.hasOwnProperty("postTypeId") ? this.searchForm.postTypeId:"",
        "pageNo":this.page.currentPage,
        "pageSize":this.page.pageSize,
        "currentPageNo":"1",
        "currentPageSize":1
      };
      exportExcel("678401837539614720",queryParams).then(res=>{
        const blob = new Blob([res.data]);
        const fileName = '岗位列表.xlsx';
        const linkNode = document.createElement('a');

        linkNode.download = fileName; //a标签的download属性规定下载文件的名称
        linkNode.style.display = 'none';
        linkNode.href = URL.createObjectURL(blob); //生成一个Blob URL
        document.body.appendChild(linkNode);
        linkNode.click();  //模拟在按钮上的一次鼠标单击

        URL.revokeObjectURL(linkNode.href); // 释放URL 对象
        document.body.removeChild(linkNode);
      });
    },
    //提交数据
    handleExamine (type) {
      console.log(type)
      if(type==1 || type==2){
        if (!this.formLabelAlign.okZy){
          this.$message.error('请选择通过的岗位!')
          return;
        }
      }
      if(type==3){
        if(this.formLabelAlign.remark.length<1){
          this.$message.error('请填写审核意见!')
          return;
        }
      }

      const postData = {
        comment:this.formLabelAlign.remark, //审核意见
        // postId:this.formLabelAlign.okZy, //通过的岗位ID
        state:type, //审核状态 1通过无需 2通过待竞 3不通过
        userId:this.formLabelAlign.userId, //用户ID
        id:this.formLabelAlign.id, //列表ID
        taskId:this.obj.taskId, //任务ID
        jpTdId:this.formLabelAlign.id, //岗位投递ID
        submitFlag:type, //审核ID
      };
      postExamine(Object.assign(postData,type==3 ? {}:{passedGwId:this.formLabelAlign.okZy})).then(res=>{
        this.$message.success('操作成功!')
        this.getList(this.page)
        this.centerDialogVisible = false;
      })
    },
    //审核
    handleView(row){
      this.listLoading = true;
      this.formLabelAlign.name = row.candidateName; //名称
      this.formLabelAlign.applyTime = row.createTime; //申请时间
      this.formLabelAlign.userId = row.userId;
      this.formLabelAlign.id = row.id;

      fetchApplyList(row.id).then(res=>{
        this.dicData = res.data.data;
      })

      getLeftFormInfo(row.id).then(res=>{

        this.centerDialogVisible = true;
        this.obj = Object.assign(res.data.data,{});
        getOptionButtton(res.data.data.taskId,false).then(optionRes => {
          this.optionFormButton = optionRes.data.data;
          this.formLabelAlign.okZy = optionRes.data.data.passedGwId;
        })

        fetchExamineHistory(row.id).then(res=>{
          this.examineHistory = res.data.data;
        })
      }).catch(err=>{
      }).finally(()=>{
        this.listLoading = false;
      })

      getBottomTimelineInfo(row.id).then(res=>{
        this.activities = res.data.data;
      });
    },
    getList(page, params) {
      this.listLoading = true
      fetchDeliverListList(Object.assign({},params, this.searchForm),{ current: page.currentPage,
        size: page.pageSize}).then(response => {
        this.list = response.data.data.records
        this.page.total = response.data.data.total
        this.listLoading = false
      })
    },
    searchChange(form, done) {
      this.searchForm = form;
      this.page.currentPage = 1
      this.getList(this.page, form)
      done()
    },
    refreshChange() {
      this.getList(this.page)
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize
    },
    currentChange(current) {
      this.page.currentPage = current
    },
  },
}

</script>


<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 480px;
}

.dialog-exam .el-dialog{
  background: transparent !important;
  box-shadow: none !important;
}
</style>
