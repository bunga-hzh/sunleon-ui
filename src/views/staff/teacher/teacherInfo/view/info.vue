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
    }),
    ...mapMutations(["setStaffId"]),
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
          console.log(this.formObj);
          this.obj = this.formObj;
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
        if (this.id) {
          //编辑
          const startTime = form.jjzqssj[0];
          const endTiem = form.jjzqssj[1];
          delete form.jjzqssj;
          const editForm = {
            ...obj,
            id: this.id,
            jjzqssj: startTime,
            jjzjzsj: endTiem,
          };
          const { data: res } = await edit("info", editForm);
          if (res.code !== 0) return this.$message.error(res.msg);
          loading();
          this.$message.success("保存成功!");
        } else {
          const startTime = form.jjzqssj[0];
          const endTiem = form.jjzqssj[1];
          delete form.jjzqssj;
          const addForm = {
            ...form,
            jjzqssj: startTime,
            jjzjzsj: endTiem,
          };
          //添加
          const { data: res } = await add("info", addForm);
          if (res.code !== 0) return this.$message.error(res.msg);
          this.$store.commit("setStaffId", res.data);
          loading();
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
