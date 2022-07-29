<template>
  <basic-container>
    <avue-crud
      ref="crud"
      :data="data"
      :option="option"
      :page.sync="page"
      :table-loading="showLoading"
      :permission="permissionList"
      @on-load="onLoad"
      @row-update="rowUpdate"
      @refresh-change="refreshChange"
      @search-change="searchChange"
    >
      <template slot="menuLeft">
        <el-button type="primary" icon="el-icon-upload">导入</el-button>
        <el-button type="primary" icon="el-icon-download">导出</el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
import { option } from './option'
import { mapGetters } from "vuex"
import { fetchList, addObj, putObj, delObj } from "@/api/salary/commonApi"

export default {
  data () {
    return {
      data: [],
      option: option,
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
      },
      showLoading: false,
    }
  },
  computed: {
    ...mapGetters(["permissions"]),
    permissionList () {
      return {
        viewBtn: this.vaildData(this.permissions.sal_staffinfo_view, false),
        editBtn: this.vaildData(this.permissions.sal_staffinfo_add_edit, false),
        delBtn: this.vaildData(this.permissions.sal_staffinfo_del, false),
      }
    },
  },
  methods: {
    async getList (query) {
      this.showLoading = true
      const { data: res } = await fetchList(
        "staffinfo",
        Object.assign(
          {
            current: this.page.currentPage,
            size: this.page.pageSize,
          },
          query
        )
      )
      if (res.code != 0) return this.$message.error(res.msg)
      this.page.total = res.data.total
      this.data = res.data.records
      this.showLoading = false
      this.$nextTick(() => {
        this.$refs.crud.dicInit('cascader')
      })
    },
    onLoad () {
      this.getList()
    },
    refreshChange () {
      this.getList()
    },
    searchChange (params, done) {
      this.page.currentPage = 1
      this.getList(params)
      done()
    },
    async rowUpdate (form, index, done, loading) {
      const { data: res } = await addObj("staffinfo", form)
      if (res.code != 0) return this.$message.error(res.msg)
      this.$message.success(res.msg)
      this.getList()
      done()
    },
  },
}
</script>

<style>
</style>
