<template>
  <basic-container>
    <avue-crud v-model="form"
               :data="data"
               :option="option"
               :page.sync="page"
               :table-loading="showLoading"
               @on-load="get"
               @row-save="rowSave"
               @row-update="rowUpdate"
               @row-del="rowDel"
               @refresh-change="refreshChange"
               @search-change="searchChange">
      <template slot="xmForm"
                slot-scope="{ type }">
        <el-autocomplete :disabled="type === 'edit' ? true : false"
                         v-model="form.xm"
                         :fetch-suggestions="querySearchAsync"
                         placeholder="请输入姓名"
                         @select="handleSelect"
                         clearable></el-autocomplete>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
import { option } from "@/const/crud/salary/workprove";
import { fetchList, addObj, putObj, delObj } from "@/api/staff/zzjgworkprove";
import { fetchList as fetchUserList } from "@/api/staff/crud";
import { jzg_page } from "@/const/staff/page";

export default {
  data() {
    return {
      data: undefined,
      option: option,
      page: {
        total: 100,
        current: 1,
        size: 10,
      },
      // 表单对象
      form: {},

      showLoading: false,
      //证明类型
      proveType: undefined,

      dialogVisible: false,

      restaurants: [],
      timeout: null,
    };
  },
  methods: {
    generateProof() {
      this.dialogVisible = true;
    },
    // 获取表格数据
    async get(page, params) {
      this.showLoading = true;
      const { data: res } = await fetchList(
        Object.assign(
          {
            current: page.currentPage,
            size: page.pageSize,
          },
          params
        )
      );
      if (res.code !== 0) return this.$message.error(res.msg);
      this.showLoading = false;
      this.data = res.data.records;
      this.total = res.data.total;
    },
    // 添加
    async rowSave(form, done, loading) {
      const { data: res } = await addObj(form);
      if (res.code !== 0) return this.$message.error("添加失败！" + res.msg);
      this.$message.success("添加成功！");
      this.refreshChange();
      done();
    },
    // 修改
    async rowUpdate(form, index, done, loading) {
      const { data: res } = await putObj(form);
      if (res.code !== 0) return this.$message.error("修改失败！" + res.msg);
      this.$message.success("修改成功！");
      done(form);
    },
    // 删除
    rowDel(form, index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await delObj(form.id);
          if (res.code !== 0)
            return this.$message.error("删除失败！" + res.msg);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.get(this.page);
        })
        .catch(() => {});
    },
    // 刷新
    refreshChange() {
      this.get(this.page);
    },
    // 搜索
    searchChange(params, done) {
      this.page.currentPage = 1;
      this.get(this.page, params);
      done();
    },
    async loadAll() {
      const { data: res } = await fetchUserList("info", jzg_page);
      if (res.code !== 0) return true;
      res.data.records.forEach((item) => {
        this.restaurants.push({
          value: item.xm,
          gh: item.gh,
          deptId: item.orgId,
          staffId: item.id,
        });
      });
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 1000);
    },
    createStateFilter(queryString) {
      return (state) => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      this.form.gh = item.gh;
      this.form.orgId = item.deptId;
    },
  },
  mounted() {
    this.loadAll();
  },
};
</script>

<style lang="scss" scoped>
#employment_certificate {
  display: none;
}
.el-row {
  margin: 20px;
}
</style>
