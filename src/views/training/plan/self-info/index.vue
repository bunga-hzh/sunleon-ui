<template>
  <basic-container>
    <el-row class="title">“十四五”校本研修个人计划个人情况</el-row>
    <avue-form v-model="obj" :option="option">
      <template slot='elCard'>
        <el-card shadow="never">
          说明： “个人情况”部分五年填写一次。
        </el-card>
      </template>
    </avue-form>
  </basic-container>
</template>

<script>
import { option } from './option'

export default {
  data() {
    return {
      obj: {},
      option: option,
    }
  }
}
</script>

<style scoped>
.title {
  text-align: center;
  padding: 0 20px 20px 20px;
  font-size: 18px;
  font-family: large;
}
</style>
