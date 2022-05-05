<template>
  <basic-container>
    <el-alert
      style="margin-bottom: 20px"
      title="请于每月25号之前提交数据"
      type="warning"
      :disabled="false"
    >
    </el-alert>
    <!-- <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="审核" name="1">
        <avue-crud
          :data="data"
          :option="options[0]"
          :search.sync="search"
          :page.sync="page"
        >
          <template slot="shzt" slot-scope="scope">
            <el-tag v-if="scope.row.shzt === 1">待审核</el-tag>
            <el-tag type="success" v-if="scope.row.shzt === 2">审核通过</el-tag>
            <el-tag type="danger" v-if="scope.row.shzt === 3"
              >审核不通过</el-tag
            >
          </template>
          <template slot="menu" slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-view"
              @click="viewRow(scope.row)"
            >
              查看详情</el-button
            >
            <el-button
              type="text"
              icon="el-icon-view"
              @click="passRow(scope.row)"
              v-show="scope.row.shzt === 1"
              >通过</el-button
            >
            <el-button
              type="text"
              icon="el-icon-view"
              @click="refuseRow(scope.row)"
              v-show="scope.row.shzt === 1"
              >拒绝</el-button
            >
          </template>
        </avue-crud>
      </el-tab-pane>
      <el-tab-pane label="上报" name="2"> </el-tab-pane>
    </el-tabs> -->
    <avue-crud
      :data="data"
      :option="options[1]"
      :search.sync="search"
      :page.sync="page"
    >
      <template slot="shzt" slot-scope="scope">
        <el-tag v-if="scope.row.shzt === 1">待审核</el-tag>
        <el-tag type="success" v-if="scope.row.shzt === 2">审核通过</el-tag>
        <el-tag type="danger" v-if="scope.row.shzt === 3">审核不通过</el-tag>
        <el-tag type="warning" v-if="scope.row.shzt === 4">审核中</el-tag>
        <el-tag type="info" v-if="scope.row.shzt === 5">待提交</el-tag>
      </template>
      <template slot="menuLeft">
        <el-button type="primary" icon="el-icon-document" @click="report"
          >上报工作量</el-button
        >
        <el-button type="primary" icon="el-icon-document">生成汇总表</el-button>
      </template>
      <template slot="menu" slot-scope="scope">
        <el-button type="text" icon="el-icon-view" @click="viewRow(scope.row)">
          查看详情</el-button
        >
        <el-button type="text" icon="el-icon-view" v-show="scope.row.shzt === 3"
          >查看原因</el-button
        >
        <el-button
          type="text"
          icon="el-icon-document"
          @click="viewRow(scope.row)"
          v-show="scope.row.shzt === 3"
          >重新上报</el-button
        >
        <el-button
          type="text"
          icon="el-icon-document"
          v-show="scope.row.shzt === 5"
          >提交</el-button
        >
      </template>
    </avue-crud>
    <!-- 上报工作量 -->
    <el-dialog
      title="上报工作量"
      :visible.sync="dialogVisible_report"
      width="60%"
      class="avue-dialog"
      @close="isClose = true"
      @open="isClose = false"
    >
      <el-tabs v-model="activeNameChild" type="card">
        <el-tab-pane label="导入数据" name="1" disabled>
          <el-form
            :model="form"
            :rules="rules"
            ref="formRef"
            class="demo-ruleForm"
            label-width="80px"
          >
            <el-form-item label="项目名称" prop="xmmc">
              <el-input v-model="form.xmmc"></el-input>
            </el-form-item>
            <el-form-item label="资金类型" prop="zjlx">
              <avue-select
                v-model="form.zjlx"
                placeholder="请选择内容"
                type="tree"
                :dic="[
                  { label: '校内', value: '1' },
                  { label: '校外', value: '2' },
                ]"
              ></avue-select>
            </el-form-item>
            <el-form-item label="金额" prop="je">
              <avue-input-number
                v-model="form.je"
                :min-rows="0"
              ></avue-input-number>
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
            <el-form-item>
              <el-button
                ref="uploadBtn"
                type="primary"
                :icon="isUploading ? 'el-icon-loading' : 'el-icon-upload2'"
                @click="uploadSuccess"
                >导入</el-button
              >
              <el-button type="primary" icon="el-icon-download"
                >下载模板</el-button
              >
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="预览" name="2" disabled>
          <avue-crud :data="dataChild" :option="optionChild"> </avue-crud
        ></el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible_report = false">取 消</el-button>
        <el-button @click="activeName = '1'" v-show="isShow">上一步</el-button>
        <el-button type="primary" @click="submit">{{ btnName }}</el-button>
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
  options,
  optionChild,
  rules,
} from "@/const/crud/salary/audit/uncertainty";

export default {
  data() {
    return {
      activeName: "1",
      activeNameChild: "1",
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
      ],
      options: options,
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
        jxlx: undefined,
        bz: undefined,
      },
      rules: rules,

      //拒绝原因
      denialReason: undefined,

      dataChild: [{}],
      optionChild: optionChild,

      isUpload: false,
      isUploading: false,
      btnName: "预览",
      isShow: false,
      isClose: false,
    };
  },
  methods: {
    handleClick(val) {
      if (val.index == 0) {
        this.data = [
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
        ];
      }
      if (val.index == 1) {
        this.data = [
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
          {
            bgmc: "部门一校内奖金7月份统计",
            bmmc: "部门一",
            yf: "7月",
            zje: 1000000,
            sqsj: "7月11日",
            shzt: 5,
            bz: "无",
          },
        ];
      }
    },
    viewRow(row) {
      this.dialogVisible = true;
      if (row.shzt === 3 || row.shzt === 5) this.optionChild.menu = true;
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
    // 预览 or 提交
    submit() {
      if (this.activeNameChild === "2") {
        console.log("提交成功");
      }
      if (!this.isUpload) return this.$message.error("请先导入数据！");
      this.activeNameChild = "2";
    },
    // 上传成功
    uploadSuccess() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          this.isUploading = true;
          setTimeout(() => {
            this.$message.success("导入成功!");
            this.isUploading = false;
            this.isUpload = true;
            this.activeNameChild = "2";
          }, 2000);
        } else {
          this.$message.error("请填写表格名称！");
        }
      });
    },
  },
  watch: {
    activeNameChild(newValue, oldValue) {
      if (newValue === "2") {
        this.btnName = "提交";
        this.isShow = true;
      } else {
        this.btnName = "预览";
        this.isShow = false;
      }
    },
    isClose(newValue, oldValue) {
      if (newValue) {
        this.activeNameChild = "1";
        this.isUpload = false;
        this.$refs.formRef.resetFields();
      }
    },
  },
};
</script>

<style></style>
