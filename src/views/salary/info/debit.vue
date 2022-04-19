<template>
  <basic-container>
    <avue-crud :data="data" :option="option">
      <template slot="menuLeft">
        <el-button type="primary" icon="el-icon-upload2">导入</el-button>
        <el-button type="primary" icon="el-icon-download">导出</el-button>
        <el-button type="primary">下载模板</el-button>
        <el-button type="primary" icon="el-icon-document">生成汇总表</el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
import { option } from "@/const/crud/salary/info/debit";

export default {
  data() {
    return {
      data: undefined,
      option: option,
    };
  },
};
</script>

<style></style>
