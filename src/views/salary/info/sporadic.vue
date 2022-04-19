<template>
  <basic-container>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="绩效内" name="1">
        <avue-crud
          :option="options[0]"
          :data="data"
          :search.sync="search"
          :page.sync="page"
        >
          <template slot="menuLeft">
            <el-button type="primary" icon="el-icon-upload2">导入</el-button>
            <el-button type="primary" icon="el-icon-download">导出</el-button>
            <el-button type="primary">下载模板</el-button>
            <el-button type="primary" icon="el-icon-check" @click="report"
              >上报工作量</el-button
            >
            <el-button type="primary" icon="el-icon-document"
              >生成汇总表</el-button
            >
          </template>
        </avue-crud></el-tab-pane
      >
      <el-tab-pane label="绩效外" name="2">
        <avue-crud
          :option="options[1]"
          :data="data"
          :search.sync="search"
          :page.sync="page"
        >
          <template slot="menuLeft">
            <el-button type="primary" icon="el-icon-upload2">导入</el-button>
            <el-button type="primary" icon="el-icon-download">导出</el-button>
            <el-button type="primary">下载模板</el-button>
            <el-button type="primary" icon="el-icon-check" @click="report"
              >上报工作量</el-button
            >
            <el-button type="primary" icon="el-icon-document"
              >生成汇总表</el-button
            >
          </template>
        </avue-crud></el-tab-pane
      >
      <el-tab-pane label="汇总" name="3">
        <avue-crud
          :option="options[2]"
          :data="data"
          :search.sync="search"
          :page.sync="page"
        >
          <template slot="menuLeft">
            <el-button type="primary" icon="el-icon-upload2">导入</el-button>
            <el-button type="primary" icon="el-icon-download">导出</el-button>
            <el-button type="primary">下载模板</el-button>
            <el-button type="primary" icon="el-icon-check" @click="report"
              >上报工作量</el-button
            >
            <el-button type="primary" icon="el-icon-document"
              >生成汇总表</el-button
            >
          </template>
        </avue-crud></el-tab-pane
      >
    </el-tabs>
    <el-dialog title="上报工作量" :visible.sync="dialogVisible" width="60%">
      <el-form ref="formRef" :model="form" label-width="80px">
        <el-form-item label="表格名称">
          <el-input v-model="form.bgmc"></el-input>
        </el-form-item>
        <el-form-item label="绩效类型">
          <avue-select
            style="width: 100%"
            v-model="form.jxlx"
            placeholder="请选择内容"
            type="tree"
            :dic="[
              { label: '绩效内', value: '1' },
              { label: '绩效外', value: '2' },
            ]"
          ></avue-select>
        </el-form-item>
        <el-form-item label="部门名称">
          <avue-select
            style="width: 100%"
            v-model="form.bmmc"
            placeholder="请选择内容"
            type="tree"
            :dic="undefined"
          ></avue-select>
        </el-form-item>
        <el-form-item label="人数">
          <avue-input-number
            v-model="form.rs"
            style="width: 100%"
          ></avue-input-number>
        </el-form-item>
        <el-form-item label="总金额">
          <avue-input-number
            v-model="form.zje"
            style="width: 100%"
          ></avue-input-number>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入备注"
            v-model="form.bz"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <avue-crud
        v-show="form.jxlx === '2'"
        :data="dataChild"
        :option="optionChild"
      >
        <template slot="menu">
          <el-button type="text" icon="el-icon-upload2">上传附件</el-button>
        </template>
      </avue-crud>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >提交审核</el-button
        >
      </span>
    </el-dialog>
  </basic-container>
</template>

<script>
import { options, optionChild } from "@/const/crud/salary/info/sporadic";

export default {
  data() {
    return {
      data: [{}],
      options: options,
      form: {},
      search: {},
      page: {
        total: 100,
        current: 1,
        size: 10,
      },

      activeName: "1",

      dialogVisible: false,
      form: {
        bgmc: undefined,
        jxlx: undefined,
        bmmc: undefined,
        rs: undefined,
        zje: undefined,
        bz: undefined,
      },

      dataChild: undefined,
      optionChild: optionChild,
    };
  },
  methods: {
    report() {
      this.dialogVisible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-row {
  padding: 10px;
}
</style>
