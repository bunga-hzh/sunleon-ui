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
          <el-button :type="type" :size="size" icon="el-icon-view" @click="$refs.preView.show(row)"  >预览</el-button>
          <el-button :type="type" :size="size" icon="el-icon-edit" @click="handleEdit(row)" v-if="row.htzt==0 || row.gtzt==3">编辑</el-button>
          <el-button :type="type" :size="size" icon="el-icon-s-check" @click="handleSubmit(row)" v-if="(row.htzt==0 || row.gtzt==3)">提交审批</el-button>
          <el-button :type="type" :size="size" icon="el-icon-files" @click="$refs.archiveView.show(row)" v-if="(row.htzt==0 || row.htzt==1 || row.htzt==3 || row.htzt==4) ? false:true">归档</el-button>
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
import {fetchMyList, genContractFile, getPreViewUrl, submitHT} from "@/api/contract/admin/admin";
import { openWindow } from '@/util/util';

export default {
  name: 'myApply',
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
    //提交审核
    handleSubmit(row){
      if(row.isHtComplete){
        submitHT(row.id).then(res=>{
          this.$notify({
            type:'success',
            message:'提交成功，请等待审核完成!'
          })
        })
      }else{
        this.$notify({
          type:'warning',
          message:'请完善合同信息后进行提交！'
        })
      }
    },
    //打印
    handlePrinter(row){
      getPreViewUrl(row.id).then(res=>{
        const view_url = 'http://192.168.187.121:8012/onlinePreview?url='+encodeURIComponent(Base64.encode(res.data.data));
        openWindow(view_url, row.fileName, 1024, 768)
        // this.preViewUrl =
        // res.data.data;
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
      const params = {
        view: 1,
        lxId: row.htlx,
        id: row.id
      };
      const{ href } = this.$router.resolve({
        path:"/contract/edit/"+row.id,
        query: {
          params: encodeURIComponent(JSON.stringify(params))
        }
      });
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
      fetchMyList({
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
