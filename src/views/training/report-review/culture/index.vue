<template>
  <basic-container>
    <avue-crud :data="data" :option="option" :page.sync="page">
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
  }
}
</script>
