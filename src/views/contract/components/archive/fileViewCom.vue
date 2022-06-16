<template>
    <avue-crud
      ref="crud"
      :option="tableOption"
      :page.sync="page"
      :table-loading="listLoading"
      :data="list"
      @on-load="getList"
      @search-change="searchChange"
      @refresh-change="refreshChange"
      @size-change="sizeChange"
      @current-change="currentChange">
      <template slot-scope="{type,size,row}" slot="menu">
        <el-button :type="type" :size="size" @click="handleDownload(row)" icon="el-icon-view" >下载</el-button>
      </template>
    </avue-crud>
</template>


<script>
import {putArchive} from "@/api/contract/admin/admin";
import {getFileList} from "@/api/contract/archive/archive";

export default {
  name:'fileViewCom',
  data(){
    return{
      open:false,
      propsData:{}, //数据
      tableOption:{
        border: true,
        index: true,
        indexLabel: '序号',
        stripe: true,
        menuAlign: 'center',
        selection: false,
        searchMenuSpan: 6,
        editBtn: false,
        delBtn: false,
        viewBtn: false,
        searchIndex: 3,
        searchIcon: true,
        align: 'center',
        menuHeaderAlign: 'center',
        labelWidth: 120,
        gutter: 60,
        submitBtn: false,
        emptyBtn: false,
        refreshBtn:false,
        columnBtn:false,
        menuBtn:true,
        header:false,
        addBtn: false,
        column: [
          {
            label:'文件名',
            prop:'label'
          },
          {
            label:'创建时间',
            prop:'cjsj'
          }
        ]
      },
      formData:{},
      page:{
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20, // 每页显示多少条,
        isAsc: false// 是否倒序
      },
      list:[],
      listLoading:false
    }
  },
  methods:{
    handleDownload(row){
      const link = document.createElement('a')
      link.href = URL.revokeObjectURL(row.value)
      link.download = row.label;
      document.body.appendChild(link)
      link.click()
      window.setTimeout(function() {
        URL.revokeObjectURL(row.value)
        document.body.removeChild(link)
      }, 0)
    },
    getList(page, params) {
      console.log(this.propsData)
      if(JSON.stringify(this.propsData) =='{}'){
        return;
      }
      this.listLoading = true;
      getFileList({
        current: page.currentPage,
        size: page.pageSize
      },this.propsData.id).then(response=>{
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
    show(row,index){
      this.propsData = row;
      setTimeout(()=>{
        this.getList(this.page)
      },600)
      this.open = true;
    },
  }
}
</script>
