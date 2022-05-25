<template>
  <avue-form ref="form"
             v-model="obj"
             :option="option"
             :upload-before="uploadBefore"
             :upload-after="uploadAfter"
             :upload-preview="uploadPreview"
             :upload-error="uploadError"
             :upload-delete="uploadDelete"
             @submit="submit">
  </avue-form>
</template>

<script>
import { fetchList } from "@/api/staff/crud";
import { getObj } from "@/api/admin/sys-file";
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
      setTimeout(async () => {
        loading();
        let startTime = undefined;
        let endTime = undefined;
        let cardIdFront = undefined;
        let cardIdBack = undefined;
        let zgxlz = undefined;
        let qrzxlz = undefined;
        if (!validatenull(form.jjzqssj)) {
          startTime = form.jjzqssj[0];
          endTime = form.jjzqssj[1];
        }
        if (!validatenull(form.sfzFrontImg) && this.type === "add") {
          cardIdFront = form.sfzFrontImg[0].value;
        } else {
          cardIdFront = form.sfzFrontImg;
        }
        if (!validatenull(form.sfzBackImg) && this.type === "add") {
          cardIdBack = form.sfzBackImg[0].value;
        } else {
          cardIdBack = form.sfzBackImg;
        }
        if (!validatenull(form.zgxlzsc) && this.type === "add") {
          zgxlz = form.zgxlzsc[0].value;
        } else {
          zgxlz = form.zgxlzsc;
        }
        if (!validatenull(form.qrzxlzsc) && this.type === "add") {
          qrzxlz = form.qrzxlzsc[0].value;
        } else {
          qrzxlz = form.qrzxlzsc;
        }
        const obj = {
          orgId: form.orgId,
          xm: form.xm,
          gh: form.gh,
          xm: form.xm,
          cym: form.cym,
          sfzjh: form.sfzjh,
          sfzFrontImg: cardIdFront,
          sfzBackImg: cardIdBack,
          csrq: form.csrq,
          jsnl: form.jsnl,
          csd: form.csd,
          xbm: form.xbm,
          mzm: form.mzm,
          zzmmm: form.zzmmm,
          jg: JSON.stringify(form.jg),
          lxdh: form.lxdh,
          dzyx: form.dzyx,
          jtzz: form.jtzz,
          jjlxrxm: form.jjlxrxm,
          jjlxrdh: form.jjlxrdh,
          ssjyz: form.ssjyz,
          zgxl: form.zgxl,
          zgxlzy: form.zgxlzy,
          zgxwm: form.zgxwm,
          zgxwzy: form.zgxwzy,
          zgxlbyyx: form.zgxlbyyx,
          zgxlzsc: zgxlz,
          qrzxl: form.qrzxl,
          qrzzy: form.qrzzy,
          qrzxw: form.qrzxw,
          qrzbyyx: form.qrzbyyx,
          qrzxlzsc: qrzxlz,
          hjlb: form.hjlb,
          hkszdm: JSON.stringify(form.hkszdm),
          hkxxdz: form.hkxxdz,
          jzxxdz: form.jzxxdz,
          rdrq: form.rdrq,
          jkzkm: form.jkzkm,
          hyzkm: form.hyzkm,
          dqztm: form.dqztm,
          htlx: form.htlx,
          jjzqssj: startTime,
          jjzjzsj: endTime,
          sflh: form.sflh,
          zyjsrylb: form.zyjsrylb,
          sfjyzyzg: form.sfjyzyzg,
          bz: form.bz,
        };
        // let obj = {};
        // Object.keys(form).forEach((key) => {
        //   // if (this.isInArray(this.uploads, key)) {
        //   //   obj[key] = form[key][0].value;
        //   //   return;
        //   // }
        //   if (key === "jjzqssj") {
        //     obj["jjzqssj"] = form[key][0];
        //     obj["jjzjzsj"] = form[key][1];
        //     return;
        //   }
        //   if (key === "jg" || key === "hkszdm") {
        //     obj[key] = JSON.stringify(form[key]);
        //     return;
        //   }
        //   obj[key] = form[key];
        // });
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
    // 上传前
    uploadBefore(file, done, loading, column) {
      done();
    },
    // 上传后
    uploadAfter(res, done, loading, column) {
      if (!validatenull(res.fileName)) {
        this.$message.success("上传成功");
      }
      done();
    },
    // 删除上传
    uploadDelete(column, file) {
      // this.obj[file.prop] = undefined;
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
      }
    },
    // 上传失败
    uploadError(error, column) {
      this.$message.error("上传失败" + error);
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
