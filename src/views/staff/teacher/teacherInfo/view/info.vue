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

export default {
  data() {
    return {
      obj: {},
      option: option,

      uploads: ["sfzFrontImg", "sfzBackImg", "zgxlzsc", "qrzxlzsc"],
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
          const time = [this.formObj.jjzqssj, this.formObj.jjzjzsj];
          delete this.formObj.jjzqssj;
          delete this.formObj.jjzjzsj;
          this.obj = { ...this.formObj, jjzqssj: time };
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
      let obj = {};
      Object.keys(form).forEach((key) => {
        if (this.isInArray(this.uploads, key)) {
          obj[key] = form[key][0].value;
          return;
        }
        if (key === "jjzqssj") {
          obj["jjzqssj"] = form[key][0];
          obj["jjzjzsj"] = form[key][1];
          return;
        }
        if (key === "jg" || key === "hkszdm") {
          obj[key] = JSON.stringify(form[key]);
          return;
        }
        obj[key] = form[key];
      });

      setTimeout(async () => {
        loading();
        if (this.id) {
          //编辑
          const { data: res } = await edit("info", {
            ...obj,
            id: this.id,
          });
          if (res.code !== 0) return this.$message.error(res.msg);
          if (editForm) {
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
      console.log(res);
      if (!validatenull(res.fileName)) {
        this.$message.success("上传成功");
      }
      done();
    },
    // 预览
    uploadPreview(file, column, done) {},
    // 上传失败
    uploadError(error, column) {
      this.$message.success("上传失败" + error);
    },
    // 判断一个值是否存在数组中
    isInArray(arr, value) {
      for (var i = 0; i < arr.length; i++) {
        if (value === arr[i]) {
          return true;
        }
      }
      return false;
    },
  },
};
</script>

<style></style>
