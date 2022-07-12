<template>
  <basic-container>
    <el-row :gutter="20">
      <el-col :span="6">
        <avue-tree :option="treeOption" :data="treeData" @node-click="nodeClick"></avue-tree>
      </el-col>
      <el-col :span="18">
        <avue-crud :data="loadData" :option="loadOption" v-model="obj">
          <template slot="menuLeft">
            <el-button type="primary" icon="el-icon-delete">删除</el-button>
            <el-button type="primary" icon="el-icon-setting">分配权限</el-button>
          </template>
        </avue-crud>
      </el-col>
    </el-row>
  </basic-container>
</template>

<script>
import { treeOption, loadOption } from "./option"

export default {
  data() {
    return {
      obj: {},
      treeData: [{
        value: 0,
        label: '系统管理员',
      },
      {
        value: 1,
        label: '师训员',
      },
      {
        value: 2,
        label: '分管领导',
      }],
      treeOption: treeOption,
      loadData: [],
      loadData1: [
        {
          name: '张三',
          sex: '男'
        }
      ],
      loadData2: [
        {
          name: '李四2',
          sex: '女'
        }
      ],
      loadOption: loadOption,
    }
  },
  created() {
    this.loadData = this.loadData1;
  },
  methods: {
    nodeClick(data) {
      if (data.value == 0) {
        this.loadData = this.loadData1;
      } else if (data.value == 1) {
        this.loadData = this.loadData2;
      }
      this.$message.success(JSON.stringify(data))
    }
  }
}
</script>
