<template>
  <basic-container>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane
        v-for="item in tabList"
        :key="item.id"
        :label="item.label"
        :name="item.value"
      >
        <avue-crud
          :data="data"
          :option="option"
          :search.sync="search"
          :page.sync="page"
        >
          <template slot="menu">
            <el-button
              type="text"
              icon="el-icon-setting
"
              @click="jobsalarySet"
              >岗位津贴设置</el-button
            >
          </template>
        </avue-crud>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      title="岗位工资设置"
      :visible.sync="dialogVisible"
      width="60%"
      class="avue-dialog"
    >
      <avue-crud
        :data="dataChild"
        :option="optionChild"
        :search.sync="searchChild"
        :page.sync="pageChild"
      >
        <template slot="menu">
          <el-button
            type="text"
            icon="el-icon-setting
"
            @click="jobsalarySet"
            >岗位津贴设置</el-button
          >
        </template>
      </avue-crud>
      <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </basic-container>
</template>

<script>
import { option, datas, optionChild } from "@/const/crud/salary/set/allowance";
import { getRygwlx } from "@/const/staff/getSelectOption";

export default {
  data() {
    return {
      data: undefined,
      datas: datas,
      option: option,
      search: {},
      form: {},
      page: {
        total: 100,
        current: 1,
        size: 10,
      },
      tabList: undefined,
      // 当前激活标签
      activeName: undefined,
      dialogVisible: false,

      dataChild: undefined,
      optionChild: optionChild,
      searchChild: {},
      pageChild: {
        total: 100,
        current: 1,
        size: 10,
      },
    };
  },
  methods: {
    async getRygwlx() {
      const { data: res } = await getRygwlx();
      if (res.code !== 0) return this.$message.error(res.msg);
      this.tabList = res.data;
      this.activeName = this.tabList[0].value;
    },
    // 标签点击事件
    handleClick(val) {
      this.data = this.datas[val.index];
    },
    jobsalarySet() {
      this.dialogVisible = true;
    },
  },
  mounted() {
    this.getRygwlx();
    this.data = this.datas[0];
  },
};
</script>

<style></style>
