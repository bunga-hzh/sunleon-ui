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
        <el-button type="primary" @click="viewResults"
          >教职工年度绩效不合格名单<span
            v-show="passNum > 0"
            :style="passNum > 0 ? 'color: red' : ''"
            >（{{ passNum }}）</span
          ></el-button
        >
        <el-button type="primary" icon="el-icon-document">生成汇总表</el-button>
      </template>
    </avue-crud>
    <el-dialog
      title="教职工绩效年度绩效不合格名单"
      :visible.sync="dialogVisible"
      width="60%"
      class="avue-dialog"
    >
      <avue-crud :option="optionChild" :data="dataChild"></avue-crud>
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
import { option, optionChild } from "@/const/crud/salary/info/countrysalary";

export default {
  data() {
    return {
      data: [{}],
      option: option,
      search: {},
      page: {
        total: 100,
        current: 1,
        size: 10,
      },

      dialogVisible: false,
      passNum: 1,

      dataChild: undefined,
      optionChild: optionChild,
    };
  },
  methods: {
    viewResults() {
      this.dialogVisible = true;
    },
  },
};
</script>

<style></style>
