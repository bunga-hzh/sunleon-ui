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
    <template slot="xxqssj"
              slot-scope="scope">
      {{ scope.row.xxqssj }} - {{ scope.row.xxzzsj }}
    </template>
  </avue-crud>
</template>
<script>
import { mapGetters } from "vuex";
import { option } from "../option/train";
import { fetchList, addObj, delObj, putObj } from "@/api/staff/crud";

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
      if (newValue == "train") {
        this.showLoading = true;
        fetchList("train", {
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
        this.form.xxqssj = [this.form.xxqssj, this.form.xxzzsj];
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
        const newForm = {
          staffId: this.staffId,
          pxbmc: form.pxbmc,
          pxxs: form.pxxs,
          pxlb: form.pxlb,
          zbdw: form.zbdw,
          cjcgcj: form.cjcgcj,
          sfxlxwjs: form.sfxlxwjs,
          xxqssj: form.xxqssj[0],
          xxzzsj: form.xxqssj[1],
        };
        const { data: res } = await addObj("train", newForm);
        if (res.code !== 0) return this.$message.error(res.msg);
        done({ ...newForm, id: res.data });
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
        const newForm = {
          id: form.id,
          staffId: this.staffId,
          pxbmc: form.pxbmc,
          pxxs: form.pxxs,
          pxlb: form.pxlb,
          zbdw: form.zbdw,
          cjcgcj: form.cjcgcj,
          sfxlxwjs: form.sfxlxwjs,
          xxqssj: form.xxqssj[0],
          xxzzsj: form.xxqssj[1],
        };
        const { data: res } = await putObj("train", newForm);
        if (res.code !== 0) return this.$message.error(res.msg);
        done(newForm);
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
          const { data: res } = await delObj("train", form.id);
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
      const { data: res } = await fetchList("train", {
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
