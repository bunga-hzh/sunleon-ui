<template>
  <basic-container>
    <el-row type="flex" justify="center">
      <el-col :span="7">
        <avue-select v-model="year" placeholder="请选择学年" type="tree" :dic="yearDic" style="width: 120px"></avue-select>
        <span>学年校本研修活动时间安排表</span>
      </el-col>
    </el-row>
    <avue-crud :data="data" :option="option"></avue-crud>
    <el-card :shadow="never">
      说明：勾选“师德修养”的，“类别”指：专题讲座、网络学习、观看光盘、讲述育人故事等；勾选“其他研修课程”的，“类别”指：读书、听学术讲座、参加署级及以上学术活动、观课评课、校级课题研究、专题研讨。
    </el-card>
    <el-card :shadow="never">
      <el-row type="flex" justify="space-between">
        <el-col :span="3">填表人：演示账户</el-col>
        <el-col :span="3">审核人（校长）：张</el-col>
      </el-row>
    </el-card>
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
