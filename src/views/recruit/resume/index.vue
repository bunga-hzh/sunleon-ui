<template>
  <div class="execution">
    <basic-container>
      <avue-crud
        ref="crud"
        :search.sync="searchForm"
        :option.sync="tableOption"
        :page.sync="page"
        :table-loading="listLoading"
        :data="list"
        @on-load="getList"
        @search-change="searchChange"
        @refresh-change="refreshChange"
        @size-change="sizeChange"
        @current-change="currentChange"
        >
        <template slot-scope="scope" slot="statusName">
          <el-tag :type=" scope.row.status==0 ? 'warning':'success'">{{scope.row.statusName}}</el-tag>
        </template>
        <template slot="menuLeft" slot-scope="{size}">
          <el-button type="primary" :size="size" @click="handleExamineList('1')">通过筛选</el-button>
          <el-button type="primary" :size="size" style="margin-left: 20px;" @click="handleExamineList('12')">转为待定</el-button>
          <el-button type="primary" :size="size" style="margin-left: 20px;" @click="handleForward">转发简历</el-button>
          <el-button type="danger" :size="size" style="margin-left: 20px;"  @click="handleExamineList('0')">结束筛选</el-button>
          <el-button type="primary" icon="el-icon-download" style="margin-left: 20px;" @click="handleExportExcel" :size="size">导出</el-button>
        </template>
        <template slot-scope="{type,size,row}" slot="menu">
          <el-button icon="el-icon-view" :size="size" :type="type" @click="$refs.resumeView.show(row)">查看简历</el-button>
          <el-button icon="el-icon-check" v-if="row.status==0 || row.status==12" :size="size" :type="type" @click="handleAdopt(row)">通过筛选</el-button>
          <el-button icon="el-icon-check" v-if="row.status==0" :size="size" :type="type" @click="handleUndetermined(row)">转为待定</el-button>
          <el-button icon="el-icon-close"  v-if="row.status==0 || row.status==12" :size="size" style="color: #F56C6C;" @click="handleRefuse(row)" :type="type">结束筛选</el-button>
        </template>
      </avue-crud>
      <resume-view
        ref="resumeView"
        title="简历查看"
        show-view="23"
        menu-view="034"
        @refreshDataList="handleRefreshChange"
      />
      <el-dialog title="发送至"
                 top="0vh"
                 :destroy-on-close="true"
                 :visible.sync="forwardState"
                 class="avue-dialog avue-dialog--top"
                 :before-close="handleForwardDialog"
                 width="60%">
        <avue-crud
          ref="userCrud"
          :option="userOption"
          :page.sync="userPage"
          :table-loading="userListLoading"
          :data="userList"
          @on-load="getUserList"
          @refresh-change="userRefreshChange"
          @search-change="userSearchChange"
          @size-change="userSizeChange"
          @current-change="userCurrentChange">
        </avue-crud>
        <div class="avue-dialog__footer">
          <el-button @click="forwardState=false">取 消</el-button>
          <el-button @click="handleSendNotice" type="primary">确 定</el-button>
        </div>
      </el-dialog>
    </basic-container>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {resumeOption, tableOption} from "@/views/recruit/resume/tableOption";
import {examine, fetchList} from "@/api/recuit/resume/resume";
import resumeView from '@/components/resume/resumeView'
import {exportExcel, sendPlatFormNotice} from "@/api/recuit/post/post";
import {fetchList as fetchUserList} from '@/api/admin/user'

/**
 * 简历筛选
 */
