<template>
  <basic-container>
    <avue-crud
      :data="data"
      :option="option"
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
        <el-button type="primary" icon="el-icon-document">生成汇总表</el-button>
      </template>
    </avue-crud>
    <el-dialog
      title="上报工作量"
      :visible.sync="dialogVisible"
      width="30%"
      class="avue-dialog"
    >
      <el-form ref="formRef" :model="form" label-width="80px">
        <el-form-item label="表格名称">
          <el-input v-model="form.bgmc"></el-input>
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
import { option } from "@/const/crud/salary/info/uncertainty";

export default {
  data() {
    return {
      data: [{}],
      option: option,
      search: {},
      page: {
        total: 100,
        current: 1,
        size: 10,
      },

      dialogVisible: false,

      form: {
        bgmc: undefined,
        bmmc: undefined,
        rs: undefined,
        bz: undefined,
      },
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
