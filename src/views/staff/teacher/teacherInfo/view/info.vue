<template>
  <avue-form ref="form"
             v-model="obj"
             :option="option"
             @submit="submit">
  </avue-form>
</template>

<script>
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
    ...mapGetters({ id: "getStaffId" }),
    ...mapMutations(["setStaffId"]),
  },
  watch: {
    id(newValue) {
      if (newValue == undefined) {
        this.option.submitText = "添加";
        this.$refs.form.resetForm();
      }
    },
  },
  methods: {
    submit(form, loading) {
      setTimeout(async () => {
        if (this.id) {
          //编辑
          const editForm = { ...form, id: this.id };
          const { data: res } = await edit("info", editForm);
          if (res.code !== 0) return this.$message.error(res.msg);
          loading();
          this.$message.success("保存成功!");
        } else {
          //添加
          const { data: res } = await add("info", form);
          if (res.code !== 0) return this.$message.error(res.msg);
          this.$store.commit("setStaffId", res.data);
          loading();
          this.option.submitText = "保存";
          this.$message.success("添加成功!");
        }
      }, 1000);
    },
  },
};
</script>

<style></style>