export default {
  name:'Resume',
  components:{resumeView},
  data(){
    return{
      forwardState:false,
      userOption:tableOption,
      userPage:{
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10, // 每页显示多少条,
        isAsc: false// 是否倒序
      },
      userListLoading:false,
      userSearchForm:{},
      userList:[],
      searchForm: {
      }, //搜索条件
      form: {}, //表单
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20, // 每页显示多少条
      },
      list: [],
      tableOption:resumeOption,
      listLoading: false,
    }
  },
  computed: {
    ...mapGetters(['permissions'])
  },
  methods:{
    handleForwardDialog(done){
      this.userPage = {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10, // 每页显示多少条,
        isAsc: false// 是否倒序
      };
      this.userList = [];
      done();
    },
    getUserList(page, params) {
      this.userListLoading = true
      fetchUserList(Object.assign({
        current: page.currentPage,
        size: page.pageSize
      }, params, this.userSearchForm)).then(response => {
        this.userList = response.data.data.records
        this.userPage.total = response.data.data.total
        this.userListLoading = false
      })
    },
    userSearchChange(form, done) {
      this.userPage.currentPage = 1
      this.getUserList(this.userPage, form)
      done()
    },
    userRefreshChange() {
      this.getUserList(this.userPage)
    },
    userSizeChange(pageSize) {
      this.userPage.pageSize = pageSize
    },
    userCurrentChange(current) {
      this.userPage.currentPage = current
    },
    //转发简历
    handleForward(){
      const tempList = this.$refs.crud.tableSelect;
      if(tempList.length<1){
        this.$message.error("请勾选列表！")
        return;
      }
      this.forwardState = true;
    },
    handleSendNotice(){
      const userIdList = this.$refs.userCrud.tableSelect;

      if(userIdList.length<1){
        this.$message.error("请勾选发送的老师！")
        return;
      }

      const tempList = this.$refs.crud.tableSelect;
      let receiverIds = [];
      tempList.map((item)=>{
        receiverIds.push(item.userId)
      })

      let frontUserIds = [];
      userIdList.map((item)=>{
        frontUserIds.push(item.userId)
      })

      let putData = {
        frontUserIds:frontUserIds,
        receiverIds:receiverIds,
        routePath:"/mail/resume/"
      };

      sendPlatFormNotice(putData).then(res=>{
        this.$notify({
          title:'温馨提示',
          message:'发送成功!',
          type:'success'
        })
        this.forwardState = false;
      })

    },
    //导出
    handleExportExcel(){

      let queryParams = {
        "token":null,
        "yearTime":this.searchForm.yearTime,
        "candidateName": this.searchForm.hasOwnProperty("candidateName") ?  this.searchForm.candidateName:"",
        "education":this.searchForm.hasOwnProperty("education") ? this.searchForm.education:"",
        "isShHousehold":this.searchForm.hasOwnProperty("isShHousehold") ? this.searchForm.isShHousehold:"",
        "residencePermitSh":this.searchForm.hasOwnProperty("residencePermitSh") ? this.searchForm.residencePermitSh:"",
        "interviewNumber":"",
        "postNameIds":this.searchForm.hasOwnProperty("postNameIds") ? this.searchForm.postNameIds.toString():"",
        "pageNo":this.page.currentPage,
        "pageSize":this.page.pageSize,
        "currentPageNo":"1",
        "currentPageSize":1,
        "status":this.searchForm.hasOwnProperty("status") ? this.searchForm.status.toString():"",
        "isTeacherCertificate":this.searchForm.hasOwnProperty("isTeacherCertificate") ? this.searchForm.isTeacherCertificate.toString():"",
      };
      exportExcel("670976870393475072",queryParams).then(res=>{
        const blob = new Blob([res.data]);
        const fileName = '简历筛选表.xlsx';
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
    handleRefreshChange(){
      this.getList(this.page, this.form)
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
    //转为待定状态
    handleUndetermined(row){
      examine("12",[row.id]).then(res=>{
        this.getList(this.page, this.form)
      }).catch(err=>{

      })
    },
    //通过
    handleAdopt(row){
      examine("1",[row.id]).then(res=>{
        this.getList(this.page, this.form)
      }).catch(err=>{

      })
    },
    handleRefuse(row){
      examine("0",[row.id]).then(res=>{
        this.getList(this.page, this.form)
      }).catch(err=>{
      })
    },
    //批量审核
    handleExamineList(type){
      const tempList = this.$refs.crud.tableSelect;
      if(tempList.length<1){
        this.$message.error("请勾选列表！")
        return;
      }
      let array = [];
      let isStatus = false;
      tempList.map((item)=>{
        if(item.status==0 || item.status == 12){
          array.push(item.id)
        }else{
          isStatus = true;
        }
      })

      if(array.length<1){
        this.$message.warning("所选择的应聘者已处理，无法再次处理!")
        return;
      }else{
        this.$message.warning("所选择的应聘者存在已处理的数据，系统将忽略对应的应聘者!")
      }
      examine(type,array).then(res=>{
        this.$message.success("筛选成功!")
        this.getList(this.page, this.form)
      }).catch(err=>{

      })
    },
    searchChange(form, done) {
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


  }
}

</script>
