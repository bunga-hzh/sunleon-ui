<template>
  <div class="notice">
    <basic-container>
      <avue-crud
        ref="crud"
        :page.sync="page"
        :data="tableData"
        :table-loading="tableLoading"
        :option="tableOption"
        :permission="permissionList"
        @on-load="getList"
        @search-change="searchChange"
        @refresh-change="refreshChange"
        @size-change="sizeChange"
        @current-change="currentChange"
        @row-del="handleDel"/>
    </basic-container>
  </div>
</template>

<script>
import {delObj, fetchList} from '@/api/admin/log'
import {tableOption} from '@/const/crud/admin/log'
import {mapGetters} from 'vuex'
import {noticeTableOption} from "@/views/notice/notice/noticeTableOption";

export default {
  name: 'Notice',
  data(){
    return{
      tableOption:noticeTableOption,
      tableData: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20 // 每页显示多少条
      },
      tableLoading: false,
      searchForm: {},
    }
  },
  computed: {
    ...mapGetters(['permissions']),
    permissionList() {
      return {
        delBtn: this.vaildData(this.permissions.notice_del, false),
        addBtn: this.vaildData(this.permissions.notice_add, false),
        updateBtn: this.vaildData(this.permissions.notice_update, false)
      }
    }
  },
  methods: {
    //获取列表
    getList(page, params){
      // this.tableLoading = true;
      console.log(this.permissions)
    },
    handleDel: function (row) {

    },
    searchChange(form, done) {
      this.searchForm = form
      this.page.currentPage = 1
      this.getList(this.page, form)
      done()
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize
    },
    currentChange(current) {
      this.page.currentPage = current
    },
    refreshChange() {
      this.getList(this.page)
    }
  }
}
</script>
