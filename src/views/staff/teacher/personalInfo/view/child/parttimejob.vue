<template>
  <avue-crud v-model="form"
             :data="data"
             :option="option"
             :table-loading="showLoading"
             :before-open="beforeOpen"
             @on-load="onLoad"
             @refresh-change="refresh"
             @row-save="rowSave"
             @row-update="rowUpdate"
             @row-del="rowDel">
    <template slot="shjzqsrq"
              slot-scope="scope">
      {{ scope.row.shjzqsrq }} - {{ scope.row.shjzzzrq }}
    </template>
  </avue-crud>
</template>
<script>
import { mapGetters } from "vuex";
import { option } from "./option/parttimejob";
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
    ...mapGetters(["userInfo", "getStaffId"]),
  },
  watch: {
    getActiveItem(newValue) {
      if (newValue === undefined) return true;
      if (newValue == "parttimejob") {
        this.refresh();
      }
    },
  },
  methods: {
    beforeOpen(done, type) {
      if (type === "edit" || type === "view") {
        this.form.shjzqsrq = [this.form.shjzqsrq, this.form.shjzzzrq];
      }
      done();
    },
    // 获取列表
    async fetchList() {
      this.showLoading = true;
      const { data: res } = await fetchList("parttimejob", {
        current: 1,
        size: 20,
        staffId: this.getStaffId,
      });
      if (res.code !== 0) return this.$message.error(res.msg);
      this.showLoading = false;
      this.data = res.data.records;
    },
    // 初次加载
    onLoad() {
      this.fetchList();
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
          staffId: this.getStaffId,
          shjzqsrq: validatenull(form.shjzqsrq) ? undefined : form.shjzqsrq[0],
          shjzzzrq: validatenull(form.shjzqsrq) ? undefined : form.shjzqsrq[1],
        };
        const { data: res } = await addObj("parttimejob", obj);
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
          shjzqsrq: validatenull(form.shjzqsrq) ? undefined : form.shjzqsrq[0],
          shjzzzrq: validatenull(form.shjzqsrq) ? undefined : form.shjzqsrq[1],
        };
        const { data: res } = await putObj("parttimejob", obj);
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
          const { data: res } = await delObj("parttimejob", form.id);
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
    refresh() {
      this.fetchList();
    },
  },
};
</script>
