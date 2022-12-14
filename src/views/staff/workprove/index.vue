<template>
  <basic-container>
    <avue-crud v-model="form"
               :data="data"
               :option="option"
               :page.sync="page"
               :table-loading="showLoading"
               :permission="permissionList"
               @on-load="get"
               @row-save="rowSave"
               @row-update="rowUpdate"
               @row-del="rowDel"
               @refresh-change="refreshChange"
               @search-change="searchChange">
      <template slot="menu"
                slot-scope="scope">
        <el-button ref="download"
                   v-if="download_btn"
                   icon="el-icon-download"
                   type="text"
                   @click="download(scope.row)">下载</el-button>
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
import { option } from "@/const/crud/staff/workprove";
import { fetchList, addObj, putObj, delObj } from "@/api/staff/zzjgworkprove";
import { querySearch, loadAll } from "@/const/staff/getAllUser";
import { mapGetters } from "vuex";
import { downloadProveDoc } from "@/api/staff/crud";

export default {
  data() {
    return {
      data: undefined,
      option: option,
      page: {
        total: 0,
        current: 1,
        size: 10,
      },
      form: {},
      showLoading: false,

      restaurants: [],
      timeout: null,

      download_btn: false,
    };
  },
  created() {
    this.download_btn = this.permissions["staff_zzjgworkprove_download"]; //下载
    loadAll();
  },
  computed: {
    ...mapGetters(["permissions"]),
    permissionList() {
      return {
        viewBtn: this.vaildData(
          this.permissions.staff_zzjgworkprove_view,
          false
        ),
        addBtn: this.vaildData(this.permissions.staff_zzjgworkprove_add, false),
        delBtn: this.vaildData(
          this.permissions.staff_zzjgworkprove_edit,
          false
        ),
        editBtn: this.vaildData(
          this.permissions.staff_zzjgworkprove_del,
          false
        ),
      };
    },
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
      this.page.total = res.data.total;
    },
    // 添加
    async rowSave(form, done, loading) {
      const { data: res } = await addObj(form);
      if (res.code !== 0) return this.$message.error("添加失败！" + res.msg);
      done({ ...form, id: res.data });
      this.refreshChange();
      this.$message.success("添加成功！");
    },
    // 修改
    async rowUpdate(form, index, done, loading) {
      const { data: res } = await putObj(form);
      if (res.code !== 0) return this.$message.error("修改失败！" + res.msg);
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
    //下载
    download(row) {
      downloadProveDoc(row.staffId).then((res) => {
        if (!res) return;
        let blob = new Blob([res.data], {
          type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });
        let url = window.URL.createObjectURL(blob);
        let link = document.createElement("a");
        link.style.display = "none";
        link.href = url;
        link.setAttribute("download", `在职证明-${row.xm}`);
        document.body.appendChild(link);
        link.click();
      });
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
};
</script>
