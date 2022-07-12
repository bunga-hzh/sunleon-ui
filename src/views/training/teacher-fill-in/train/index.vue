<template>
  <basic-container>
    <avue-crud :data="data" :option="option" :page.sync="page">
      <template slot="menuLeft">
        <el-button type="primary" icon="el-icon-delete">删除</el-button>
      </template>
      <template slot='menu' slot-scope="scope">
        <el-button type="text" icon="el-icon-upload">上传附件</el-button>
        <span>&nbsp;&nbsp;或&nbsp;&nbsp;</span>
        <el-button type="text" icon="el-icon-tickets" @click="toTrainSummary(scope.row)">填写培训小结</el-button>
      </template>
      <template slot='stepsForm' slot-scope="scope">
        <el-steps :active="scope.row" finish-status="success" direction="vertical"
          style="height: 200px;margin-top: 20px">
          <el-step title="步骤 1"></el-step>
          <el-step title="步骤 2"></el-step>
          <el-step title="步骤 3"></el-step>
        </el-steps>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
import { option } from "./option"

export default {
  data() {
    return {
      data: [{}],
      option: option,
      page: {
        total: 1,
        currentPage: 1,
        pageSize: 10,
      }
    }
  },
  methods: {
    toTrainSummary(row) {
      this.$router.push(`/train-summary/index/${row.id}`)
    }
  }
}
</script>
