<template>
  <div class="execution">
    <basic-container>
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
        <template slot-scope="{type,size,row}" slot="menu">
          <el-button :type="type" :size="size" icon="el-icon-view" @click="$refs.preView.show(row)" >预览</el-button>
          <el-button :type="type" :size="size" icon="el-icon-view" v-if="(row.htzt==0 || row.htzt==1 || row.htzt==3 || row.htzt==4) ? false: row.zbjZt==0 ?  row.sfzbj==0 ?false:true:false"  @click="handleCheck(row,false)" >验收</el-button>
          <el-button :type="type" :size="size" icon="el-icon-view" v-if="(row.htzt==0 || row.htzt==1 || row.htzt==3 || row.htzt==4) ? false: row.zbjZt==1 ? row.sfzbj==0 ?false:true:false" @click="handleCheck(row,true)" >退回质保金</el-button>
          <el-button :type="type" :size="size" icon="el-icon-files" @click="$refs.archiveView.show(row)"  v-if="(row.htzt==0 || row.htzt==1 || row.htzt==3 || row.htzt==4) ? false:true">归档</el-button>
          <el-button :type="type" :size="size" icon="el-icon-view" @click="$refs.auditRecords.show(row)">审核记录</el-button>
        </template>
      </avue-crud>
      <!--excel 模板导入 -->
      <excel-upload
        ref="excelUpload"
        title="采购表导入"
        url="/act/htGl/contractImport "
        temp-name="采购表模板.xls"
        temp-url="/admin/sys-file/res/template/jpgwmb.xls"
        @refreshDataList="handleRefreshChange"
      ></excel-upload>
      <audit-records ref="auditRecords" />
      <archive-view ref="archiveView" />
      <pre-view  ref="preView"/>
    </basic-container>
  </div>
</template>

<script>
import {adminOption} from "@/views/contract/admin/option/adminOption";
import ExcelUpload from "@/components/upload/excel";
import AuditRecords from "@/views/contract/components/auditRecords/auditRecords";
import ArchiveView from "@/views/contract/components/archive/archiveComponent";
import PreView from "@/views/contract/components/preview/preView";
import {fetchList, genContractFile, getPreViewUrl, putCheckContract} from "@/api/contract/admin/admin";
import { openWindow } from '@/util/util';

export default {
  name: 'contractAdmin',
  components: {PreView, ArchiveView, AuditRecords, ExcelUpload },
  data(){
    return{
      tableOption:adminOption,
      form:{},
      page:{
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20, // 每页显示多少条,
        isAsc: false// 是否倒序
      },
      list:[],
      listLoading:false,
    }
  },
  methods:{
    //验收
    handleCheck(row,callback){
      this.$DialogForm.show({
        title: callback ? '退回质保金':`合同验收`,
        option: {
          submitText: '确认',
          span:24,
          column: [
            {
              label: callback ? '退回质保金时间':"验收时间",
              prop: "yssj",
              type:'date',
              labelWidth:180,
              format:'yyyy年MM月dd日',
              valueFormat:'yyyy-MM-dd',
              rules: [{
                required: true,
                message: callback ? '请输入退回质保金时间':"请输入验收时间",
                trigger: "blur"
              }],
            }]
        },
        beforeClose: (done) => {
          done()
        },
        callback: (res) => {
          const putData = {
            htId:row.id,
            status: callback ? 2:1,
            time:res.data.yssj
          };
          putCheckContract(putData).then(success=>{
            this.$message.success(callback ? "退回成功！":"验收成功！");
            this.getList(this.page);
            res.close()
          }).catch((err)=>{
            this.$message.error(JSON.stringify(err))
            res.done();
          })
        }
      })
    },
    //打印
    handlePrinter(row){
      getPreViewUrl(row.id).then(res=>{
        const view_url = 'http://172.16.1.8:8012/onlinePreview?url='+encodeURIComponent(Base64.encode(res.data.data));
        openWindow(view_url, row.fileName, 1024, 768)
      })
    },
    //申请合同
    handleGeneratePdf(row){
      genContractFile(row.id).then(res=>{
        this.$notify({
          type:'success',
          message:'合同生成中，请稍后刷新查看!'
        })
      })
    },
    handleEdit(row){
      const{ href } = this.$router.resolve({path:"/contract/edit/"+row.id});
      window.open(href, "_blank");
    },
    handleOpenDraft(){
      // let href = "/contract/edit/1"; //网站链接
      const{ href } = this.$router.resolve({path:"/contract/edit/"+1});
      window.open(href, "_blank");
    },
    handleRefreshChange() {
      this.getList(this.page);
    },
    getList(page, params) {
      this.listLoading = true;
      fetchList({
        current: page.currentPage,
        size: page.pageSize
      },params).then(response=>{
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
  }
}
</script>
