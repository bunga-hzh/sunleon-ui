<template>
  <basic-container>
    <avue-crud v-model="form"
               :data="data"
               :option="option"
               :page.sync="page"
               :search.sync="search"
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
                  url="/staff/zzjgjszgz/import"
                  temp-url="/admin/sys-file/local/user.xlsx"
                  @refreshDataList="refreshChange"></excel-upload>
  </basic-container>
</template>

<script>
import { option } from "@/views/staff/staffInfo/option/child/jszgz";
import { fetchList, addObj, delObj, putObj } from "@/api/staff/crud";
import { url } from "@/api/baseUrl";
import { validatenull } from "@/util/validate";
import { splitUploadData } from "@/views/staff/teacher/teacherInfo/util/util";
import ExcelUpload from "@/components/upload/excel";

export default {
  data() {
    return {
      form: {},
      search: {},
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
  components: {
    ExcelUpload,
  },
  methods: {
    // 导出excel
    exportExcel() {
      this.downBlobFile(
        "/staff/zzjgjszgz/export",
        this.search,
        "教职工教师资格证信息表.xlsx"
      );
    },
    // 获取数据
    async fetchList(query) {
      this.showLoading = true;
      const { data: res } = await fetchList(
        "jszgz",
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
      const { data: res } = await addObj("jszgz", form);
      if (res.code !== 0) return this.$message.error(res.msg);
      done({ ...form, id: res.data });
      this.$message.success("添加成功！");
    },
    // 修改
    async rowUpdate(form, index, done, loading) {
      const { data: res } = await putObj("jszgz", form);
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
          const { data: res } = await delObj("jszgz", form.id);
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
  },
};
</script>