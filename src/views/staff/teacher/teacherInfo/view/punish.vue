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
import { validatenull } from "@/util/validate";

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
      let obj = {
        ...form,
        staffId: this.staffId,
        cfrq: validatenull(form.cfrq) ? undefined : form.cfrq[0],
        cfcxrq: validatenull(form.cfrq) ? undefined : form.cfrq[1],
      };
      setTimeout(async () => {
        if (this.id) {
          //编辑
          const { data: res } = await edit("punish", { ...obj, id: this.id });
          if (res.code !== 0) return this.$message.error(res.msg);
          loading();
          this.$message.success("保存成功!");
        } else {
          //添加
          const { data: res } = await add("punish", obj);
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
      if (validatenull(res.data.records[0])) return;
      this.obj = {
        ...res.data.records[0],
        cfrq: validatenull(res.data.records[0].cfrq)
          ? undefined
          : res.data.records[0].cfrq[0],
        cfcxrq: validatenull(res.data.records[0].cfrq)
          ? undefined
          : res.data.records[0].cfrq[1],
      };
    },
  },
};
</script>
