<template>
  <basic-container>
    <MonthCount @getCountryMonthId="getRow">
      <template slot="table">
        <avue-crud
          :data="data"
          :option="option"
          :page.sync="page"
          :search.sync="search"
          :table-loading="showLoading"
          @on-load="onLoad"
          @refresh-change="refreshChange"
          @row-save="rowSave"
          @row-update="rowUpdate"
          @row-del="rowDel"
          @search-change="searchChange"
        >
          <template slot="menuLeft">
            <el-button
              type="primary"
              icon="el-icon-download"
              @click="exportExcel"
              >导出
            </el-button>
          </template>
        </avue-crud>
      </template>
    </MonthCount>
  </basic-container>
</template>

<script>
import MonthCount from '@/components/salary/month-country/index'
import { option } from './option'
import { fetchList, addObj, putObj, delObj } from "@/api/salary/commonApi"

export default {
  data () {
    return {
      search: {},
      data: [],
      option: option,
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
      },
      showLoading: false,
      row: null
    }
  },
  components: {
    MonthCount
  },
  methods: {
    exportExcel () {
      this.downBlobFile(
        "/salary/salcountry/export",
        {
          ...this.search,
          countryMonthId: this.row.id,
        },
        `${this.row.month}月国家工资明细.xlsx`
      )
    },
    getRow (row) {
      this.row = row
      this.getList()
    },
    async getList (query) {
      this.showLoading = true
      const { data: res } = await fetchList(
        "country",
        Object.assign(
          {
            current: this.page.currentPage,
            size: this.page.pageSize,
            countryMonthId: this.row.id,
          },
          query
        )
      )
      if (res.code != 0) return this.$message.error(res.msg)
      this.page.total = res.data.total
      this.data = res.data.records
      this.showLoading = false
    },
    onLoad () {
      this.getList()
    },
    refreshChange () {
      this.getList()
    },
    async rowSave (form, done, loading) {
      const obj = {
        ...form,
        countryMonthId: this.row.id,
      }
      const { data: res } = await addObj("country", obj)
      if (res.code != 0) return this.$message.error(res.msg)
      this.$message.success("添加成功！")
      this.getList()
      done()
    },
    async rowUpdate (form, index, done, loading) {
      const obj = {
        ...form,
        countryMonthId: this.row.id,
      }
      const { data: res } = await putObj("country", obj)
      if (res.code != 0) return this.$message.error(res.msg)
      this.$message.success("修改成功！")
      done(obj)
    },
    async rowDel (form, index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await delObj("country", form.id)
          if (res.code !== 0)
            return this.$message.error("删除失败！" + res.msg)
          this.$message({
            type: "success",
            message: "删除成功!",
          })
          this.refreshChange()
        })
        .catch(() => { })
    },
    searchChange (params, done) {
      this.page.currentPage = 1
      this.getList(params)
      done()
    },
  }
}
</script>
