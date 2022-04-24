<template>
  <basic-container>
    <avue-crud
      :data="data"
      :option="option"
      :search.sync="search"
      :page.sync="page"
    >
      <template slot="menuLeft">
        <el-button type="primary" icon="el-icon-plus" @click="add"
          >添加</el-button
        >
      </template>
      <template slot="menu" slot-scope="scope">
        <el-button type="text" icon="el-icon-view" @click="viewRow(scope.row)"
          >查看详情</el-button
        >
        <el-button type="text" icon="el-icon-edit" @click="editRow(scope.row)"
          >编辑</el-button
        >
      </template>
    </avue-crud>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="60%"
      class="avue-dialog"
    >
      <el-form ref="formRef" :model="form" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="form.mc" :disabled="isDisablead"></el-input>
        </el-form-item>
        <el-form-item label="月份">
          <avue-date
            v-model="form.yf"
            format="yyyy年MM月"
            value-format="yyyy-MM"
            placeholder="请选择日期"
            :disabled="isDisablead"
          ></avue-date>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入内容"
            v-model="form.bz"
            :disabled="isDisablead"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <el-row>
        <avue-crud
          :data="dataChild"
          :option="optionChild"
          :search.sync="searchChild"
          :page.sync="pageChild"
        ></avue-crud>
      </el-row>
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
import {
  option,
  optionChild,
} from "@/const/crud/salary/audit/oncampussalarylist";

export default {
  data() {
    return {
      option: option,
      data: [
        {
          id: 1,
          mc: "4月校内奖金维护名单",
          yf: "2022年4月",
          bz: "这是一条信息",
        },
      ],
      search: {},
      page: {
        total: 100,
        current: 1,
        size: 10,
      },

      title: undefined,
      dialogVisible: false,
      isDisablead: false,
      isEdit: false,
      form: {
        mc: undefined,
        yf: undefined,
      },

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
    add() {
      this.isEdit = false;
      this.title = "添加";
      this.dialogVisible = true;
    },
    viewRow(row) {
      this.isEdit = true;
      this.title = "查看详情";
      this.dialogVisible = true;
    },
    editRow(row) {
      this.isEdit = false;
      this.title = "编辑";
      this.dialogVisible = true;
    },
  },
  watch: {
    isEdit(newValue) {
      if (newValue) {
        this.isDisablead = true;
        this.optionChild.menu = false;
        this.optionChild.addBtn = false;
      } else {
        this.isDisablead = false;
        this.optionChild.menu = true;
        this.optionChild.addBtn = true;
      }
    },
  },
};
</script>

<style></style>
