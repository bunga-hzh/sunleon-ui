<template>
  <basic-container>
    <avue-crud
      :data="data"
      :option="option"
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
          @click="setItem(scope.row)"
          >发放设置</el-button
        >
      </template>
      <template slot="sendTime" slot-scope="scope">
        每月 {{ scope.row.sendTime }} 号
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
import { option } from "./option";
import { fetchList } from "@/api/salary/type";
import { addObj, putObj, delObj } from "@/api/salary/commonApi";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      data: [],
      option: option,
      showLoading: false,
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
        viewBtn: this.vaildData(this.permissions.sal_saltype_view, false),
        delBtn: this.vaildData(this.permissions.sal_saltype_del, false),
        editBtn: this.vaildData(this.permissions.sal_saltype_edit, false),
      };
    },
  },
  methods: {
    async getList(query) {
      this.showLoading = true;
      const { data: res } = await fetchList();
      if (res.code != 0) return this.message.error(res.msg);
      this.data = res.data;
      this.showLoading = false;
    },
    onLoad() {
      this.getList();
    },
    refreshChange() {
      this.getList();
    },
    async rowSave(form, done, loading) {
      const { data: res } = await addObj("type", form);
      if (res.code != 0) return this.$message.error(res.msg);
      this.$message.success("添加成功！");
      this.getList();
      done();
    },
    async rowUpdate(form, index, done, loading) {
      const { data: res } = await putObj("type", form);
      if (res.code != 0) return this.$message.error(res.msg);
      this.$message.success("修改成功！");
      done(form);
    },
    setItem(row) {
      this.$router.push("/salary/type/type-set/" + row.id);
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
          const { data: res } = await delObj("type", form.id);
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
