<template>
  <avue-crud v-model="form"
             :data="data"
             :option="option"
             :table-loading="showLoading"
             :before-open="beforeOpen"
             @refresh-change="refresh"
             @row-save="rowSave"
             @row-update="rowUpdate"
             @row-del="rowDel">
    <template slot="qfrq"
              slot-scope="scope">
      {{ scope.row.qfrq }} - {{ scope.row.zzrq }}
    </template>
  </avue-crud>
</template>
<script>
import { mapGetters } from "vuex";
import { option } from "@/views/staff/teacher/teacherInfo/child/option/furtherstudyforeign";
import { fetchList, addObj, delObj, putObj } from "@/api/staff/crud";
import { validatenull } from "@/util/validate";

export default {
  data() {
    return {
      obj: {},
      option: option,
      data: [],
      form: {},
      showLoading: false,
    };
  },
  computed: {
    ...mapGetters(["userInfo", "getActiveItem"]),
  },
  watch: {
    getActiveItem(newValue) {
      if (newValue === undefined) return true;
      if (newValue == "futurestudyforeign") {
        this.refresh();
      }
    },
  },
  methods: {
    beforeOpen(done, type) {
      if (type === "edit" || type === "view") {
        this.form.qfrq = [this.form.qfrq, this.form.zzrq];
      }
      done();
    },
    // 添加
    rowSave(form, done, loading) {
      if (JSON.stringify(form) === "{}") {
        loading();
        return this.$message.warning("请输入信息!");
      }
      setTimeout(async () => {
        const obj = {
          ...form,
          staffId: this.userInfo.userId,
          qfrq: validatenull(form.qfrq) ? undefined : form.qfrq[0],
          zzrq: validatenull(form.qfrq) ? undefined : form.qfrq[1],
        };
        const { data: res } = await addObj("furtherstudyforeign", obj);
        if (res.code !== 0) return this.$message.error(res.msg);
        done({ ...obj, id: res.data });
        this.$message.success("添加成功！");
      }, 1000);
    },
    // 编辑
    rowUpdate(form, index, done, loading) {
      if (JSON.stringify(form) === "{}") {
        loading();
        return this.$message.warning("请输入信息!");
      }
      setTimeout(async () => {
        const obj = {
          ...form,
          staffId: this.staffId,
          qfrq: validatenull(form.qfrq) ? undefined : form.qfrq[0],
          zzrq: validatenull(form.qfrq) ? undefined : form.qfrq[1],
        };
        const { data: res } = await putObj("furtherstudyforeign", obj);
        if (res.code !== 0) return this.$message.error(res.msg);
        done(obj);
        this.$message.success("修改成功！");
      }, 1000);
    },
    // 删除
    rowDel(form, index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await delObj("furtherstudyforeign", form.id);
          if (res.code !== 0)
            return this.$message.error("删除失败！" + res.msg);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.refresh();
        })
        .catch(() => {});
    },
    // 刷新
    async refresh() {
      this.showLoading = true;
      const { data: res } = await fetchList("furtherstudyforeign", {
        current: 1,
        size: 20,
        staffId: this.userInfo.userId,
      });
      if (res.code !== 0) return this.$message.error(res.msg);
      this.showLoading = false;
      this.data = res.data.records;
    },
  },
  created() {},
};
</script>
