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
    <template slot="qssj"
              slot-scope="scope">
      {{ scope.row.qssj }} - {{ scope.row.zzsj }}
    </template>
  </avue-crud>
</template>
<script>
import { mapGetters } from "vuex";
import { option } from "../option/servicetoenterprise";
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
    ...mapGetters({
      type: "getDialogType",
      staffId: "getStaffId",
      activeName: "getActiveItem",
      tableData: "getData",
    }),
  },
  watch: {
    type: {
      handler(newValue) {
        if (newValue === undefined) return true;
        if (newValue === "view") {
          this.option.addBtn = false;
          this.option.menu = false;
        } else {
          this.option.addBtn = true;
          this.option.menu = true;
        }
      },
      immediate: true,
    },
    staffId(newValue) {
      if (newValue == undefined) {
        this.data = undefined;
      }
    },
    activeName(newValue) {
      if (newValue === undefined) return true;
      if (newValue == "servicetoenterprise") {
        this.showLoading = true;
        fetchList("servicetoenterprise", {
          current: 1,
          size: 20,
          staffId: this.staffId,
        }).then((res) => {
          if (res.data.code !== 0) return this.$message.error(res.msg);
          this.showLoading = false;
          this.data = res.data.data.records;
        });
      }
    },
  },
  methods: {
    beforeOpen(done, type) {
      if (type === "edit" || type === "view") {
        this.form.qssj = [this.form.qssj, this.form.zzsj];
      }
      done();
    },
    // 添加
    rowSave(form, done, loading) {
      if (this.staffId == undefined) {
        done();
        return this.$message.warning("请先填写个人基本信息!");
      }
      if (JSON.stringify(form) === "{}") {
        loading();
        return this.$message.warning("请输入信息!");
      }
      setTimeout(async () => {
        const obj = {
          ...form,
          staffId: this.staffId,
          qssj: validatenull(form.qssj) ? undefined : form.qssj[0],
          zzsj: validatenull(form.qssj) ? undefined : form.qssj[1],
        };
        const { data: res } = await addObj("servicetoenterprise", obj);
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
          qssj: validatenull(form.qssj) ? undefined : form.qssj[0],
          zzsj: validatenull(form.qssj) ? undefined : form.qssj[1],
        };
        const { data: res } = await putObj("servicetoenterprise", obj);
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
          const { data: res } = await delObj("servicetoenterprise", form.id);
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
      if (!this.staffId) return true;
      this.showLoading = true;
      const { data: res } = await fetchList("servicetoenterprise", {
        current: 1,
        size: 20,
        staffId: this.staffId,
      });
      if (res.code !== 0) return this.$message.error(res.msg);
      this.showLoading = false;
      this.data = res.data.records;
    },
  },
  created() {},
};
</script>
