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
import { option } from "../option/leader";
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
    ...mapGetters({
      type: "getDialogType",
      staffId: "getStaffId",
      activeName: "getActiveItem",
      tableData: "getData",
    }),
  },
  watch: {
    type: {
      handler(newValue) {
        if (newValue === undefined) return true;
        if (newValue === "view") {
          this.option.addBtn = false;
          this.option.menu = false;
        } else {
          this.option.addBtn = true;
          this.option.menu = true;
        }
      },
      immediate: true,
    },
    staffId(newValue) {
      if (newValue == undefined) {
        this.data = undefined;
      }
    },
    activeName(newValue) {
      if (newValue === undefined) return true;
      if (newValue == "leader") {
        this.showLoading = true;
        fetchList("leader", {
          current: 1,
          size: 20,
          staffId: this.staffId,
        }).then((res) => {
          if (res.data.code !== 0) return this.$message.error(res.msg);
          this.showLoading = false;
          this.data = res.data.data.records;
        });
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
        const { data: res } = await addObj("leader", newForm);
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
        const { data: res } = await putObj("leader", form);
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
          const { data: res } = await delObj("leader", form.id);
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
      if (!this.staffId) return true;
      this.showLoading = true;
      const { data: res } = await fetchList("leader", {
        current: 1,
        size: 20,
        staffId: this.staffId,
      });
      if (res.code !== 0) return this.$message.error(res.msg);
      this.showLoading = false;
      this.data = res.data.records;
    },
  },
  created() {},
};
</script>
