<template>
  <basic-container>
    <avue-crud v-model="form"
               :option="option"
               :data="data"
               :page.sync="page"
               :search-sync="search"
               :table-loading="showLoading"
               :permission="permissionList"
               @on-load="onLoad"
               @row-save="rowSave"
               @row-update="rowUpdate"
               @row-del="rowDel"
               @refresh-change="refreshChange"
               @search-change="searchChange">
      <template slot="menuLeft">
        <el-button v-if="import_btn"
                   class="filter-item"
                   type="primary"
                   icon="el-icon-upload"
                   @click="$refs.excelUpload.show()">导入</el-button>
        <el-button v-if="export_btn"
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
    </avue-crud>
    <!--excel 模板导入 -->
    <excel-upload ref="excelUpload"
                  title="用户信息导入"
                  url="/staff/zzjgwpjs/import"
                  temp-url="/admin/sys-file/local/user.xlsx"
                  @refreshDataList="refreshChange"></excel-upload>
  </basic-container>
</template>

<script>
import { option } from "@/const/crud/staff/personnel/external";
import { fetchList, addObj, putObj, delObj } from "@/api/staff/crud";
import ExcelUpload from "@/components/upload/excel";
import { mapGetters } from "vuex";

export default {
  name: "TableEngage",
  data() {
    return {
      // 表单对象
      form: {},
      search: {},
      child_form: {},
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
      },
      data: [],
      option: option,
      showLoading: false,

      export_btn: false,
      import_btn: false,
      child_btn: false,
    };
  },
  components: {
    ExcelUpload,
  },
  created() {
    this.export_btn = this.permissions["staff_zzjgwpjs_export"]; //导出
    this.import_btn = this.permissions["staff_zzjgwpjs_import"]; //导入
    this.child_btn = this.permissions["staff_zzjgwpjs_child"]; //子集
  },
  computed: {
    ...mapGetters(["permissions"]),
    permissionList() {
      return {
        viewBtn: this.vaildData(this.permissions.staff_zzjgwpjs_view, false),
        addBtn: this.vaildData(this.permissions.staff_zzjgwpjs_add, false),
        delBtn: this.vaildData(this.permissions.staff_zzjgwpjs_del, false),
        editBtn: this.vaildData(this.permissions.staff_zzjgwpjs_edit, false),
      };
    },
  },
  methods: {
    // 导出excel
    exportExcel() {
      this.downBlobFile(
        "/staff/zzjgwpjs/export",
        this.search,
        "外聘教师信息.xlsx"
      );
    },
    // 获取列表
    async fetchList(query) {
      this.showLoading = true;
      const { data: res } = await fetchList(
        "wpjs",
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
    onLoad() {
      this.fetchList(this.search);
    },
    // 新增
    async rowSave(form, done, loading) {
      const { data: res } = await addObj("wpjs", form);
      if (res.code !== 0) return this.$message.error(res.msg);
      done({ ...form, id: res.data });
      this.$message.success("添加成功！");
      this.fetchList(this.search);
    },
    // 修改
    async rowUpdate(form, index, done, loading) {
      const { data: res } = await putObj("wpjs", form);
      if (res.code !== 0) return this.$message.error(res.msg);
      done(form);
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
          const { data: res } = await delObj("wpjs", form.id);
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
    // 跳转子集页面
    toSubset(row) {
      this.$router.push(`/external-child/index/${row.id}`);
    },
  },
};
</script>
