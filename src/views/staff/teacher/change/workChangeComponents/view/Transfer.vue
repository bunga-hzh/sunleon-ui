<template>
  <avue-crud v-model="form"
             :data="data"
             :option="option"
             :page.sync="page"
             :table-loading="showLoading"
             :upload-after="uploadAfter"
             :upload-preview="uploadPreview"
             :upload-error="uploadError"
             @on-load="onload"
             @row-save="rowSave"
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
    <template slot="oldPostId"
              slot-scope="scope">
      {{scope.row.oldPostName}}
    </template>
    <template slot="newPostId"
              slot-scope="scope">
      {{scope.row.newPostName}}
    </template>
    <template slot="oldDeptIdLabel">现属部门</template>
    <template slot="oldPostIdLabel">现岗位名称</template>
  </avue-crud>
</template>

<script>
import { option } from "../option/Transfer";
import { fetchList, addObj } from "@/api/staff/crud";
import { querySearch, loadAll } from "@/const/staff/getAllUser";
import { url } from "@/api/baseUrl";
import { splitUploadData } from "@/views/staff/teacher/teacherInfo/util/util";

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
        "ywglzg",
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
      this.$confirm("添加后将不可修改，请确认信息无误！", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          if (form.oldPostId === form.newPostId)
            return this.$message.error("新岗位不能与原岗位相同！");
          const { data: res } = await addObj("ywglzg", form);
          if (res.code !== 0) return this.$message.error(res.msg);
          done({ ...form, id: res.data });
          this.refreshChange();
          this.$message.success("添加成功！");
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
      this.form.oldDeptId = item.deptId;
      this.form.staffId = item.staffId;
      this.form.oldPostId = item.postId;
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
        console.log(splitUploadData(file.name));
        this.downFile(`${url}${file.url}`, splitUploadData(file.name));
      }
    },
    // 上传失败
    uploadError(error, column) {
      this.$message.error("上传失败" + error);
    },
  },
  created() {
    loadAll();
  },
};
</script>