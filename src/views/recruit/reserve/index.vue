<template>
  <div class="post">
    <basic-container>
       <avue-crud
        ref="crud"
        :option="tableOption"
        :search.sync="searchForm"
        v-model="form"
        :page.sync="page"
        :table-loading="listLoading"
        :data="list"
        @on-load="getList"
        @search-change="searchChange"
        @refresh-change="refreshChange"
        @size-change="sizeChange"
        @current-change="currentChange">
         <template slot-scope="{disabled,size}" slot="gwlxIdSearch">
           <el-select v-model="searchForm.gwlxId" clearable placeholder="请选择" @change="GetCurId1">
             <el-option
               v-for="item in gwlxDict"
               :key="item.value"
               :label="item.label"
               :value="item.value">
             </el-option>
           </el-select>
         </template>
         <template slot-scope="{disabled,size}" slot="postNameIdsSearch">
           <el-select ref="postRef" v-model="searchForm.postNameIds" multiple clearable placeholder="请选择">
             <el-option
               v-for="item in postDict"
               :key="item.id"
               :label="item.name"
               :value="item.id">
             </el-option>
           </el-select>
         </template>
         <template slot="menuLeft" slot-scope="{size}">
           <el-button type="primary" icon="el-icon-download" @click="handleExportExcel" :size="size">导出</el-button>
         </template>
         <template slot-scope="scope" slot="resumeStatusName">
           <el-tag :type=" (scope.row.resumeStatus==3 || scope.row.resumeStatus==-2) ? 'warning':'success'">{{scope.row.resumeStatusName}}</el-tag>
         </template>
         <template slot-scope="{type,size,row}" slot="menu">
          <el-button icon="el-icon-view" :size="size" :type="type" @click="$refs.resumeView.show(row)">查看简历</el-button>
           <el-button icon="el-icon-back" v-if="row.resumeStatus==4 || row.resumeStatus==5" :size="size" :type="type" @click="handleCallBack(row)">撤回预约</el-button>
           <el-button icon="el-icon-back" v-if="row.resumeStatus==-1 && row.jsmsId==0" :size="size" :type="type" @click="handleStopCallBack(row)">撤回结束</el-button>
          <span v-if="row.resumeStatus!=-1">
            <el-button v-if="row.resumeStatus== -3" icon="el-icon-view" :size="size" :type="type" @click="handleConfirm(row,true)">通过</el-button>
            <el-button v-if="row.resumeStatus== -3" icon="el-icon-view" :size="size" :type="type" @click="handleConfirm(row,false)">驳回</el-button>
            <el-button v-if="row.resumeStatus==3 || row.resumeStatus==-2" :disabled="row.resumeStatus == -2 ? true:false" icon="el-icon-check" :size="size" :type="type" @click="handleAdopt(row,0)">预约</el-button>
            <el-button v-if="row.resumeStatus==5" icon="el-icon-edit" :size="size" :type="type" @click="handleAdopt(row,1)">修改预约</el-button>
            <el-button icon="el-icon-close" :size="size" v-if="row.resumeStatus!=11" style="color: #F56C6C;" @click="handleRefuse(row)" :type="type">结束面试</el-button>
          </span>
        </template>
       </avue-crud>

      <resume-view
        ref="resumeView"
        title="简历查看"
        show-view="23"
        menu-view="134"
        @adopt="handleAdopt(arguments[0],arguments[1])"
      />

    </basic-container>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {reserveOption,formOption} from './tableOption'
import {
  confirmResume,
  examState,
  fetchList,
  postReserveData,
  setCallback,
  setStopCallBack
} from "@/api/recuit/reserve/reserve";
import {getConstantByKey, getDictByType, getPostNameById} from "@/api/recuit/common/commonApi";
import resumeView from '@/components/resume/resumeView'
import {examine} from "@/api/recuit/resume/resume";
import {exportExcel} from "@/api/recuit/post/post";

