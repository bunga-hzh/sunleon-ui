<template>
  <div>
    <avue-crud
      ref="crud"
      :data="data"
      :option="option"
      :page.sync="page"
      :table-loading="showLoading"
      :permission="permissionList"
      @on-load="onLoad"
      @row-save="rowSave"
      @row-update="rowUpdate"
      @row-del="rowDel"
      @refresh-change="refreshChange"
      @search-change="searchChange"
    >
      <template slot="menu" slot-scope="scope">
        <el-button
          v-if="detail_btn"
          type="text"
          icon="el-icon-tickets"
          @click="detail(scope.row)"
          >查看详情</el-button
        >
        <el-button
          v-if="export_btn"
          type="text"
          icon="el-icon-upload"
          @click="upload(scope.row)"
          >导入</el-button
        >
      </template>
    </avue-crud>
    <el-drawer
      :title="drawerTitle"
      :visible.sync="drawer"
      direction="ltr"
      size="90%"
      :before-close="handleClose"
    >
      <div style="padding: 20px">
        <slot name="table" />
      </div>
    </el-drawer>
    <!--excel 模板导入 -->
    <excel-upload
      ref="excelUpload"
      title="国家工资明细导入"
      :url="importUrl"
      temp-name="教职工基本信息模板.xlsx"
      temp-url="/admin/sys-file/get_file?bucket=res&fileName=template/jzgjbxxmb.xlsx"
    ></excel-upload>
  </div>
</template>

<script>
import { option } from "./option"
import ExcelUpload from "@/components/upload/excel"
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
      drawer: false,
      drawerTitle: null,
      importUrl: null,

      detail_btn: false,
      export_btn: false,
    }
  },
  created () {
    this.detail_btn = this.permissions["sal_salcountry_view"] //查看国家工资详情
    this.export_btn = this.permissions["sal_salcountry_import"] //导出
  },
  computed: {
    ...mapGetters(["permissions"]),
    permissionList () {
      return {
        viewBtn: this.vaildData(this.permissions.sal_salcountrymonth_view, false),
        addBtn: this.vaildData(this.permissions.sal_salcountrymonth_add, false),
        editBtn: this.vaildData(this.permissions.sal_salcountrymonth_edit, false),
        delBtn: this.vaildData(this.permissions.sal_salcountrymonth_del, false),
      }
    },
  },
  components: {
    ExcelUpload
  },
  methods: {
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
    },
    detail (row) {
      this.drawer = true
      this.drawerTitle = `${row.month}月国家工资明细`
      this.$emit("getCountryMonthId", row)
    },
    upload (row) {
      this.$refs.excelUpload.show()
      this.importUrl = `/salary/salcountry/import/${row.id}`
    },
    async getList (query) {
      this.showLoading = true
      const { data: res } = await fetchList(
        "countrymonth",
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
        year: (new Date).getFullYear(),
      }
      const { data: res } = await addObj("countrymonth", obj)
      if (res.code != 0) return this.$message.error(res.msg)
      this.$message.success("添加成功！")
      this.getList()
      done()
    },
    async rowUpdate (form, index, done, loading) {
      const obj = {
        ...form,
        year: (new Date).getFullYear(),
      }
      const { data: res } = await putObj("countrymonth", obj)
      if (res.code != 0) return this.$message.error(res.msg)
      this.$message.success("修改成功！")
      done({
        ...form,
        year: (new Date).getFullYear(),
      })
    },
    async rowDel (form, index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await delObj("countrymonth", form.id)
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
