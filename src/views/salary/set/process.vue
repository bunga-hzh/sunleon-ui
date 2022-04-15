<template>
  <basic-container>
    <avue-crud
      :option="option"
      :data="data"
      :search.sync="search"
      :page.sync="page"
    >
      <template slot="menuLeft">
        <el-button type="primary" icon="el-icon-plus" @click="add"
          >新增</el-button
        >
        <el-button type="danger" icon="el-icon-delete">删除</el-button>
        <el-button type="primary" icon="el-icon-delete">通过</el-button>
        <el-button type="warning" icon="el-icon-delete">拒绝</el-button>
      </template>
      <template slot="menu">
        <el-button type="text" icon="el-icon-view">查看详情</el-button>
        <el-button type="text" icon="el-icon-s-order">审核</el-button>
      </template>
    </avue-crud>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="60%"
      @opened="createLogicFlow"
    >
      <el-row>
        <el-form ref="formRef" :model="form" label-width="80px">
          <el-col :span="24">
            <el-form-item label="流程名称">
              <el-input v-model="form.lcmc"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="描述">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4 }"
                placeholder="请输入内容"
                v-model="form.ms"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <el-row>
        <div class="container" ref="container"></div>
      </el-row>
    </el-dialog>
  </basic-container>
</template>

<script>
import LogicFlow from "@logicflow/core";
import "@logicflow/core/dist/style/index.css";
import UserTask from "@/const/crud/salary/set/UserTaskNode.js";
import { option, data } from "@/const/crud/salary/set/process";

export default {
  data() {
    return {
      data: data,
      option: option,
      form: {},
      search: {},
      page: {
        total: 100,
        current: 1,
        size: 10,
      },

      dialogVisible: false,
    };
  },
  methods: {
    // 添加
    add() {
      this.dialogVisible = true;
    },
    createLogicFlow() {
      this.lf = new LogicFlow({
        container: this.$refs.container,
      });
      this.lf.register(UserTask);
      this.lf.render({
        nodes: [
          {
            type: "UserTask",
            x: 100,
            y: 100,
          },
        ],
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-row {
  padding: 20px;
}
.container {
  width: 100%;
  height: 500px;
  border: 1px solid #eee;
}
</style>
