<template>
  <div>
    <!-- 简历对话框 -->
    <el-dialog
      :visible.sync="resume.open"
      width="100%"
      class="dialog-resume"
      top="0vh"
      append-to-body
      :show-close="false"
    >
      <el-row :gutter="14">
        <el-col :span="14">
          <el-card>
            <iframe style="width: 100%;height: calc(100vh - 10vh);border-width: 0px;" :src="'/act/jmreport/view/671004993319235584?token=null&user_id='+userId" />
          </el-card>
        </el-col>
        <el-col :span="10">
          <el-card style="height: 176px">
            <div slot="header" class="clearfix">
              <span>操作</span>
              <el-button style="float: right;" @click="resume.open=false" size="mini" icon="el-icon-close" circle></el-button>
            </div>
            <el-row :gutter="16" type="flex" justify="start">
              <el-col :span="4" v-if="menuView.indexOf('0')!= -1" >
                <el-button type="primary" icon="el-icon-check" v-if="row.status==0" @click="handleExamine" plain>通过筛选</el-button>
              </el-col>
              <el-col :span="4" v-if="menuView.indexOf('1')!= -1">
                <el-button type="primary" icon="el-icon-time" @click="handleAdopt"  plain>{{row.reserveId ? '修改预约':'面试预约'}}</el-button>
              </el-col>
              <el-col :span="4" v-if="menuView.indexOf('2')!= -1 && row.resumeStatus==6">
                <el-button type="primary" icon="el-icon-chat-round" @click="handleArrange" plain>面试安排</el-button>
              </el-col>
<!--              <el-col :span="6">-->
<!--                <el-button type="info" icon="el-icon-printer" @click="handlePrinter" plain>打印简历</el-button>-->
<!--              </el-col>-->
              <el-col :span="4" v-if="menuView.indexOf('3')!= -1">
                <el-button type="info" icon="el-icon-download" plain @click="handleExport">下载附件简历</el-button>
              </el-col>
              <el-col :span="4" v-if="menuView.indexOf('4')!= -1">
                <el-button type="danger" icon="el-icon-close"  v-if="row.status==0" @click="handleStop" plain>面试结束</el-button>
              </el-col>
            </el-row>
          </el-card>
          <div>
            <el-card style="margin-top: 20px;" v-if="showView.indexOf('4')!=-1 && row.deliveryId">
              <div slot="header" class="clearfix">
                <span>当前环节评分</span>
              </div>
              <avue-crud :data="currentData" :option="option" ></avue-crud>

            </el-card>
            <el-card style="margin-top: 20px;" v-if="showView.indexOf('2')!=-1 && row.deliveryId">
              <div slot="header" class="clearfix">
                <span>面试记录</span>
              </div>
              <el-empty v-if="activities.length<1" description="暂无记录"></el-empty>
              <el-timeline v-else>
                <el-timeline-item
                  placement="top"
                  v-for="(activity, index) in activities"
                  :key="index"
                  :timestamp="activity.operationTime">
                  <el-card class="scope-view">
                    <h4>{{activity.number}}面得分{{activity.fraction}}</h4>
                    <div v-for="(item,indexs) in activity.scoreUserVOS" :key="indexs">
                      <p>{{item.userName}}:{{item.score}}</p>
                    </div>
                  </el-card>
                </el-timeline-item>
              </el-timeline>
            </el-card>

            <el-card style="margin-top: 20px;" v-if="showView.indexOf('3')!=-1">
              <div slot="header" class="clearfix">
                <span>操作记录</span>
              </div>
              <el-empty v-if="operationList.length<1" description="暂无记录"></el-empty>
              <div v-else style="height: 20vh;overflow-y: auto;">
                <el-timeline >
                  <el-timeline-item
                    v-for="(activity, index) in operationList"
                    :key="index"
                    :timestamp="activity.cjsj">
                    {{activity.cznr}}
                  </el-timeline-item>
                </el-timeline>
              </div>
            </el-card>

            <el-card style="margin-top: 20px;" v-if="showView.indexOf('3')!=-1">
              <div slot="header" class="clearfix">
                <span>简历修改记录</span>
              </div>
<!--              <el-empty v-if="resumeRecordList.length<1" description="暂无记录"></el-empty>-->
              <div>
                <avue-crud
                  ref="crud"
                  :option="recordOption"
                  :page.sync="page"
                  :table-loading="listLoading"
                  :data="resumeRecordList"
                  @on-load="getList"
                  @search-change="searchChange"
                  @refresh-change="refreshChange"
                  @size-change="sizeChange"
                  @current-change="currentChange">
                </avue-crud>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>



