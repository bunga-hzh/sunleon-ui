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
          <el-button type="danger" :size="size" style="margin-left: 20px;"  @click="handleExamineList('0')">结束筛选</el-button>
          <el-button type="primary" icon="el-icon-download" style="margin-left: 20px;" @click="handleExportExcel" :size="size">导出</el-button>
        </template>
        <template slot-scope="{type,size,row}" slot="menu">
          <el-button icon="el-icon-view" :size="size" :type="type" @click="$refs.resumeView.show(row)">查看简历</el-button>

          <el-button icon="el-icon-check" v-if="row.status==0" :size="size" :type="type" @click="handleAdopt(row)">通过筛选</el-button>
          <el-button icon="el-icon-close"  v-if="row.status==0" :size="size" style="color: #F56C6C;" @click="handleRefuse(row)" :type="type">结束筛选</el-button>
        </template>
      </avue-crud>
      <resume-view
        ref="resumeView"
        title="简历查看"
        show-view="23"
        menu-view="034"
        @refreshDataList="handleRefreshChange"
      />
    </basic-container>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {resumeOption} from "@/views/recruit/resume/tableOption";
import {examine, fetchList} from "@/api/recuit/resume/resume";
import resumeView from '@/components/resume/resumeView'
import {exportExcel} from "@/api/recuit/post/post";

/**
 * 简历筛选
 */
export default {
  name:'Resume',
  components:{resumeView},
  data(){
    return{
      searchForm: {
        yearTime:new Date().getFullYear()
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
        "currentPageSize":1
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
      fetchList(Object.assign({}, params, this.searchForm),{
        current: page.currentPage,
        size: page.pageSize
      }).then(response => {
        this.list = response.data.data.records
        this.page.total = response.data.data.total
        this.listLoading = false
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
        if(item.status==0){
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
