<template>
  <basic-container>
    <el-row type="flex" justify="center">
      <el-col :span="5">
        <avue-select v-model="year" placeholder="请选择学年" type="tree" :dic="yearDic" style="width: 120px"></avue-select>
        <span>学年研修计划</span>
      </el-col>
    </el-row>
    <el-row>
      <avue-form v-model="obj" :option="option">
        <template slot='elCard'>
          <el-card shadow="never">
            说明：本表每学年填写一次。其中见习教师培训基地的指导教师需填写“本学年带教见习教师合格人数”，以申请相应学分。
          </el-card>
        </template>
      </avue-form>
    </el-row>
  </basic-container>
</template>

<script>
import { option } from "./option"

export default {
  data() {
    return {
      year: null,
      yearDic: null,

      obj: {},
      option: option,
    }
  }
}
</script>

<style>
</style>
