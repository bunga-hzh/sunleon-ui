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
      <template slot="shztSearch">
        <avue-select
          v-model="search"
          placeholder="请选择"
          type="tree"
          :dic="shztDic"
        ></avue-select>
      </template>
      <template slot="shztForm">
        <avue-select
          v-model="form"
          placeholder="请选择"
          type="tree"
          :dic="shztDic"
        ></avue-select>
      </template>
    </avue-crud>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="60%">
      <el-button type="primary" @click="$refs.flow.addNode('测试节点')"
        >添加节点</el-button
      >
      <el-button type="primary" @click="handleNext">下一个节点</el-button>
      <br /><br />
      <avue-flow
        :height="600"
        :width="1200"
        ref="flow"
        :option="flowOption"
        v-model="flowForm"
      >
        <template slot-scope="scope" slot="header">
          <i
            class="el-icon-delete"
            @click="$refs.flow.deleteNode(scope.node.id)"
          ></i>
          自定义头部
        </template>
        <div slot-scope="{ node }">
          <span>自定义{{ (node || {}).name }}</span>
        </div>
      </avue-flow>
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
import { option, flowOption } from "@/const/crud/salary/set/process";

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

      shztDic: undefined,

      dialogVisible: false,

      flowOption: flowOption,
      count: 0,
      flowForm: "",
    };
  },
  methods: {
    // 添加
    add() {
      this.dialogVisible = true;
    },
    handleClick(node) {
      this.$message.success(JSON.stringify(node));
    },
    handleNext() {
      this.count++;
      if (this.count >= this.nodeList.length) {
        this.count = 0;
      }
      this.form = this.nodeList[this.count].id;
    },
  },
  computed: {
    nodeList() {
      return this.flowOption.nodeList;
    },
  },
  mounted() {
    this.flowForm = this.nodeList[this.count].id;
  },
};
</script>

<style></style>
