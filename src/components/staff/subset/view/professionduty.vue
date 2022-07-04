<template>
  <basic-container>
    <avue-crud v-model="form"
               :data="data"
               :option="option"
               :table-loading="showLoading"
               :before-open="beforeOpen"
               :upload-preview="uploadPreview"
               @on-load="onLoad"
               @refresh-change="refreshChange">
      <template slot="prqsrq"
                slot-scope="scope">
        {{scope.row.prqsrq}}-{{scope.row.przzrq}}
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
import { option } from "@/components/staff/subset/option/professionduty";
import { getAllListByStaffId } from "@/api/staff/crud";
import { url } from "@/api/baseUrl";
import { validatenull } from "@/util/validate";
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
    beforeOpen(done, type) {
      if (type === "edit" || type === "view") {
        this.form.prqsrq =
          validatenull(this.form.prqsrq) || validatenull(this.form.przzrq)
            ? undefined
            : [this.form.prqsrq, this.form.przzrq];
      }
      done();
    },
    // 获取数据
    async fetchList() {
      this.showLoading = true;
      const { data: res } = await getAllListByStaffId(
        "zzjgprofessionduty",
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