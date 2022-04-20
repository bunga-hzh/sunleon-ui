<template>
  <basic-container>
    <avue-crud
      :data="data"
      :option="option"
      :search.sync="search"
      :page.sync="page"
    >
      <template slot="menu" slot-scope="scope">
        <el-button type="text" icon="el-icon-view" @click="viewRow(scope.row)"
          >查看详情</el-button
        >
      </template>
    </avue-crud>
    <el-dialog
      title="校内工资发放明细"
      :visible.sync="dialogVisible"
      width="60%"
      class="avue-dialog"
    >
      <avue-crud :data="dataChild" :option="optionChild"></avue-crud>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </basic-container>
</template>

<script>
import { option, optionChild } from "@/const/crud/salary/info/oncampussalary";

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

      dataChild: [{}],
      optionChild: optionChild,
    };
  },
  methods: {
    viewRow(row) {
      this.dialogVisible = true;
    },
  },
};
</script>

<style></style>
