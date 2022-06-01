<template>
  <basic-container>
    <avue-crud v-model="form"
               :data="data"
               :option="option"
               :page.sync="page"
               :table-loading="showLoading"
               :upload-after="uploadAfter"
               :upload-preview="uploadPreview"
               :upload-error="uploadError"
               @on-load="onLoad"
               @row-save="rowSave"
               @row-update="rowUpdate"
               @row-del="rowDel"
               @refresh-change="refreshChange"
               @search-change="searchChange">
      <template slot="menuLeft">
        <el-button type="primary"
                   icon="el-icon-upload">导入</el-button>
        <el-button type="primary"
                   icon="el-icon-bottom">导出</el-button>
        <el-button type="primary"
                   icon="el-icon-download">下载模板</el-button>
      </template>
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
import { option } from "@/views/staff/staffInfo/option/child/leader";
import { fetchList, addObj, delObj, putObj } from "@/api/staff/crud";
import { url } from "@/api/baseUrl";
import { validatenull } from "@/util/validate";
import { splitUploadData } from "@/views/staff/teacher/teacherInfo/util/util";
import { querySearch, loadAll } from "@/const/staff/getAllUser";

export default {
  data() {
    return {
      form: {},
      data: [],
      option: option,
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
      },
      showLoading: false,

      timeout: undefined,
      usersList: [],
    };
  },
  methods: {
    // 获取数据
    async fetchList(query) {
      this.showLoading = true;
      const { data: res } = await fetchList(
        "leader",
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
    // 加载
    onLoad() {
      this.fetchList();
    },
    // 添加
    async rowSave(form, done, loading) {
      const obj = {
        ...form,
        ldrzwj: validatenull(form.ldrzwj) ? undefined : form.ldrzwj[0].value,
      };
      const { data: res } = await addObj("leader", obj);
      if (res.code !== 0) return this.$message.error(res.msg);
      done({ ...obj, id: res.data });
      this.$message.success("添加成功！");
    },
    // 修改
    async rowUpdate(form, index, done, loading) {
      const { data: res } = await putObj("leader", form);
      if (res.code !== 0) return this.$message.error(res.msg);
      done(form);
      this.$message.success("修改成功！");
    },
    // 删除
    async rowDel(form, index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await delObj("leader", form.id);
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
    searchChange(params, done) {
      this.page.currentPage = 1;
      this.fetchList(params);
      done();
    },
    // 上传后
    uploadAfter(res, done, loading, column) {
      if (!validatenull(res.fileName)) {
        this.$message.success("上传成功");
      }
      done();
    },
    // 预览
    uploadPreview(file, column, done) {
      if (column.accept === "image/png, image/jpg") {
        this.$ImagePreview(
          [
            {
              thumbUrl: `${url}${file.url}`,
              url: `${url}${file.url}`,
            },
          ],
          0,
          {
            closeOnClickModal: true,
          }
        );
      } else {
        this.downFile(`${url}${file.url}`, splitUploadData(file.name));
      }
    },
    // 上传失败
    uploadError(error, column) {
      this.$message.success("上传失败" + error);
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
      this.form.bm = item.orgId;
      this.form.staffId = item.staffId;
    },
  },
  created() {
    loadAll(this.usersList);
  },
};
</script>