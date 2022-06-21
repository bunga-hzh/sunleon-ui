<template>
  <div>
    <avue-crud v-model="form"
               :data="data"
               :option="option"
               :page.sync="page"
               :search-sync="search"
               :before-open="beforeOpen"
               :table-loading="showLoading"
               @on-load="onload"
               @row-save="rowSave"
               @row-update="rowUpdate"
               @row-del="rowDel"
               @refresh-change="refreshChange"
               @search-change="searchChange">
      <template slot="qsr"
                slot-scope="scope">
        {{ scope.row.qsr }} - {{ scope.row.dqr }}
      </template>
      <template slot="qssj"
                slot-scope="scope">
        {{ scope.row.qssj }} - {{ scope.row.zzsj }}
      </template>
      <template slot="menuLeft">
        <el-button class="filter-item"
                   type="primary"
                   icon="el-icon-upload"
                   @click="$refs.excelUpload.show()">导入</el-button>
        <el-button type="primary"
                   icon="el-icon-download"
                   @click="exportExcel">导出</el-button>
      </template>
    </avue-crud>
    <!--excel 模板导入 -->
    <excel-upload ref="excelUpload"
                  title="用户信息导入"
                  url="/staff/zzjgywglrshtgl/import"
                  temp-url="/admin/sys-file/local/user.xlsx"
                  @refreshDataList="refreshChange"></excel-upload>
  </div>
</template>

<script>
import { option } from "../option/Contract";
import { fetchList, addObj, putObj, delObj } from "@/api/staff/crud";
import { validatenull } from "@/util/validate";
import ExcelUpload from "@/components/upload/excel";

export default {
  data() {
    return {
      form: {},
      search: {},
      data: undefined,
      option: option,
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
      },
      showLoading: false,

      timeout: undefined,
    };
  },
  components: {
    ExcelUpload,
  },
  methods: {
    // 导出excel
    exportExcel() {
      this.downBlobFile(
        "/staff/zzjgywglrshtgl/export",
        this.search,
        "人事合同信息.xlsx"
      );
    },
    // 弹框打开前
    beforeOpen(done, type) {
      if (type === "edit" || type === "view") {
        this.form.qsr = [this.form.qsr, this.form.dqr];
        this.form.qssj = [this.form.qssj, this.form.zzsj];
      }
      done();
    },
    // 获取列表
    async fetchList(query) {
      this.showLoading = true;
      const { data: res } = await fetchList(
        "ywglrshtgl",
        Object.assign(
          {
            current: this.page.currentPage,
            size: this.page.pageSize,
          },
          query
        )
      );
      if (res.code !== 0) return this.$message.error(res.msg);
      this.page.total = res.data.total;
      this.data = res.data.records;
      this.showLoading = false;
    },
    // 初次加载
    onload() {
      this.fetchList(this.search);
    },
    // 添加
    async rowSave(form, done, loading) {
      const obj = {
        ...form,
        qsr: validatenull(form.qsr) ? undefined : form.qsr[0],
        dqr: validatenull(form.qsr) ? undefined : form.qsr[1],
        qssj: validatenull(form.qssj) ? undefined : form.qssj[0],
        zzsj: validatenull(form.qssj) ? undefined : form.qssj[1],
      };
      const { data: res } = await addObj("ywglrshtgl", obj);
      if (res.code !== 0) return this.$message.error(res.msg);
      done({ ...obj, id: res.data });
      this.$message.success("添加成功！");
    },
    // 编辑
    async rowUpdate(form, index, done, loading) {
      const obj = {
        ...form,
        qsr: validatenull(form.qsr) ? undefined : form.qsr[0],
        dqr: validatenull(form.qsr) ? undefined : form.qsr[1],
        qssj: validatenull(form.qssj) ? undefined : form.qssj[0],
        zzsj: validatenull(form.qssj) ? undefined : form.qssj[1],
      };
      const { data: res } = await putObj("ywglrshtgl", obj);
      if (res.code !== 0) return this.$message.error(res.msg);
      done(obj);
      this.$message.success("修改成功！");
    },
    // 删除
    rowDel(form, index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await delObj("ywglrshtgl", form.id);
          if (res.code !== 0)
            return this.$message.error("删除失败！" + res.msg);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.refreshChange();
        })
        .catch(() => {});
    },
    // 刷新
    refreshChange() {
      this.fetchList();
    },
    // 搜索
    searchChange(form, done) {
      this.page.currentPage = 1;
      this.fetchList(form);
      done();
    },
  },
};
</script>