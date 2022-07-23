<template>
  <basic-container>
    <avue-crud
      :data="data"
      :option="option"
      :permission="permissionList"
      @on-load="onLoad"
      @refresh-change="refreshChange"
      @row-save="rowSave"
      @row-update="rowUpdate"
      @row-del="rowDel"
    >
      <template slot="menuLeft">
        <el-button type="primary" icon="el-icon-back" @click="$router.back()"
          >返回</el-button
        >
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
import { option } from "./option";
import { getObj, addObj, putObj, delObj } from "@/api/salary/commonApi";
import { mapGetters } from "vuex";
import { validatenull } from "@/util/validate";

export default {
  data() {
    return {
      data: [],
      option: option,
      structId: this.$route.params.id,
    };
  },
  computed: {
    ...mapGetters(["permissions"]),
    permissionList() {
      return {
        addBtn: this.vaildData(this.permissions.sal_salsystemitem_add, false),
        delBtn: this.vaildData(this.permissions.sal_salsystemitem_del, false),
        editBtn: this.vaildData(this.permissions.sal_salsystemitem_edit, false),
      };
    },
  },
  methods: {
    async getList() {
      this.showLoading = true;
      const { data: res } = await getObj("systemitem", this.structId);
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
      if (validatenull(form)) return this.$message.error("请输入内容");
      const obj = {
        ...form,
        structId: this.structId,
      };
      const { data: res } = await addObj("systemitem", obj);
      if (res.code != 0) return this.$message.error(res.msg);
      this.$message.success("添加成功！");
      this.getList();
      done();
    },
    async rowUpdate(form, index, done, loading) {
      if (validatenull(form)) return this.$message.error("请输入内容");
      const obj = {
        ...form,
        structId: this.structId,
      };
      const { data: res } = await putObj("systemitem", obj);
      if (res.code != 0) return this.$message.error(res.msg);
      this.$message.success("修改成功！");
      done(obj);
    },
    async rowDel(form, index) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await delObj("systemitem", form.id);
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
  },
};
</script>
