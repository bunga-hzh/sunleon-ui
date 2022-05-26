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
import { mapGetters } from "vuex";
import { option } from "../option/jsfzxx";
import { get, add, edit } from "@/const/staff/crud";
import { validatenull } from "@/util/validate";
import { splitUploadData } from "../util/util";

export default {
  data() {
    return {
      obj: {},
      option: option,

      id: undefined,
    };
  },
  computed: {
    ...mapGetters({
      type: "getDialogType",
      staffId: "getStaffId",
      activeName: "getActiveItem",
      formObj: "getObj",
    }),
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
    staffId(newValue) {
      if (newValue == undefined) {
        this.option.submitText = "添加";
        this.$refs.form.resetForm();
        this.id = undefined;
      }
    },
    activeName(newValue) {
      if (newValue === undefined) return true;
      if (newValue == "jsfzxx") {
        if (!this.formObj) return true;
        this.id = this.formObj.id;
        this.obj = {
          ...this.formObj,
          jszgzsc: validatenull(this.formObj.jszgzsc)
            ? undefined
            : splitUploadData(this.formObj.jszgzsc),
        };
      }
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
      if (this.staffId == undefined) {
        loading();
        return this.$message.warning("请先填写个人基本信息!");
      }
      if (JSON.stringify(form) === "{}") {
        loading();
        return this.$message.warning("请输入信息!");
      }
      let obj = {
        ...form,
        jszgzsc: validatenull(form.jszgzsc) ? "" : form.jszgzsc[0].value,
      };
      setTimeout(async () => {
        loading();
        if (this.id) {
          //编辑
          const { data: res } = await edit("jsfzxx", { ...obj, id: this.id });
          if (res.code !== 0) return this.$message.error(res.msg);
          this.$message.success("保存成功!");
        } else {
          //添加
          const { data: res } = await add("jsfzxx", {
            ...obj,
            staffId: this.staffId,
          });
          if (res.code !== 0) return this.$message.error(res.msg);
          this.id = res.data;
          this.option.submitText = "保存";
          this.$message.success("添加成功!");
        }
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
    uploadPreview(file, column, done) {
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
      this.$message.success("上传失败" + error);
    },
  },
};
</script>
