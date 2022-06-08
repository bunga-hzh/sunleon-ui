<template>
  <avue-crud v-model="form"
             :data="data"
             :option="option"
             :table-loading="showLoading"
             :before-open="beforeOpen"
             :upload-after="uploadAfter"
             :upload-preview="uploadPreview"
             :upload-error="uploadError"
             @on-load="onLoad"
             @refresh-change="refresh"
             @row-save="rowSave"
             @row-update="rowUpdate"
             @row-del="rowDel">
    <template slot="prqsrq"
              slot-scope="scope">
      {{ scope.row.prqsrq }} - {{ scope.row.przzrq }}
    </template>
  </avue-crud>
</template>
<script>
import { mapGetters } from "vuex";
import { option } from "./option/professionduty";
import { fetchList, addObj, delObj, putObj } from "@/api/staff/crud";
import { validatenull } from "@/util/validate";
import {
  splitUploadData,
  isArray,
} from "@/views/staff/teacher/teacherInfo/util/util";
import { url } from "@/api/baseUrl";

export default {
  data() {
    return {
      obj: {},
      option: option,
      data: [],
      form: {},
      showLoading: false,
    };
  },
  computed: {
    ...mapGetters(["userInfo", "getStaffObj"]),
  },
  watch: {
    getActiveItem(newValue) {
      if (newValue === undefined) return true;
      if (newValue == "professionduty") {
        this.refresh();
      }
    },
  },
  methods: {
    beforeOpen(done, type) {
      if (type === "edit" || type === "view") {
        this.form.prqsrq = [this.form.prqsrq, this.form.przzrq];
      }
      done();
    },
    async fetchList() {
      this.showLoading = true;
      const { data: res } = await fetchList("professionduty", {
        current: 1,
        size: 20,
        staffId: this.userInfo.userId,
      });
      if (res.code !== 0) return this.$message.error(res.msg);
      this.showLoading = false;
      this.data = res.data.records;
    },
    onLoad() {
      this.fetchList();
    },
    // 添加
    rowSave(form, done, loading) {
      if (JSON.stringify(form) === "{}") {
        loading();
        return this.$message.warning("请输入信息!");
      }
      const obj = {
        ...form,
        ...this.getStaffObj,
        prqsrq: validatenull(form.prqsrq) ? undefined : form.prqsrq[0],
        przzrq: validatenull(form.prqsrq) ? undefined : form.prqsrq[1],
        scdzzj: validatenull(form.scdzzj) ? undefined : form.scdzzj[0].value,
      };
      setTimeout(async () => {
        const { data: res } = await addObj("professionduty", obj);
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
      if (isArray(form.scdzzj)) {
        obj = {
          ...form,
          prqsrq: validatenull(form.prqsrq) ? undefined : form.prqsrq[0],
          prqsrq: validatenull(form.prqsrq) ? undefined : form.prqsrq[1],
          scdzzj: validatenull(form.scdzzj) ? undefined : form.scdzzj[0].value,
        };
      } else {
        obj = {
          ...form,
          prqsrq: validatenull(form.prqsrq) ? undefined : form.prqsrq[0],
          prqsrq: validatenull(form.prqsrq) ? undefined : form.prqsrq[1],
        };
      }
      setTimeout(async () => {
        const { data: res } = await putObj("professionduty", obj);
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
          const { data: res } = await delObj("professionduty", form.id);
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
      this.fetchList();
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
    // 上传失败
    uploadError(error, column) {
      this.$message.success("上传失败" + error);
    },
  },
};
</script>
