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
          <el-button :type="type" :size="size" icon="el-icon-view" @click="$refs.examinRef.show(row)">审核</el-button>
        </template>
      </avue-crud>
      <examine-view ref="examinRef" @eventresh="handleReload" />
    </basic-container>
  </div>
</template>


<script>
import {examineOption} from "@/views/contract/admin/examine/option/examineOption";
import {fetchList} from "@/api/contract/examine/examine";
import ExamineView from "@/views/contract/components/examine/examineView";

export default {
  name:'examine',
  components: {ExamineView},
  data(){
    return{
      tableOption:examineOption,
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
    handleReload(){
      this.getList(this.page,this.searchForm)
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
