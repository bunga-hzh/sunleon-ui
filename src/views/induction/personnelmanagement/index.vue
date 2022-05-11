<template>
  <div class="post">
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
        <template slot-scope="{type,size,row,index}" slot="menu">
          <el-button icon="el-icon-view" :size="size" @click="handleConfirm(row,false)" style="margin-left: 10px" :type="type">查看人员信息</el-button>
          <el-button icon="el-icon-edit" :size="size" @click="handleConfirm(row,true)" style="margin-left: 10px" :type="type">录入信息</el-button>
        </template>
      </avue-crud>
    </basic-container>
  </div>
</template>



<script>
import {mapGetters} from "vuex";
import {pmOption} from "./pm";
import inductionView from "@/components/induction-components/inductionView";
import {fetchInductionList} from "@/api/induction/induction";


export default {
  name: 'personnelM',
  components:{inductionView},
  data() {
    return {
      searchForm: {
        yearTime:new Date().getFullYear()
      }, //搜索条件
      form: {}, //表单
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20, // 每页显示多少条,
        isAsc: false// 是否倒序
      },
      list: [],
      tableOption:pmOption,
      listLoading: true,
    }
  },
  methods:{
    handleConfirm(row,bool){
      const name = `${row.candidateName}的基本信息`,
        src = `/induction/induction-info/${row.id}`
      this.$router.push({
        path: src,
        query: {
          name: name
        }
      })
    },
    getList(page, params) {
      this.listLoading = true
      fetchInductionList(Object.assign({}, params, this.searchForm),{
        current: page.currentPage,
        size: page.pageSize
      }).then(response => {
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
