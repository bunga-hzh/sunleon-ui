<template>
  <basic-container>
    <avue-crud
      :data="data"
      :option="option"
      :search.sync="search"
      :page.sync="page"
    >
      <template slot="shzt" slot-scope="scope">
        <el-tag v-if="scope.row.shzt === 1">待审核</el-tag>
        <el-tag type="success" v-if="scope.row.shzt === 2">审核通过</el-tag>
        <el-tag type="danger" v-if="scope.row.shzt === 3">审核不通过</el-tag>
        <el-tag type="warning" v-if="scope.row.shzt === 4">审核中</el-tag>
      </template>
      <template slot="menuLeft">
        <el-button
          type="primary"
          icon="el-icon-document"
          @click="report"
          v-show="role === '1' || role === '2'"
          >上报工作量</el-button
        >
        <el-button type="primary" icon="el-icon-document" v-show="role === '2'"
          >生成汇总表</el-button
        >
      </template>
      <template slot="menu" slot-scope="scope">
        <el-button
          type="text"
          icon="el-icon-view"
          @click="viewRow(scope.row)"
          v-show="!(role === '1' && scope.row.shzt === 3)"
        >
          查看详情</el-button
        >
        <el-button
          v-show="role === '2' || role === '3'"
          type="text"
          icon="el-icon-view"
          @click="passRow(scope.row)"
          >通过</el-button
        >
        <el-button
          v-show="role === '2' || role === '3'"
          type="text"
          icon="el-icon-view"
          @click="refuseRow(scope.row)"
          >拒绝</el-button
        >
        <el-button
          type="text"
          icon="el-icon-view"
          v-show="role === '1' && scope.row.shzt === 3"
          >查看原因</el-button
        >
        <el-button
          type="text"
          icon="el-icon-document"
          @click="viewRow(scope.row)"
          v-show="role === '1' && scope.row.shzt === 3"
          >重新上报</el-button
        >
      </template>
    </avue-crud>
    <el-radio-group v-model="role">
      <el-radio-button label="1">各部门负责人</el-radio-button>
      <el-radio-button label="2">薪酬管理员</el-radio-button>
      <el-radio-button label="3">领导审核</el-radio-button>
    </el-radio-group>
    <!-- 上报工作量 -->
    <el-dialog
      title="上报工作量"
      :visible.sync="dialogVisible_report"
      width="60%"
      class="avue-dialog"
      @close="isClose = true"
      @open="isClose = false"
    >
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="审核信息" name="1" disabled>
          <el-form
            :model="form"
            :rules="rules"
            ref="formRef"
            class="demo-ruleForm"
            label-width="80px"
          >
            <el-form-item label="表格名称" prop="bgmc">
              <el-input v-model="form.bgmc"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="bz">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4 }"
                placeholder="请输入内容"
                v-model="form.bz"
              >
              </el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="导入数据" name="2" disabled>
          <avue-crud :data="dataChild" :option="optionChild">
            <template slot="menuLeft">
              <el-button type="primary" icon="el-icon-upload2">导入</el-button>
              <el-button type="primary" icon="el-icon-download"
                >下载模板</el-button
              >
              <el-button type="primary" icon="el-icon-view">预览</el-button>
            </template>
          </avue-crud></el-tab-pane
        >
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible_report = false">取 消</el-button>
        <el-button @click="activeName = '1'" v-show="isShow">上一步</el-button>
        <el-button type="primary" @click="nextSubmit">{{ next }}</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="校内工资发放明细"
      :visible.sync="dialogVisible"
      width="60%"
      class="avue-dialog"
      @closed="changeMenu"
    >
      <avue-crud :data="dataChild" :option="optionChild"></avue-crud>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="拒绝原因"
      :visible.sync="dialogVisible_refuse"
      width="30%"
      class="avue-dialog"
      append-to-body
    >
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4 }"
        placeholder="请输入拒绝原因"
        v-model="denialReason"
      >
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible_refuse = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible_refuse = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </basic-container>
</template>

<script>
import {
  option,
  optionChild,
  rules,
} from "@/const/crud/salary/audit/oncampussalary";

export default {
  data() {
    return {
      role: "1",
      activeName: "1",
      next: "下一步",
      isShow: false,
      isClose: false,
      data: [
        {
          bgmc: "部门一校内奖金3月份统计",
          bmmc: "部门一",
          yf: "3月",
          zje: 1000000,
          sqsj: "3月11日",
          shzt: 1,
          bz: "无",
        },
        {
          bgmc: "部门一校内奖金4月份统计",
          bmmc: "部门一",
          yf: "4月",
          zje: 1000000,
          sqsj: "4月11日",
          shzt: 2,
          bz: "无",
        },
        {
          bgmc: "部门一校内奖金5月份统计",
          bmmc: "部门一",
          yf: "5月",
          zje: 1000000,
          sqsj: "5月11日",
          shzt: 3,
          bz: "无",
        },
        {
          bgmc: "部门一校内奖金6月份统计",
          bmmc: "部门一",
          yf: "6月",
          zje: 1000000,
          sqsj: "6月11日",
          shzt: 4,
          bz: "无",
        },
      ],
      option: option,
      search: {},
      page: {
        total: 100,
        current: 1,
        size: 10,
      },

      dialogVisible: false,
      dialogVisible_refuse: false,

      dialogVisible_report: false,
      form: {
        bgmc: undefined,
        bz: undefined,
      },
      rules: rules,

      //拒绝原因
      denialReason: undefined,

      dataChild: [{}],
      optionChild: optionChild,
    };
  },
  methods: {
    viewRow(row) {
      this.dialogVisible = true;
      if (row.shzt === 3) this.optionChild.menu = true;
    },
    passRow(row) {
      console.log(row);
    },
    refuseRow(row) {
      this.dialogVisible_refuse = true;
    },
    report() {
      this.dialogVisible_report = true;
    },
    changeMenu() {
      this.optionChild.menu = false;
    },
    nextSubmit() {
      if (this.activeName === "2") {
        console.log("提交");
      }
      if (this.activeName === "1") {
        this.$refs.formRef.validate((valid) => {
          if (valid) {
            this.activeName = "2";
          } else {
            this.$message.error("请填写表格名称！");
          }
        });
      }
    },
  },
  watch: {
    activeName(newValue, oldValue) {
      if (newValue === "2") {
        this.next = "提交审核";
        this.isShow = true;
      } else {
        this.next = "下一步";
        this.isShow = false;
      }
    },
    isClose(newValue, oldValue) {
      if (newValue) {
        this.activeName = "1";
        this.$refs.formRef.resetFields();
      }
    },
  },
};
</script>

<style></style>
