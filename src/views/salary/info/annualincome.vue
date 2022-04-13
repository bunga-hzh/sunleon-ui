<template>
  <basic-container>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane
        v-for="(item, index) in tabs"
        :key="item.id"
        :label="item.label"
        :name="item.value"
      >
        <avue-crud
          :data="data"
          :option="options[index]"
          :search.sync="search"
          :page.sync="page"
          v-model="form"
        >
          <template slot="menuLeft">
            <el-button type="primary" icon="el-icon-upload2">导入</el-button>
            <el-button type="primary" icon="el-icon-download">导出</el-button>
            <el-button type="primary">下载模板</el-button>
          </template>
          <template slot="gzyfSearch">
            <avue-select
              v-model="search"
              placeholder="请选择内容"
              type="tree"
              :dic="gzyfDic"
            ></avue-select>
          </template>
          <template slot="gzyfForm">
            <avue-select
              v-model="form"
              placeholder="请选择内容"
              type="tree"
              :dic="gzyfDic"
            ></avue-select>
          </template>
          <template slot="bzForm">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4 }"
              placeholder="请输入内容"
              v-model="form.bz"
              maxlength="200"
            >
            </el-input>
          </template>
        </avue-crud>
      </el-tab-pane>
    </el-tabs>
  </basic-container>
</template>

<script>
import { getNsrtjtabs } from "@/const/staff/getSelectOption";
import { options } from "@/const/crud/salary/info/annualincome";

export default {
  data() {
    return {
      // 当前激活标签页
      activeName: undefined,
      tabs: undefined,
      data: undefined,
      options: options,
      search: {},
      form: {},
      page: {
        total: 100,
        current: 1,
        size: 10,
      },

      gzyfDic: undefined,
    };
  },
  methods: {
    // 标签页切换事件
    handleClick(val) {
      console.log(val);
    },
    async getNsrtjtabs() {
      const { data: res } = await getNsrtjtabs();
      if (res.code !== 0) return this.$message.error(res.msg);
      this.tabs = res.data;
      this.activeName = this.tabs[0].value;
    },
  },
  mounted() {
    this.getNsrtjtabs();
  },
};
</script>

<style></style>
