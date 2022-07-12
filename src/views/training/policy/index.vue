<template>
  <basic-container>
    <avue-crud :data='data' :option='option'>
      <template slot='menu'>
        <el-button type="text" icon="el-icon-download">下载</el-button>
        <el-button type="text" icon="el-icon-view">预览</el-button>
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
      option: option
    }
  }
}
</script>
