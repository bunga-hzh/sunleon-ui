<template>
  <basic-container>
    <avue-crud v-model="form"
               :data="data"
               :option="option"
               :page.sync="page"
               :search.sync="search"
               :table-loading="showLoading"
               :before-open="beforeOpen"
               :upload-after="uploadAfter"
               :upload-preview="uploadPreview"
               :upload-error="uploadError"
               :permission="permissionList"
               @on-load="onLoad"
               @refresh-change="refreshChange"
               @search-change="searchChange">
      <template slot="menuLeft">
        <el-button v-if="export_btn"
                   class="filter-item"
                   type="primary"
                   icon="el-icon-download"
                   @click="exportExcel">导出</el-button>
      </template>
      <template slot="menu"
                slot-scope="scope">
        <el-button v-if="child_btn"
                   type="text"
                   icon="el-icon-paperclip"
                   @click="toSubset(scope.row)">子集</el-button>
      </template>
      <template slot="jjzqssj"
                slot-scope="scope">
        {{scope.row.jjzqssj}}-{{scope.row.jjzjzsj}}
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
import { option } from "@/views/staff/staffInfo/option/staffAllInfo";
import { fetchList } from "@/api/staff/crud";
import { url } from "@/api/baseUrl";
import { validatenull } from "@/util/validate";
import { splitUploadData } from "@/views/staff/teacher/teacherInfo/util/util";
import { mapGetters } from "vuex";

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
      search: {},
      showLoading: false,

      export_btn: false,
      child_btn: false,
    };
  },
  created() {
    this.export_btn = this.permissions["staff_all_info_export"]; //导出
    this.child_btn = this.permissions["staff_all_info_child"]; //子集
  },
  computed: {
    ...mapGetters(["permissions"]),
    permissionList() {
      return {
        viewBtn: this.vaildData(this.permissions.staff_all_info_view, false),
      };
    },
  },
  methods: {
    // 导出excel
    exportExcel() {
      this.downBlobFile(
        "/staff/zzjginfo/all/export",
        this.search,
        "教职工信息表.xlsx"
      );
    },
    // 弹窗打开前
    beforeOpen(done, type) {
      if (type === "edit" || type === "view") {
        this.form.jjzqssj =
          validatenull(this.form.jjzqssj) || validatenull(this.form.jjzjzsj)
            ? undefined
            : [this.form.jjzqssj, this.form.jjzjzsj];
        this.form.jg = validatenull(this.form.jg)
          ? undefined
          : JSON.stringify(this.form.jg);
        this.form.hkszdm = validatenull(this.form.hkszdm)
          ? undefined
          : JSON.stringify(this.form.hkszdm);
      }
      done();
    },
    // 获取数据
    async fetchList(query) {
      this.showLoading = true;
      const { data: res } = await fetchList(
        "info/info",
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
      this.fetchList(this.search);
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
    // 跳转子集页面
    toSubset(row) {
      this.$router.push(`/subset/index/${row.id}`);
    },
  },
};
</script>