export default {
  name:'Reserve',
  components:{resumeView},
  data(){
    return {
      tableOption:reserveOption,
      searchForm: {
      }, //搜索条件
      form: {}, //表单
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20, // 每页显示多少条,
        isAsc: false// 是否倒序
      },
      list: [],
      listLoading: true,
      fixedAddress:'', //固定地址
      gwlxDict:[],//岗位类型
      postDict:[],//岗位名称
    }
  },
  computed: {
    ...mapGetters(['permissions'])
  },
  created() {
    this.getFixedAddress();
    getDictByType('post_type').then(res=>{
      this.gwlxDict = res.data.data.items;
    })
  },
  methods:{
    GetCurId1(val){
      this.searchForm.postNameIds = [];
      if(val){
        getPostNameById(val).then(res=>{
          this.postDict = res.data.data;
        })
      }
    },
    handleStopCallBack(row){
      setStopCallBack(row.deliveryId).then(res=>{
        this.getList(this.page);
      })
    },
    handleCallBack(row){
      setCallback(row.reserveId,'return_yy').then(res=>{
        this.getList(this.page);
      })
    },
    handleConfirm(row,type){
      if(type==false){
        this.$DialogForm.show({
          title: '审核确认',
          width: '50%',
          menuPosition: 'right',
          option: {
            submitText: '确认',
            span: 24,
            column: [
              {
                label: "反馈消息",
                prop: "msg",
                maxlength: 50,
                showWordLimit: true,
                type: 'textarea'
              }
            ]
          },
          beforeClose: (done) => {
            done()
          },
          callback: (res) => {
            confirmResume({
              reserveId:row.reserveId,
              deliveryId:row.deliveryId,
              userId:row.userId,
              isAdopt: type,
              content:res.data.msg
            }).then((resx=>{
              this.$message({
                type: 'success',
                message: '操作成功!'
              });
              res.done()
              res.close()
              this.getList(this.page);
            }))
          }
        });
      }else{
        confirmResume({
          reserveId:row.reserveId,
          deliveryId:row.deliveryId,
          userId:row.userId,
          isAdopt: type
        }).then((res=>{
          this.$message({
            type: 'success',
            message: '操作成功!'
          });
          this.getList(this.page);
        }))
      }
    },
    //导出
    handleExportExcel(){
      let queryParams = {
        "token":null,
        "yearTime": this.searchForm.yearTime,
        "candidateName": this.searchForm.hasOwnProperty("candidateName")  ? this.searchForm.candidateName:"",
        "interviewTimeStr":this.searchForm.hasOwnProperty("interviewTime") ? this.searchForm.interviewTime.toString():"",
        "postNameIdsStr":this.searchForm.hasOwnProperty("postNameIds") ? this.searchForm.postNameIds.toString():"",
        "gwlxId":this.searchForm.hasOwnProperty("gwlxId") ? this.searchForm.gwlxId:"",
        "user_id":1,
        "pageNo":this.page.currentPage,
        "pageSize":this.page.pageSize,
        "currentPageNo":"1",
        "currentPageSize":10
      };
      exportExcel("676591499043233792",queryParams).then(res=>{
        const blob = new Blob([res.data]);
        const fileName = '面试预约统计表.xlsx';
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
    handleRefuse(row){
      this.$DialogForm.show({
        title: '结束确认',
        width: '50%',
        menuPosition:'right',
        option: {
          submitText: '确认',
          span:24,
          column: [
            {
              label: "发送短信",
              prop: "sms",
              type: 'switch',
              value:0,
            },
            {
              label: "结束消息",
              prop: "msg",
              maxlength:50,
              showWordLimit:true,
              type:'textarea',
              rules: [{
                required: true,
                message: "请输入结束面试消息",
                trigger: "blur"
              }],
            }
          ]
        },
        beforeClose: (done) => {
          done()
        },
        callback:(res)=>{
          examState(row.deliveryId,res.data.msg,0,res.data.sms==0 ? false:true).then(resx=>{
            res.done()
            res.close()
            this.getList(this.page, this.form)
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
          }).catch(err=>{
          })
        }
      })
      // this.$confirm('此操作将结束该应聘者面试, 是否继续?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      //   examState(row.deliveryId).then(res=>{
      //     this.getList(this.page, this.form)
      //     this.$message({
      //       type: 'success',
      //       message: '操作成功!'
      //     });
      //   }).catch(err=>{
      //   })
      // }).catch(() => { });

    },
    getFixedAddress(){
      getConstantByKey("ZP_MS_DZ").then((res)=>{
        this.fixedAddress = res.data.data;
      })
    },
    getList(page, params) {
      this.listLoading = true;
      fetchList(Object.assign({}, params),{
        current: page.currentPage,
        size: page.pageSize
      }).then(response => {
        this.list = response.data.data.records
        this.page.total = response.data.data.total
        this.listLoading = false
      })
    },
    //弹出表单
    handleAdopt(row,type){
      var nowDate = new Date();
      var year = nowDate.getFullYear();
      var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1)
        : nowDate.getMonth() + 1;
      var day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate
        .getDate();
      var dateStr = year + "-" + month + "-" + day;
      let date = new Date();
      this.$DialogForm.show({
          title: `面试预约 - ${row.resumeStatusName}`,
          width: '50%',
          option:formOption.option,
          data:
            Object.assign( {
            name:row.candidateName,
            address:this.fixedAddress,
            detailAddress:row.address,
            interviewTime:row.interviewTime ? row.interviewTime:dateStr+" 08:00:00",
            remark:row.remarks,
            zdyxx:row.zdyxx,
          },type==1 ?{feedback:row.feedback}:null),
          beforeClose: (done) => {
            done()
          },
          callback:(res)=>{
            const postData = {
              id:row.reserveId, //预约ID，如已预约则存在值，反之提交null
              feedback:res.data.feedback, //预约状态反馈
              interviewTime:res.data.interviewTime, //面试时间
              address:res.data.detailAddress, //面试地点
              remarks:res.data.remark, //备注
              deliveryId:row.deliveryId, //投递的岗位ID
              userId:row.userId, //用户ID
              zdyxx:res.data.zdyxx,
              postName:row.postName
            };
            postReserveData(postData).then((resx)=>{
              res.close();
              this.getList(this.page);
            }).catch((err)=>{
              this.$message.error(JSON.stringify(err))
              res.done();
            })
          }
      });
    },
    searchChange(form, done) {
      console.log(form)
      console.log(this.searchForm)
      this.page.currentPage = 1
      this.searchForm = form;
      // if(a.postNameIds==''){
      //   a.postNameIds = [];
      // }
      // this.searchForm = a;
      this.getList(this.page, this.searchForm)
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
  }
}

</script>
