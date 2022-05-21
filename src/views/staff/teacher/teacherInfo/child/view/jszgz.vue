<template>
  <avue-crud ref="crud"
             :data="data"
             :option="option"
             @refresh-change="refresh"
             @row-save="rowSave"
             @row-update="rowUpdate"
             @row-del="rowDel">
  </avue-crud>
</template>
<script>
import { mapGetters } from "vuex";
import { option } from "../option/jszgz";
import { get, add, edit, del } from "@/const/staff/crud";

export default {
  data() {
    return {
      obj: {},
      option: option,
      data: [],
    };
  },
  computed: {
    ...mapGetters({ staffId: "getStaffId" }),
  },
  watch: {
    staffId(newValue) {
      if (newValue == undefined) {
        this.$refs.crud.resetForm();
      }
    },
  },
  methods: {
    // 添加
    rowSave(form, done, loading) {
      if (this.staffId == undefined) {
        done();
        return this.$message.warning("请先填写个人基本信息!");
      }
      if (JSON.stringify(form) === "{}") {
        loading();
        return this.$message.warning("请输入信息!");
      }
      setTimeout(async () => {
        const newForm = { ...form, staffId: this.staffId };
        const { data: res } = await add("jszgz", newForm);
        if (res.code !== 0) return this.$message.error(res.msg);
        done({ ...newForm, id: res.data });
        this.$message.success("添加成功！");
      }, 1000);
    },
    // 编辑
    rowUpdate(form, index, done, loading) {
      if (JSON.stringify(form) === "{}") {
        loading();
        return this.$message.warning("请输入信息!");
      }
      setTimeout(async () => {
        const { data: res } = await edit("jszgz", form);
        if (res.code !== 0) return this.$message.error(res.msg);
        done(form);
        this.$message.success("修改成功！");
      }, 1000);
    },
    // 删除
    rowDel(form, index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await del("jszgz", form.id);
          if (res.code !== 0)
            return this.$message.error("删除失败！" + res.msg);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.refresh();
        })
        .catch(() => {});
    },
    // 刷新
    async refresh() {
      const { data: res } = await get("jszgz", {
        current: 1,
        size: 20,
      });
      if (res.code !== 0) return this.$message.error(res.msg);
      this.data = res.data.records;
    },
  },
  created() {},
};
</script>
