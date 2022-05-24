<template>
  <basic-container>
    <el-tabs v-model="activeName"
             type="card"
             @tab-click="handleClick">
      <el-tab-pane v-for="item in tabList"
                   :key="item.id"
                   :label="item.label"
                   :name="item.value">
        <avue-crud :data="data"
                   :option="option"
                   :search.sync="search"
                   :page.sync="page">
          <template slot="menu">
            <el-button type="text"
                       icon="el-icon-setting"
                       @click="jobsalarySet">薪级工资设置</el-button>
          </template>
        </avue-crud>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="岗位工资设置"
               :visible.sync="dialogVisible"
               width="60%"
               class="avue-dialog">
      <avue-crud :data="dataChild"
                 :option="optionChild"
                 :search.sync="searchChild"
                 :page.sync="pageChild">
        <template slot="menu">
          <el-button type="text"
                     icon="el-icon-setting
"
                     @click="jobsalarySet">薪级工资设置</el-button>
        </template>
      </avue-crud>
      <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </basic-container>
</template>

<script>
import {
  option,
  datas,
  optionChild,
} from "@/const/crud/salary/set/salaryscale";

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
      tabList: [
        { label: "工人", value: "1" },
        { label: "专业技术人员", value: "2" },
        { label: "管理人员", value: "3" },
        { label: "工人", value: "4" },
      ],
      // 当前激活标签
      activeName: "1",
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
    // 标签点击事件
    handleClick(val) {
      this.data = this.datas[val.index];
    },
    jobsalarySet() {
      this.dialogVisible = true;
    },
  },
  mounted() {
    this.data = this.datas[0];
  },
};
</script>

<style></style>
