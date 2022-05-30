<template>
  <avue-crud :data="data"
             :option="option"
             :table-loading="showLoading"
             :upload-after="uploadAfter"
             :upload-preview="uploadPreview"
             :upload-error="uploadError"
             @refresh-change="refresh"
             @row-save="rowSave"
             @row-update="rowUpdate"
             @row-del="rowDel">
  </avue-crud>
</template>
<script>
import { mapGetters } from "vuex";
import { option } from "@/views/staff/teacher/teacherInfo/child/option/leader";
import { fetchList, addObj, delObj, putObj } from "@/api/staff/crud";
import { validatenull } from "@/util/validate";
import {
  splitUploadData,
  isArray,
} from "@/views/staff/teacher/teacherInfo/util/util";

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
      if (newValue == "leader") {
        this.refresh();
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
      let obj = {
        ...form,
        staffId: this.userInfo.userId,
        ldrzwj: validatenull(form.ldrzwj) ? "" : form.ldrzwj[0].value,
      };
      setTimeout(async () => {
        const { data: res } = await addObj("leader", obj);
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
      let obj = {};
      if (isArray(form.ldrzwj)) {
        obj = {
          ...form,
          ldrzwj: validatenull(form.ldrzwj) ? undefined : form.ldrzwj[0].value,
        };
      } else {
        obj = form;
      }
      setTimeout(async () => {
        const { data: res } = await putObj("leader", obj);
        if (res.code !== 0) return this.$message.error(res.msg);
        done(obj);
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
      this.showLoading = true;
      const { data: res } = await fetchList("leader", {
        current: 1,
        size: 20,
        staffId: this.userInfo.userId,
      });
      if (res.code !== 0) return this.$message.error(res.msg);
      this.showLoading = false;
      this.data = res.data.records;
    },
    // 上传后
    uploadAfter(res, done, loading, column) {
      if (!validatenull(res.fileName)) {
        this.$message.success("上传成功");
      }
      done();
    },
    // 预览
    uploadPreview(file, column, done) {
      if (column.accept === "image/png, image/jpg") {
        this.$ImagePreview(
          [
            {
              thumbUrl: `http://sunleon-gateway:9999${file.url}`,
              url: `http://sunleon-gateway:9999${file.url}`,
            },
          ],
          0,
          {
            closeOnClickModal: true,
          }
        );
      } else {
        this.downFile(
          `http://sunleon-gateway:9999${file.url}`,
          splitUploadData(file.name)
        );
      }
    },
    // 上传失败
    uploadError(error, column) {
      this.$message.success("上传失败" + error);
    },
  },
};
</script>
