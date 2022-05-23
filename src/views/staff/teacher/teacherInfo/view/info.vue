<template>
  <avue-form ref="form"
             v-model="obj"
             :option="option"
             @submit="submit">
  </avue-form>
</template>

<script>
import { fetchList } from "@/api/staff/crud";
import { mapGetters, mapMutations } from "vuex";
import { option } from "../option/info";
import { get, add, edit } from "@/const/staff/crud";

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
      var startTime,
        endTiem,
        hkszdm,
        jg = undefined;
      if (form.jjzqssj !== undefined) {
        startTime = form.jjzqssj[0];
        endTiem = form.jjzqssj[1];
        delete form.jjzqssj;
      }
      if (form.hkszdm !== undefined) {
        hkszdm = JSON.stringify(form.hkszdm);
        delete form.hkszdm;
      }
      if (form.jg !== undefined) {
        jg = JSON.stringify(form.jg);
        delete form.jg;
      }
      setTimeout(async () => {
        loading();
        if (this.id) {
          //编辑
          const editForm = {
            ...form,
            id: this.id,
            jjzqssj: startTime,
            jjzjzsj: endTiem,
            jg: jg,
            hkszdm: hkszdm,
          };
          const { data: res } = await edit("info", editForm);
          if (res.code !== 0) return this.$message.error(res.msg);
          if (editForm) {
            this.$store.commit("setXm", editForm.xm);
            this.$store.commit("setSfzjh", editForm.sfzjh);
          }
          this.$message.success("保存成功!");
        } else {
          const addForm = {
            ...form,
            jjzqssj: startTime,
            jjzjzsj: endTiem,
            jg: jg,
            hkszdm: hkszdm,
          };
          //添加
          const { data: res } = await add("info", addForm);
          if (res.code !== 0) return this.$message.error(res.msg);
          if (addForm) {
            this.$store.commit("setXm", addForm.xm);
            this.$store.commit("setSfzjh", addForm.sfzjh);
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
  },
};
</script>

<style></style>
