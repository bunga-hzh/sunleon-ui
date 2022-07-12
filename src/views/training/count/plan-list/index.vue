<template>
  <basic-container>
    <avue-crud :data='data' :option='option'>
      <template slot='menu'>
        <el-button type="text" icon="el-icon-tickets">操作手册</el-button>
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
