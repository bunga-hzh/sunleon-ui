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
          <el-button :type="type" :size="size" @click="handleShowFileView(row)" icon="el-icon-view" >附件文件</el-button>
        </template>
      </avue-crud>
      <file-view ref="fileView" />
    </basic-container>
  </div>
</template>


<script>
import {archiveOption} from "@/views/contract/archive/option/archiveOption";
import {fetchList} from "@/api/contract/archive/archive";
import FileView from "@/views/contract/components/archive/fileView";

export default {
  name:'archive',
  components: {FileView},
  data(){
    return{
      tableOption:archiveOption,
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
    handleShowFileView(row){
      this.$refs.fileView.show(row)
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
