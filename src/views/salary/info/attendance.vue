<template>
  <basic-container>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane
        v-for="tab in tabs"
        :key="tab.name"
        :label="tab.label"
        :name="tab.name"
      >
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
      </el-tab-pane>
    </el-tabs>
  </basic-container>
</template>

<script>
import { option, tabs } from "@/const/crud/salary/info/attendance";

export default {
  data() {
    return {
      data: undefined,
      search: {},
      page: {
        total: 100,
        current: 1,
        size: 10,
      },

      option: option,
      tabs: tabs,
      activeName: "1",
    };
  },
  methods: {
    handleClick(val) {
      console.log(val.index);
    },
  },
};
</script>

<style></style>
