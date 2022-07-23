<template>
  <div>
    <avue-crud
      :data="data"
      :option="option"
      v-model="form"
      :page.sync="page"
      :table-loading="showLoading"
      :before-open="beforeOpen"
      :permission="permissionList"
      @on-load="onLoad"
      @row-save="rowSave"
      @row-update="rowUpdate"
      @row-del="rowDel"
      @refresh-change="refreshChange"
      @search-change="searchChange"
    >
      <template slot="menu" slot-scope="scope">
        <el-button
          v-if="set_btn"
          type="text"
          icon="el-icon-setting"
          @click="set(scope.row)"
        >
          <span v-if="settingType === constants.POST_SALARY">岗位工资设置</span>
          <span v-else-if="settingType === constants.SALARY_LEVEL"
            >薪级工资设置</span
          >
          <span v-else-if="settingType === constants.SUBSIDY"
            >岗位津贴设置</span
          >
          <span v-else></span>
        </el-button>
        <el-button
          v-if="open_btn"
          type="text"
          icon="el-icon-open"
          @click="open(scope.row)"
          >启用</el-button
        >
        <el-button
          v-if="off_btn"
          type="text"
          icon="el-icon-turn-off"
          @click="off(scope.row)"
          >停用</el-button
        >
      </template>
      <template slot="status" slot-scope="scope">
        <i
          v-if="scope.row.status === openStatus"
          class="el-icon-open"
          style="color: #67c23a; font-size: 30px"
        />
        <i
          v-if="scope.row.status === offStatus"
          class="el-icon-turn-off"
          style="color: #909399; font-size: 30px"
        />
      </template>
      <template slot="startTime" slot-scope="scope">
        {{ scope.row.startTime }} ~ {{ scope.row.endTime }}
      </template>
    </avue-crud>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      class="avue-dialog avue-dialog--top"
      top="0"
      :destroy-on-close="false"
      :close-on-click-modal="false"
      @close="closeDialog"
    >
      <slot name="dialog" :id="rowId"></slot>
      <span slot="footer" class="avue-dialog__footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { option } from "./option";
import { mapGetters } from "vuex";
import { fetchList, addObj, putObj, delObj } from "@/api/salary/commonApi";
import { setStatus } from "@/api/salary/setting";
import SettingType from "@/const/crud/salary/constants";
import { validatenull } from "@/util/validate";
import constants from "@/const/crud/salary/constants";

export default {
  props: {
    settingType: {
      required: true,
      type: Number,
    },
  },
  data() {
    return {
      form: {},
      data: [{}],
      option: option,
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
      },
      showLoading: false,
      set_btn: true,
      open_btn: true,
      off_btn: true,
      openStatus: constants.OPEN_STATUS,
      offStatus: constants.OFF_STATUS,
      dialogVisible: false,
      dialogTitle: null,
      constants: constants,
      rowId: null,
    };
  },
  created() {
    this.set_btn = this.permissions["sal_salsetting_set"]; //导出
    this.open_btn = this.permissions["sal_salsetting_open"]; //导入
    this.off_btn = this.permissions["sal_salsetting_off"]; //子集
  },
  computed: {
    ...mapGetters(["permissions"]),
    permissionList() {
      return {
        addBtn: this.vaildData(this.permissions.sal_salsetting_add, false),
        delBtn: this.vaildData(this.permissions.sal_salsetting_del, false),
        editBtn: this.vaildData(this.permissions.sal_salsetting_edit, false),
      };
    },
  },
  methods: {
    beforeOpen(done, type) {
      if (type === "edit" || type === "view") {
        this.form.startTime =
          validatenull(this.form.startTime) || validatenull(this.form.endTime)
            ? undefined
            : [this.form.startTime, this.form.startTime];
      }
      done();
    },
    async getList(query) {
      this.showLoading = true;
      const { data: res } = await fetchList(
        "setting",
        Object.assign(
          {
            current: this.page.currentPage,
            size: this.page.pageSize,
          },
          {
            settingType: this.settingType,
          },
          query
        )
      );
      if (res.code != 0) return this.$message.error(res.msg);
      this.page.total = res.data.total;
      this.data = res.data.records;
      this.showLoading = false;
    },
    onLoad() {
      this.getList();
    },
    refreshChange() {
      this.getList();
    },
    async rowSave(form, done, loading) {
      const obj = {
        name: form.name,
        startTime: validatenull(form.startTime) ? null : form.startTime[0],
        endTime: validatenull(form.startTime) ? null : form.startTime[1],
        settingType: this.settingType,
      };
      const { data: res } = await addObj("setting", obj);
      if (res.code != 0) return this.$message.error(res.msg);
      this.$message.success("添加成功！");
      this.getList();
      done();
    },
    async rowUpdate(form, index, done, loading) {
      const obj = {
        id: form.id,
        name: form.name,
        startTime: validatenull(form.startTime) ? null : form.startTime[0],
        endTime: validatenull(form.startTime) ? null : form.startTime[1],
        settingType: SettingType.POST_SALARY,
      };
      const { data: res } = await putObj("setting", obj);
      if (res.code != 0) return this.$message.error(res.msg);
      this.$message.success("修改成功！");
      done(obj);
    },
    async rowDel(form, index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await delObj("setting", form.id);
          if (res.code !== 0)
            return this.$message.error("删除失败！" + res.msg);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.refreshChange();
        })
        .catch(() => {});
    },
    searchChange(params, done) {
      this.page.currentPage = 1;
      this.getList(params);
      done();
    },
    set(row) {
      this.dialogVisible = true;
      this.rowId = row.id;
      this.$emit("get-row-id", row.id);
      if (this.settingType === constants.POST_SALARY)
        return (this.dialogTitle = "岗位工资设置");

      if (this.settingType === constants.SALARY_LEVEL)
        return (this.dialogTitle = "薪级工资设置");

      if (this.settingType === constants.SUBSIDY)
        return (this.dialogTitle = "岗位津贴设置");
    },
    async open(row) {
      if (row.status === constants.OPEN_STATUS)
        return this.$notify.warning("当前项已启用！");
      const obj = {
        id: row.id,
        settingType: this.settingType,
        status: constants.OPEN_STATUS,
      };
      const { data: res } = await setStatus(obj);
      if (res.code != 0) return this.$message.error(res.msg);
      this.$message.success("启用成功");
      row.status = constants.OPEN_STATUS;
    },
    async off(row) {
      if (row.status === constants.OFF_STATUS)
        return this.$notify.warning("当前项已停用！");
      const obj = {
        id: row.id,
        status: constants.OFF_STATUS,
      };
      const { data: res } = await setStatus(obj);
      if (res.code != 0) return this.$message.error(res.msg);
      this.$message.success("停用成功");
      row.status = constants.OFF_STATUS;
    },
    closeDialog() {
      this.dialogTitle = null;
    },
  },
};
</script>
