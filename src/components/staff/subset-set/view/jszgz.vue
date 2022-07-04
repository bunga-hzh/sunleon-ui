<template>
  <basic-container>
    <avue-crud v-model="form"
               :data="data"
               :option="option"
               :table-loading="showLoading"
               :upload-preview="uploadPreview"
               @on-load="onLoad"
               @row-save="rowSave"
               @row-update="rowUpdate"
               @row-del="rowDel"
               @refresh-change="refreshChange">
    </avue-crud>
  </basic-container>
</template>

<script>
import { option } from "@/components/staff/subset-set/option/jszgz";
import { getAllListByStaffId, addObj, putObj, delObj } from "@/api/staff/crud";
import { url } from "@/api/baseUrl";
import { splitUploadData } from "@/views/staff/teacher/teacherInfo/util/util";

export default {
  data() {
    return {
      form: {},
      data: [],
      option: option,
      showLoading: false,

      staffId: this.$route.params.id,
    };
  },
  methods: {
    // 获取数据
    async fetchList() {
      this.showLoading = true;
      const { data: res } = await getAllListByStaffId(
        "zzjgjszgz",
        this.staffId
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

    // 添加
    async rowSave(form, done, loading) {
      const obj = {
        ...form,
        staffId: this.staffId,
      };
      const { data: res } = await addObj("jszgz", obj);
      if (res.code !== 0) return this.$message.error(res.msg);
      done({ ...obj, id: res.data });
      this.$message.success("添加成功！");
    },
    // 修改
    async rowUpdate(form, index, done, loading) {
      const { data: res } = await putObj("jszgz", form);
      if (res.code !== 0) return this.$message.error(res.msg);
      done(form);
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
          const { data: res } = await delObj("jszgz", form.id);
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

    // 预览
    uploadPreview(file, column, done) {
      if (column.accept === "image/png, image/jpg") {
        this.$ImagePreview(
          [
            {
              thumbUrl: `${url}${file.url}`,
              url: `${url}${file.url}`,
            },
          ],
          0,
          {
            closeOnClickModal: true,
          }
        );
      } else {
        this.downFile(`${url}${file.url}`, splitUploadData(file.name));
      }
    },
  },
};
</script>