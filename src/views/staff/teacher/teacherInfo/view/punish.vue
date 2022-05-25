<template>
  <avue-form ref="form"
             v-model="obj"
             :option="option"
             @submit="submit">
  </avue-form>
</template>

<script>
import { fetchList } from "@/api/staff/crud";
import { mapGetters } from "vuex";
import { option } from "../option/punish";
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
      if (newValue == "punish_reward") {
        this.getPunishObj();
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
      const startTime = form.cfrq[0];
      const endTiem = form.cfrq[1];
      delete form.cfrq;
      setTimeout(async () => {
        if (this.id) {
          const editForm = {
            ...form,
            id: this.id,
            cfrq: startTime,
            cfcxrq: endTiem,
          };
          //编辑
          const { data: res } = await edit("punish", editForm);
          if (res.code !== 0) return this.$message.error(res.msg);
          loading();
          this.$message.success("保存成功!");
        } else {
          const addForm = {
            ...form,
            staffId: this.staffId,
            cfrq: startTime,
            cfcxrq: endTiem,
          };
          //添加
          const { data: res } = await add("punish", addForm);
          if (res.code !== 0) return this.$message.error(res.msg);
          this.id = res.data;
          this.option.submitText = "保存";
          loading();
          this.$message.success("添加成功!");
        }
      }, 1000);
    },
    async getPunishObj() {
      const { data: res } = await fetchList("punish", {
        current: 1,
        size: 1,
        staffId: this.staffId,
      });
      if (res.code !== 0) return this.$message.error(res.msg);
      if (res.data.records.length === 0) return;
      this.id = res.data.records[0].id;
      const time = [res.data.records[0].cfrq, res.data.records[0].cfcxrq];
      delete res.data.records[0].cfrq;
      delete res.data.records[0].cfcxrq;
      this.obj = { ...res.data.records[0], cfrq: time };
    },
  },
};
</script>
