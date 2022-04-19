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
        <el-button type="text" icon="el-icon-view" @click="passRow(scope.row)"
          >通过</el-button
        >
        <el-button type="text" icon="el-icon-view" @click="refuseRow(scope.row)"
          >拒绝</el-button
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
    <el-dialog
      title="拒绝原因"
      :visible.sync="dialogVisible_refuse"
      width="30%"
      class="avue-dialog"
      append-to-body
    >
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4 }"
        placeholder="请输入拒绝原因"
        v-model="denialReason"
      >
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible_refuse = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible_refuse = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </basic-container>
</template>

<script>
import { option, optionChild } from "@/const/crud/salary/audit/uncertainty";

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
      dialogVisible_refuse: false,

      //拒绝原因
      denialReason: undefined,

      dataChild: [{}],
      optionChild: optionChild,
    };
  },
  methods: {
    viewRow(row) {
      this.dialogVisible = true;
    },
    passRow(row) {
      console.log(row);
    },
    refuseRow(row) {
      this.dialogVisible_refuse = true;
    },
  },
};
</script>

<style></style>