<script>
import {examine} from "@/api/recuit/resume/resume";
import {
  downloadResume,
  getCurrentRecord,
  getInterviewRecord,
  getOperationByKey,
  getUpdateResumeRecord
} from "@/api/recuit/common/commonApi";

export default {
  name: "resumeView",
  components: {},
  props: {
    url: {
      type: String
    },
    title: {
      type: String
    },
    showView:{ //2:面试记录,3:操作记录
      type:String
    },
    menuView:{//按钮控制
      type:String
    },
    tempUrl: {
      type: String
    },
    tempName: {
      type: String
    }
  },
  data() {
    return {
      resumeRecordList:[],
      page:{
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20, // 每页显示多少条,
        isAsc: false// 是否倒序
      },
      listLoading:false,
      recordOption:{
        border: true,
        index: true,
        indexLabel: '序号',
        stripe: true,
        menuAlign: 'center',
        selection: false,
        searchMenu:false,
        editBtn: false,
        delBtn: false,
        viewBtn: false,
        addTitle: '新增招聘岗位',
        editTitle: '修改招聘岗位',
        align: 'left',
        menuWidth: 280,
        height:300,
        menu:false,
        refreshBtn:false,
        columnBtn:false,
        menuHeaderAlign: 'center',
        labelWidth: 120,
        gutter: 60,
        addBtn: false,
        column: [
          {
            label:'修改记录',
            prop:'content'
          },
          {
            label:'修改时间',
            prop:'createTime'
          }
        ]
      },
      resume:{
        open:false
      },
      userId:'', //用户ID
      activities:[], //面试记录
      operationList:[], //操作记录
      currentList:[], //当前评分记录
      row:{},
      currentData:[], //当前面试记录
      option:{
        menu:false,
        addBtn:false,
        refreshBtn:false,
        filterBtn:false,
        columnBtn:false,
        column:[
          {
            label:'面试管',
            prop:'userName'
          },
          {
            label:'分数',
            prop:'fraction'
          }
        ]
      }
    }
  },
  methods:{
    getList(page, params) {
      this.listLoading = true
      getUpdateResumeRecord(Object.assign({userId:this.userId},params),{ current: page.currentPage,
        size: page.pageSize}).then(response => {
        this.resumeRecordList = response.data.data.records
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
    //结束面试
    handleStop(){

    },
    handleExport(){
      downloadResume(this.userId).then(response=>{
        // 前提是服务端要在header设置Access-Control-Expose-Headers: Content-Disposition
        // 前端才能正常获取到Content-Disposition内容
        const disposition = response.headers['content-disposition'];
        let fileName = disposition.substring(disposition.indexOf('filename=') + 9, disposition.length);
        // iso8859-1的字符转换成中文
        fileName = decodeURI(escape(fileName));
        // 去掉双引号
        fileName = fileName.replace(/\"/g, "");
        const content = response.data;
        console.info("rep:", disposition);
        console.info("fileName:", fileName);
        // 创建a标签并点击， 即触发下载
        let url = window.URL.createObjectURL(new Blob([content]));
        let link = document.createElement("a");
        link.style.display = "none";
        link.href = url;
        link.setAttribute("download", fileName);
        //link.download = "测试下载文件.xls"
        // 模拟
        document.body.appendChild(link);
        link.click();
        // 释放URL 对象
        window.URL.revokeObjectURL(link.href);
        document.body.removeChild(link);
      })
    },

    //面试预约
    handleAdopt(){
      this.$emit("adopt",this.row,this.row.reserveId ? 1:0);
    },
    //面试安排
    handleArrange(){
      this.$emit("arrange",this.row,0);
    },
    //通过审核
    handleExamine(){
      examine("1",[this.row.id]).then(res=>{
        this.$message.success("通过成功!");
        this.resume.open = false;
        // 刷新表格
        this.$emit("refreshDataList");
      }).catch(err=>{
      })
    },
    show(row,index) {
      if(row.deliveryId){
        //获取操作记录
        getOperationByKey(row.deliveryId).then(res=>{
          this.operationList = res.data.data;
        })

        //获取面试记录
        getInterviewRecord(row.deliveryId).then(res=>{
          this.activities = res.data.data;
        })

        if(index == 'current'){
          getCurrentRecord(row.deliveryId,row.interviewNumber).then((res)=>{
            console.log(res.data.data)
            this.currentData = res.data.data;
          })
        }
      }
      this.getList(this.page);

      this.userId = row.userId;
      this.resume.open = true;
      this.row = row;
    }
  }
}
</script>


<style>

.dialog-resume .el-dialog{
  background: transparent !important;
  box-shadow: none !important;
}

.scope-view .el-card__body{
  padding: 0px 20px !important;
}

</style>
