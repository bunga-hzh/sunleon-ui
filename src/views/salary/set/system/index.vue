<template>
  <basic-container>
    <avue-crud
      :data="data"
      :option="option"
      :page.sync="page"
      :table-loading="showLoading"
      :permission="permissionList"
      @on-load="onLoad"
      @refresh-change="refreshChange"
      @row-save="rowSave"
      @row-update="rowUpdate"
      @row-del="rowDel"
      @search-change="searchChange"
    >
      <template slot="menu" slot-scope="scope">
        <el-button
          v-if="set_btn"
          type="text"
          icon="el-icon-setting"
          @click="setStruct(scope.row)"
          >体系设置</el-button
        >
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
import { option } from "./option";
import { fetchList, addObj, putObj, delObj } from "@/api/salary/commonApi";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      data: [],
      option: option,
      showLoading: false,
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
      },
      set_btn: false,
    };
  },
  created() {
    this.set_btn = this.permissions["staff_zzjginfo_setstruct"]; //导出
  },
  computed: {
    ...mapGetters(["permissions"]),
    permissionList() {
      return {
        viewBtn: this.vaildData(this.permissions.sal_salsystem_view, false),
        addBtn: this.vaildData(this.permissions.sal_salsystem_add, false),
        delBtn: this.vaildData(this.permissions.sal_salsystem_del, false),
        editBtn: this.vaildData(this.permissions.sal_salsystem_edit, false),
      };
    },
  },
  methods: {
    async getList(query) {
      this.showLoading = true;
      const { data: res } = await fetchList(
        "system",
        Object.assign(
          {
            current: this.page.currentPage,
            size: this.page.pageSize,
          },
          query
        )
      );
      if (res.code != 0) return this.message.error(res.msg);
      this.page.total = res.data.total;
      this.data = res.data.records;
      this.showLoading = false;
    },
    onLoad() {
      this.getList();
    },
    refreshChange() {
      this.getList();
    },
    async rowSave(form, done, loading) {
      const obj = {
        structName: form.structName,
        sygw: form.sygw,
        detail: form.detail,
      };
      const { data: res } = await addObj("system", obj);
      if (res.code != 0) return this.$message.error(res.msg);
      this.$message.success("添加成功！");
      this.getList();
      done();
    },
    async rowUpdate(form, index, done, loading) {
      const obj = {
        id: form.id,
        structName: form.structName,
        sygw: form.sygw,
        detail: form.detail,
      };
      const { data: res } = await putObj("system", obj);
      if (res.code != 0) return this.$message.error(res.msg);
      this.$message.success("修改成功！");
      done(obj);
    },
    setStruct(row) {
      this.$router.push("/salary/system/system-set/" + row.id);
    },
    async rowDel(form, index) {
      this.$confirm(
        "此操作将永久删除该数据以及下面关联的表, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(async () => {
          const { data: res } = await delObj("system", form.id);
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
    searchChange(params, done) {
      this.page.currentPage = 1;
      this.getList(params);
      done();
    },
  },
};
</script>
