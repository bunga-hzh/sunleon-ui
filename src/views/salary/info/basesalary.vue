<template>
  <basic-container>
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
    </avue-crud>
  </basic-container>
</template>

<script>
import { opiton } from "@/const/crud/salary/info/basesalary";

export default {
  data() {
    return {
      data: undefined,
      option: opiton,
      form: {},
      search: {},
      page: {
        total: 100,
        current: 1,
        size: 10,
      },
    };
  },
};
</script>

<style></style>
