<template>
  <avue-crud v-model="form"
             :data="data"
             :option="option"
             :page.sync="page"
             :table-loading="showLoading"
             @on-load="onload"
             @row-save="rowSave"
             @row-update="rowUpdate"
             @row-del="rowDel"
             @selection-change="selectionChange"
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
</template>

<script>
import { option } from "../option/Other";
import { fetchList, addObj, putObj, delObj } from "@/api/staff/crud";
import { querySearch, loadAll } from "@/const/staff/getAllUser";

export default {
  data() {
    return {
      form: {},
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
  methods: {
    // 获取列表
    async fetchList(query) {
      this.showLoading = true;
      const { data: res } = await fetchList(
        "ywglzdy",
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
      this.fetchList();
    },
    // 添加
    async rowSave(form, done, loading) {
      const { data: res } = await addObj("ywglzdy", form);
      if (res.code !== 0) return this.$message.error(res.msg);
      done({ ...form, id: res.data });
      this.refreshChange();
      this.$message.success("添加成功！");
    },
    // 编辑
    async rowUpdate(form, index, done, loading) {
      const { data: res } = await putObj("ywglzdy", form);
      if (res.code !== 0) return this.$message.error(res.msg);
      done(form);
      this.refreshChange();
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
          const { data: res } = await delObj("ywglzdy", form.id);
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
    // 多选
    selectionChange() {},
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
    // 搜索姓名
    querySearchAsync(queryString, cb) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(querySearch(queryString));
      }, 1000 * Math.random());
    },
    // 选择用户
    handleSelect(item) {
      this.form.gh = item.gh;
      this.form.deptId = item.deptId;
      this.form.staffId = item.staffId;
    },
  },
  created() {
    loadAll();
  },
};
</script>