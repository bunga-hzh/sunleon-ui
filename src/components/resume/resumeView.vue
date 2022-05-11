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
            <iframe style="width: 100%;height: calc(100vh - 30vh);border-width: 0px;" :src="'http://192.168.187.121:9999/act/jmreport/view/671004993319235584?token=null&user_id='+userId" />
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
            <el-card style="margin-top: 20px;" v-if="showView.indexOf('4')!=-1">
              <div slot="header" class="clearfix">
                <span>当前环节评分</span>
              </div>
<!--              <el-empty v-if="currentList.length<1" description="暂无记录"></el-empty>-->
              <avue-crud :data="currentData" :option="option" ></avue-crud>

            </el-card>
            <el-card style="margin-top: 20px;" v-if="showView.indexOf('2')!=-1">
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
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>



<script>
import {examine} from "@/api/recuit/resume/resume";
import {getCurrentRecord, getInterviewRecord, getOperationByKey} from "@/api/recuit/common/commonApi";

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
    //结束面试
    handleStop(){

    },
    handleExport(){

      // let Params = {"printAll":true,"token":"null","user_id":this.userId,"pageNo":1,"pageSize":1,"currentPageNo":"1","currentPageSize":1};
      // window.open(encodeURI('http://192.168.187.121:9999/act/jmreport/show?id=671004993319235584&params='+Params));
      // http://192.168.187.121:9999/act/jmreport/show?id=671004993319235584&params=
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
