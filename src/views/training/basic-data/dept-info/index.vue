<template>
  <basic-container>
    <avue-crud :data="data" :option="option" :page.sync="page">
      <template slot="menuLeft">
        <el-button type="primary" icon="el-icon-download">导入</el-button>
        <el-button type="primary" icon="el-icon-upload">导出</el-button>
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
