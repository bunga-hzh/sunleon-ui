<template>
  <basic-container>
    <el-row type="flex" justify="center">
      <el-col :span="6">
        <avue-select v-model="year" placeholder="请选择学年" type="tree" :dic="yearDic" style="width: 120px"></avue-select>
        <span>校本研修活动考勤、考核记录表</span>
      </el-col>
    </el-row>
    <el-row style="text-align: center">（学校研修课程—《师德修养》）</el-row>
    <el-row>
      <avue-crud v-model="obj" :option="option">
      </avue-crud>
    </el-row>
  </basic-container>
</template>

<script>
import { option } from './option'

export default {
  data() {
    return {
      year: null,
      yearDic: null,

      data: [{}],
      option: option,
    }
  }
}
</script>

<style>
</style>
