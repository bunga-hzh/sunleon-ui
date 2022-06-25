<template>
  <avue-crud :option="option"
             :data="data"
             :table-loading="showLoading"
             @on-load="onLoad"
             @row-save="rowSave"
             @row-update="rowUpdate"
             @row-del="rowDel"
             @refresh-change="refreshChange">
  </avue-crud>
</template>

<script>
import { teachingTasksOption } from "@/const/crud/staff/personnel/external";
import {
  getZzjgExternalTeachingtasksByTeacherId,
  addObj,
  putObj,
  delObj,
} from "@/api/staff/crud";

export default {
  data() {
    return {
      data: [],
      option: teachingTasksOption,
      showLoading: false,
      teacherId: this.$route.params.id,
    };
  },
  methods: {
    // 获取数据
    async fetchList() {
      this.showLoading = true;
      const { data: res } = await getZzjgExternalTeachingtasksByTeacherId(
        this.teacherId
      );
      if (res.code !== 0) return this.$message.error(res.msg);
      this.data = res.data;
      this.showLoading = false;
    },
    // 加载
    onLoad() {
      this.fetchList();
    },
    // 刷新
    refreshChange() {
      this.fetchList();
    },

    // 新增
    async rowSave(form, done, loading) {
      const obj = {
        ...form,
        teacherId: this.teacherId,
      };
      const { data: res } = await addObj("externalteachingtasks", obj);
      if (res.code !== 0) return this.$message.error(res.msg);
      this.$message.success("新增成功");
      done({ ...obj, id: res.data });
    },
    // 修改
    async rowUpdate(form, index, done, loading) {
      const { data: res } = await putObj("externalteachingtasks", form);
      if (res.code !== 0) return this.$message.error(res.msg);
      done(form);
      this.$message.success("修改成功");
    },
    //删除
    async rowDel(form, index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await delObj("externalteachingtasks", form.id);
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