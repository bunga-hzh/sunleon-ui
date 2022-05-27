<template>
  <avue-form ref="form"
             v-model="obj"
             :option="option"
             @submit="submit"
             :upload-after="uploadAfter"
             :upload-preview="uploadPreview"
             :upload-error="uploadError">
  </avue-form>
</template>

<script>
import { mapGetters } from "vuex";
import { option } from "@/views/staff/teacher/teacherInfo/option/info";
import { getObj, putObj } from "@/api/staff/crud";
import { validatenull } from "@/util/validate";
import { splitUploadData } from "@/views/staff/teacher/teacherInfo/util/util";

export default {
  data() {
    return {
      obj: {},
      option: option,
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    async getObj() {
      const { data: res } = await getObj("info", this.userInfo.userId);
      if (res.code !== 0) return this.$message.error(res.msg);
      if (validatenull(res.data)) return;
      this.obj = {
        ...res.data,
        jjzqssj: validatenull(res.data.jjzqssj)
          ? undefined
          : [res.data.jjzqssj, res.data.jjzjzsj],
        jg: validatenull(res.data.jg) ? undefined : JSON.parse(res.data.jg),
        hkszdm: validatenull(res.data.hkszdm)
          ? undefined
          : JSON.parse(res.data.hkszdm),
        sfzFrontImg: validatenull(res.data.sfzFrontImg)
          ? undefined
          : splitUploadData(res.data.sfzFrontImg),
        sfzBackImg: validatenull(res.data.sfzBackImg)
          ? undefined
          : splitUploadData(res.data.sfzBackImg),
        zgxlzsc: validatenull(res.data.zgxlzsc)
          ? undefined
          : splitUploadData(res.data.zgxlzsc),
        qrzxlzsc: validatenull(res.data.qrzxlzsc)
          ? undefined
          : splitUploadData(res.data.qrzxlzsc),
      };
      console.log(this.obj);
    },
    submit(form, loading) {
      if (JSON.stringify(form) === "{}") {
        loading();
        return this.$message.warning("请输入信息!");
      }
      setTimeout(async () => {
        loading();
        const obj = {
          ...form,
          id: this.userInfo.userId,
          jjzqssj: validatenull(form.jjzqssj) ? undefined : form.jjzqssj[0],
          jjzjzsj: validatenull(form.jjzqssj) ? undefined : form.jjzqssj[1],
          jg: validatenull(form.jg) ? undefined : JSON.stringify(form.jg),
          hkszdm: validatenull(form.hkszdm)
            ? undefined
            : JSON.stringify(form.hkszdm),
          sfzFrontImg: validatenull(form.sfzFrontImg)
            ? undefined
            : form.sfzFrontImg[0].value,
          sfzBackImg: validatenull(form.sfzBackImg)
            ? undefined
            : form.sfzBackImg[0].value,
          zgxlzsc: validatenull(form.zgxlzsc)
            ? undefined
            : form.zgxlzsc[0].value,
          qrzxlzsc: validatenull(form.qrzxlzsc)
            ? undefined
            : form.qrzxlzsc[0].value,
        };
        const { data: res } = await putObj("info", obj);
        if (res.code !== 0) return this.$message.error(res.msg);
        this.$message.success("保存成功!");
      }, 1000);
    },
    // 上传后
    uploadAfter(res, done, loading, column) {
      if (!validatenull(res.fileName)) {
        this.$message.success("上传成功");
      }
      done();
    },
    // 预览
    async uploadPreview(file, column, done) {
      // 图片
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
      this.$message.error("上传失败" + error);
    },
  },
  mounted() {
    this.option.submitText = "保存";
    this.getObj();
  },
};
</script>
