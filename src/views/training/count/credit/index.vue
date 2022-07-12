<template>
  <basic-container>
    <avue-crud :data='data' :option='option'>
      <template slot='menuLeft'>
        <el-button type="primary" icon="el-icon-upload">导入</el-button>
        <el-button type="primary" icon="el-icon-position">进入区级平台</el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
import { option } from './option'

export default {
  data() {
    return {
      data: [{}],
      option: option,
    }
  }
}
</script>

<style>
</style>
