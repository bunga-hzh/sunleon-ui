<template>
  <div class="engage_container">
    <basic-container>
      <avue-crud
        v-model="form"
        :option="option"
        :search.sync="search"
        :data="data"
        :page.sync="page"
      >
        <template slot="objIdSearch">
          <el-select v-model="search.objId" placeholder="请选择">
            <el-option
              v-for="item in objIdOption"
              :key="item.value"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </template>
        <template slot="ydlxSearch">
          <el-select v-model="search.ydlx" placeholder="请选择">
            <el-option
              v-for="item in ydlxOption"
              :key="item.value"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </template>
        <template slot="ydsjForm">
          <el-date-picker
            v-model="form.ydsj"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </template>
        <template slot="ydsjdForm">
          <el-date-picker
            v-model="form.ydsjd"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </template>
        <template slot="bzForm">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入内容"
            v-model="form.bz"
          >
          </el-input>
        </template>
        <template slot="zmfjForm">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </template>
      </avue-crud>
    </basic-container>
  </div>
</template>

<script>
import { option, data } from "@/const/crud/staff/teacher/change/stateChange";

export default {
  name: "TableEngage",
  data() {
    return {
      // 表格配置对象
      option: option,
      // 表格数据源集合
      data: data,
      // 搜索的表单对象
      search: {
        objId: undefined,
        ydlx: undefined,
      },
      // 分页查询对象
      page: {
        total: 1000,
        currentPage: 1,
        pageSize: 10,
      },
      // 表单对象
      form: {},
      // 下拉对象
      objIdOption: undefined,
      ydlxOption: undefined,
    };
  },
  methods: {},
  created() {},
};
</script>

<style lang="scss" scoped></style>
