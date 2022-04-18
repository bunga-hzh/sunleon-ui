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
            <el-button type="primary" icon="el-icon-check" @click="report"
              >提交报表</el-button
            >
          </template>
        </avue-crud></el-tab-pane
      >
      <el-tab-pane label="绩效外" name="2">无</el-tab-pane>
    </el-tabs>
    <el-dialog title="报表" :visible.sync="dialogVisible" width="60%">
      <el-row>
        <el-form label-width="120px">
          <el-form-item label="表格名称">
            <el-col :span="8">
              <el-input v-model="tableName"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="按（年/月）统计">
            <avue-select
              v-model="datetype"
              placeholder="请选择内容"
              type="tree"
              :dic="reportDic"
            ></avue-select>
          </el-form-item>
          <el-form-item label="统计（年/月）" v-show="datetype">
            <avue-date
              v-show="datetype === '1'"
              v-model="month"
              type="month"
              format="yyyy 年 MM 月"
              value-format="yyyy-MM"
              placeholder="请选择日期"
            ></avue-date>
            <avue-date
              v-show="datetype === '2'"
              v-model="year"
              type="year"
              format="yyyy 年"
              value-format="yyyy"
              placeholder="请选择日期"
            ></avue-date>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <avue-crud
          :option="reportOption"
          :data="reportData"
          :page.sync="reportPage"
        ></avue-crud>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >提交审核</el-button
        >
      </span>
    </el-dialog>
  </basic-container>
</template>

<script>
import {
  option,
  reportOption,
  reportDic,
} from "@/const/crud/salary/info/sporadic";

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

      activeName: "1",

      dialogVisible: false,
      reportDic: reportDic,
      datetype: undefined,
      month: undefined,
      year: undefined,
      reportOption: reportOption,
      reportData: undefined,
      reportPage: {
        total: 100,
        current: 1,
        size: 10,
      },
      tableName: undefined,
    };
  },
  methods: {
    report() {
      this.dialogVisible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-row {
  padding: 10px;
}
</style>
