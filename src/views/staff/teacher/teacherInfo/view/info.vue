<template>
  <avue-form ref="form"
             v-model="obj"
             :option="option"
             :upload-after="uploadAfter"
             :upload-preview="uploadPreview"
             :upload-error="uploadError"
             @submit="submit">
  </avue-form>
</template>

<script>
import { fetchList } from "@/api/staff/crud";
import { mapGetters, mapMutations } from "vuex";
import { option } from "../option/info";
import { get, add, edit } from "@/const/staff/crud";
import { validatenull } from "@/util/validate";
import { splitUploadData } from "../util/util";

export default {
  data() {
    return {
      obj: {},
      option: option,
    };
  },
  computed: {
    ...mapGetters({
      type: "getDialogType",
      id: "getStaffId",
      activeName: "getActiveItem",
      formObj: "getObj",
      xm: "getXm",
      sfzjh: "getSfzjh",
    }),
    ...mapMutations(["setStaffId", "setXm", "setSfzjh"]),
  },
  watch: {
    type: {
      handler(newValue) {
        if (newValue === undefined) return true;
        if (newValue === "view") {
          this.option.detail = true;
        } else {
          this.option.detail = false;
        }
        if (newValue === "edit") {
          this.option.submitText = "保存";
        }
      },
      immediate: true,
    },
    id(newValue) {
      if (newValue == undefined) {
        this.option.submitText = "添加";
        this.$refs.form.resetForm();
      }
    },
    activeName: {
      handler(newValue) {
        if (newValue === undefined) return true;
        if (newValue === "info") {
          this.obj = {
            ...this.formObj,
            jjzqssj: validatenull(this.formObj.jjzqssj)
              ? undefined
              : [this.formObj.jjzqssj, this.formObj.jjzjzsj],
            jg: validatenull(this.formObj.jg)
              ? undefined
              : JSON.parse(this.formObj.jg),
            hkszdm: validatenull(this.formObj.hkszdm)
              ? undefined
              : JSON.parse(this.formObj.hkszdm),
            sfzFrontImg: validatenull(this.formObj.sfzFrontImg)
              ? undefined
              : splitUploadData(this.formObj.sfzFrontImg),
            sfzBackImg: validatenull(this.formObj.sfzBackImg)
              ? undefined
              : splitUploadData(this.formObj.sfzBackImg),
            zgxlzsc: validatenull(this.formObj.zgxlzsc)
              ? undefined
              : splitUploadData(this.formObj.zgxlzsc),
            qrzxlzsc: validatenull(this.formObj.qrzxlzsc)
              ? undefined
              : splitUploadData(this.formObj.qrzxlzsc),
          };
        }
      },
      immediate: true,
    },
    formObj(newValue) {
      if (JSON.stringify(newValue) === "{}") {
        for (let key in this.obj) {
          this.obj[key] = undefined;
        }
      }
    },
  },
  methods: {
    submit(form, loading) {
      setTimeout(async () => {
        loading();
        const obj = {
          ...form,
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
        if (this.id) {
          //编辑
          const { data: res } = await edit("info", {
            ...obj,
            id: this.id,
          });
          if (res.code !== 0) return this.$message.error(res.msg);
          if (obj) {
            this.$store.commit("setXm", obj.xm);
            this.$store.commit("setSfzjh", obj.sfzjh);
          }
          this.$message.success("保存成功!");
        } else {
          //添加
          const { data: res } = await add("info", obj);
          if (res.code !== 0) return this.$message.error(res.msg);
          if (obj) {
            this.$store.commit("setXm", obj.xm);
            this.$store.commit("setSfzjh", obj.sfzjh);
          }
          this.$store.commit("setStaffId", res.data);
          this.option.submitText = "保存";
          this.$message.success("添加成功!");
        }
      }, 1000);
    },
    async getInfoObj() {
      const { data: res } = await fetchList("info", {
        current: 1,
        size: 1,
      });
      if (res.code !== 0) return this.$message.error(res.msg);
      this.obj = res.data.records[0];
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
};
</script>

<style></style>
