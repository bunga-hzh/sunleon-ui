<template>
  <basic-container>
    <avue-crud v-model="form"
               :data="data"
               :option="option"
               :page.sync="page"
               :search.sync="search"
               :table-loading="showLoading"
               :before-open="beforeOpen"
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
      <template slot="xmForm"
                slot-scope="{ type }">
        <el-autocomplete :disabled="type === 'edit' ? true : false"
                         v-model="form.xm"
                         :fetch-suggestions="querySearchAsync"
                         placeholder="请输入姓名"
                         @select="handleSelect"
                         clearable></el-autocomplete>
      </template>
      <template slot="cfrq"
                slot-scope="scope">
        {{scope.row.cfrq}}-{{scope.row.cfcxrq}}
      </template>
    </avue-crud>
    <!--excel 模板导入 -->
    <excel-upload ref="excelUpload"
                  title="用户信息导入"
                  url="/staff/zzjgpunish/import"
                  temp-name="教职工处分信息模板.xlsx"
                  temp-url="/admin/sys-file/get_file?bucket=res&fileName=template/jzgcfxxmb.xlsx"
                  @refreshDataList="refreshChange"></excel-upload>
  </basic-container>
</template>

<script>
import { option } from "@/views/staff/staffInfo/option/child/punish";
import { fetchList, addObj, delObj, putObj } from "@/api/staff/crud";
import { validatenull } from "@/util/validate";
import ExcelUpload from "@/components/upload/excel";
import { mapGetters } from "vuex";
import { querySearch, loadAll } from "@/const/staff/getAllUser";

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

      export_btn: false,
      import_btn: false,
    };
  },
  components: {
    ExcelUpload,
  },
  created() {
    this.export_btn = this.permissions["staff_zzjgpunish_export"]; //导出
    this.import_btn = this.permissions["staff_zzjgpunish_import"]; //导入
    loadAll();
  },
  computed: {
    ...mapGetters(["permissions"]),
    permissionList() {
      return {
        addBtn: this.vaildData(this.permissions.staff_zzjgpunish_add, false),
        viewBtn: this.vaildData(this.permissions.staff_zzjgpunish_view, false),
        editBtn: this.vaildData(this.permissions.staff_zzjgpunish_edit, false),
        delBtn: this.vaildData(this.permissions.staff_zzjgpunish_del, false),
      };
    },
  },
  methods: {
    // 导出excel
    exportExcel() {
      this.downBlobFile(
        "/staff/zzjgpunish/export",
        this.search,
        "教职工处分信息表.xlsx"
      );
    },
    beforeOpen(done, type) {
      if (type === "edit" || type === "view") {
        this.form.cfrq =
          validatenull(this.form.cfrq) || validatenull(this.form.cfcxrq)
            ? undefined
            : [this.form.cfrq, this.form.cfcxrq];
      }
      done();
    },
    // 获取数据
    async fetchList(query) {
      this.showLoading = true;
      const { data: res } = await fetchList(
        "punish",
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
    // 添加
    async rowSave(form, done, loading) {
      const obj = {
        ...form,
        cfrq: validatenull(form.cfrq) ? undefined : form.cfrq[0],
        cfcxrq: validatenull(form.cfrq) ? undefined : form.cfrq[1],
      };
      const { data: res } = await addObj("punish", obj);
      if (res.code !== 0) return this.$message.error(res.msg);
      done({ ...obj, id: res.data });
      this.$message.success("添加成功！");
    },
    // 修改
    async rowUpdate(form, index, done, loading) {
      const obj = {
        ...form,
        cfrq: validatenull(form.cfrq) ? undefined : form.cfrq[0],
        cfcxrq: validatenull(form.cfrq) ? undefined : form.cfrq[1],
      };
      const { data: res } = await putObj("punish", obj);
      if (res.code !== 0) return this.$message.error(res.msg);
      done(obj);
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
          const { data: res } = await delObj("punish", form.id);
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
    },
  },
};
</script>