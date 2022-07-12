<template>
  <basic-container>
    <el-row type="flex" justify="center">
      <el-col :span="6">
        <avue-select v-model="year" placeholder="请选择学年" type="tree" :dic="yearDic" style="width: 120px"></avue-select>
        <span>学年校本研修学分申请表</span>
      </el-col>
    </el-row>
    <el-row>
      <avue-crud :data="data" :option="option">
        <template slot='append'>aaa</template>
      </avue-crud>
    </el-row>
    <el-row>
      <el-card shadow="never" style="line-height: 30px">
        说明：
        <br>
        1.“学分申请表”是各校审核并形成全校“学分认定汇总表”的重要依据，请务必认真并实事求是地填写；
        <br>
        2.表格中的“过程学分”、“成果学分”及“合计申请学分”已按“十四五”学分认定办法设置自动统计公式，个人无须填写，其他栏目填写完成后，会自动生成个人学分，请勿擅自改动；
        <br>
        3.实际核定学分由教发院核定后填写。
      </el-card>
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

      data: [],
      option: option,
    }
  }
}
</script>

<style>
</style>
