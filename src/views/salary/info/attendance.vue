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
      </template>
      <template slot="bmmcSearch">
        <avue-select
          v-model="search"
          placeholder="请选择内容"
          type="tree"
          :dic="bmmcDic"
        ></avue-select>
      </template>
      <template slot="bmmcForm">
        <avue-select
          v-model="form"
          placeholder="请选择内容"
          type="tree"
          :dic="bmmcDic"
        ></avue-select>
      </template>
      <template slot="ywndSearch">
        <avue-select
          v-model="search"
          placeholder="请选择内容"
          type="tree"
          :dic="ywndDic"
        ></avue-select>
      </template>
      <template slot="ywndForm">
        <avue-select
          v-model="form"
          placeholder="请选择内容"
          type="tree"
          :dic="ywndDic"
        ></avue-select>
      </template>
      <template slot="yfSearch">
        <avue-select
          v-model="search"
          placeholder="请选择内容"
          type="tree"
          :dic="yfDic"
        ></avue-select>
      </template>
      <template slot="yfForm">
        <avue-select
          v-model="form"
          placeholder="请选择内容"
          type="tree"
          :dic="yfDic"
        ></avue-select>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
import { option } from "@/const/crud/salary/info/attendance";

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
    };
  },
};
</script>

<style></style>
