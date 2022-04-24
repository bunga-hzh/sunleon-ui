<template>
  <basic-container>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="个调税管理" name="1">
        <avue-crud
          :option="opitons[0]"
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
      <el-tab-pane label="纳税统计管理" name="2">
        <avue-crud
          :option="opitons[1]"
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
      </el-tab-pane>
    </el-tabs>
  </basic-container>
</template>

<script>
import { opitons } from "@/const/crud/salary/info/individualtax";

export default {
  data() {
    return {
      data: undefined,
      opitons: opitons,
      form: {},
      search: {},
      page: {
        total: 100,
        current: 1,
        size: 10,
      },

      activeName: "1",
    };
  },
  methods: {
    handleClick() {},
  },
};
</script>

<style></style>
