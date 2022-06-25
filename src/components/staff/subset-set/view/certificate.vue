<template>
  <basic-container>
    <avue-crud v-model="form"
               :data="data"
               :option="option"
               :page.sync="page"
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
import { option } from "@/components/staff/subset-set/option/certificate";
import { fetchList, addObj, putObj, delObj } from "@/api/staff/crud";
import { url } from "@/api/baseUrl";
import { splitUploadData } from "@/views/staff/teacher/teacherInfo/util/util";

export default {
  data() {
    return {
      form: {},
      data: [],
      option: option,
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
      },
      showLoading: false,

      staffId: this.$route.params.id,
    };
  },
  methods: {
    // 获取数据
    async fetchList(query) {
      this.showLoading = true;
      const { data: res } = await fetchList(
        "certificate",
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
      this.fetchList({
        staffId: this.staffId,
      });
    },
    // 刷新
    refreshChange() {
      this.fetchList({
        staffId: this.staffId,
      });
    },

    // 新增
    async rowSave(form, done, loading) {
      const obj = {
        ...form,
        staffId: this.staffId,
      };
      const { data: res } = await addObj("certificate", obj);
      if (res.code !== 0) return this.$message.error(res.msg);
      this.$message.success("新增成功");
      done({ ...obj, id: res.data });
    },
    // 修改
    async rowUpdate(form, index, done, loading) {
      const { data: res } = await putObj("certificate", form);
      if (res.code !== 0) return this.$message.error(res.msg);
      this.$message.success("修改成功");
      done(form);
    },
    //删除
    async rowDel(form, index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await delObj("certificate", form.id);
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