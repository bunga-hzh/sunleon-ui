<template>
  <basic-container>
    <el-tabs v-model="activeName"
             type="card"
             @tab-click="handleClick">
      <el-tab-pane v-for="(item, index) in tabs"
                   :key="item.id"
                   :label="item.label"
                   :name="item.value">
        <avue-crud :data="data"
                   :option="options[index]"
                   :search.sync="search"
                   :page.sync="page">
          <template slot="menuLeft">
            <el-button type="primary"
                       icon="el-icon-upload2"
                       v-show="index === 0">导入其他字段</el-button>
            <el-button type="primary"
                       icon="el-icon-upload2"
                       v-show="index === 9 || index === 10">导入</el-button>
            <el-button type="primary"
                       icon="el-icon-download"
                       v-show="index === 9 || index === 10">导出</el-button>
            <el-button type="primary"
                       v-show="index === 9 || index === 10">下载模板</el-button>
          </template>
        </avue-crud>
      </el-tab-pane>
    </el-tabs>
  </basic-container>
</template>

<script>
import { options } from "@/const/crud/salary/info/annualincome";

export default {
  data() {
    return {
      // 当前激活标签页
      activeName: "1",
      tabs: [
        { label: "汇总", value: "1" },
        { label: "财政工资", value: "2" },
        { label: "校内奖金", value: "3" },
        { label: "零星收入", value: "4" },
        { label: "绩效奖励", value: "5" },
        { label: "社保", value: "6" },
        { label: "公积金", value: "7" },
        { label: "工会费", value: "8" },
        { label: "代扣个调税", value: "9" },
        { label: "其他-培训中心发放", value: "10" },
        { label: "培训中心绩效外发放", value: "11" },
        { label: "其他校外收入汇总", value: "12" },
      ],
      data: [{}],
      options: options,
      search: {},
      page: {
        total: 100,
        current: 1,
        size: 10,
      },
    };
  },
  methods: {
    // 标签页切换事件
    handleClick(val) {},
  },
};
</script>

<style></style>
