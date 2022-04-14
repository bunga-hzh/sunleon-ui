<template>
  <basic-container>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="绩效内" name="1">
        <avue-crud
          :option="option"
          :data="data"
          :search.sync="search"
          :page.sync="page"
        >
          <template slot="menuLeft">
            <el-button type="primary" icon="el-icon-upload2">导入</el-button>
            <el-button type="primary" icon="el-icon-download">导出</el-button>
            <el-button type="primary">下载模板</el-button>
          </template>
        </avue-crud></el-tab-pane
      >
      <el-tab-pane label="绩效外" name="2">无</el-tab-pane>
    </el-tabs>
  </basic-container>
</template>

<script>
import LogicFlow from "@logicflow/core";
import { option } from "@/const/crud/salary/info/sporadic";

export default {
  data() {
    return {
      data: [{}],
      option: option,
      form: {},
      search: {},
      page: {
        total: 100,
        current: 1,
        size: 10,
      },

      bmmcDic: undefined,
      ywndDic: undefined,
      yfDic: undefined,

      activeName: "1",
    };
  },
};
</script>

<style></style>
