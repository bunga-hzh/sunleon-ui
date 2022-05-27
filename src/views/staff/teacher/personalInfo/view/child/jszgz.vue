<template>
  <avue-crud :data="data"
             :option="option"
             :table-loading="showLoading"
             @refresh-change="refresh"
             @row-save="rowSave"
             @row-update="rowUpdate"
             @row-del="rowDel">
  </avue-crud>
</template>
<script>
import { mapGetters } from "vuex";
import { option } from "@/views/staff/teacher/teacherInfo/child/option/jszgz";
import { fetchList, addObj, delObj, putObj } from "@/api/staff/crud";

export default {
  data() {
    return {
      obj: {},
      option: option,
      data: [],
      showLoading: false,
    };
  },
  computed: {
    ...mapGetters(["userInfo", "getActiveItem"]),
  },
  watch: {
    getActiveItem(newValue) {
      if (newValue === undefined) return true;
      if (newValue == "jszgz") {
        this.refresh();
      }
    },
  },
  methods: {
    // 添加
    rowSave(form, done, loading) {
      if (JSON.stringify(form) === "{}") {
        loading();
        return this.$message.warning("请输入信息!");
      }
      setTimeout(async () => {
        const obj = { ...form, staffId: this.userInfo.userId };
        const { data: res } = await addObj("jszgz", obj);
        if (res.code !== 0) return this.$message.error(res.msg);
        done({ ...obj, id: res.data });
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
        const { data: res } = await putObj("jszgz", form);
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
          const { data: res } = await delObj("jszgz", form.id);
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
      this.showLoading = true;
      const { data: res } = await fetchList("jszgz", {
        current: 1,
        size: 20,
        staffId: this.userInfo.userId,
      });
      if (res.code !== 0) return this.$message.error(res.msg);
      this.showLoading = false;
      this.data = res.data.records;
    },
  },
  created() {},
};
</script>
