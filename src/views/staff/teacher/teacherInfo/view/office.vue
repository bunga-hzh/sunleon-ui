<template>
  <avue-form ref="form"
             v-model="obj"
             :option="option"
             @submit="submit">
  </avue-form>
</template>

<script>
import { mapGetters } from "vuex";
import { option } from "../option/office";
import { get, add, edit } from "@/const/staff/crud";

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
      if (newValue == "office") {
        this.obj = this.formObj;
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
      setTimeout(async () => {
        if (this.id) {
          //编辑
          const editForm = { ...form, id: this.id };
          const { data: res } = await edit("office", editForm);
          if (res.code !== 0) return this.$message.error(res.msg);
          loading();
          this.$message.success("保存成功!");
        } else {
          //添加
          const addForm = { ...form, staffId: this.staffId };
          const { data: res } = await add("office", addForm);
          if (res.code !== 0) return this.$message.error(res.msg);
          this.id = res.data;
          this.option.submitText = "保存";
          loading();
          this.$message.success("添加成功!");
        }
      }, 1000);
    },
  },
};
</script>
