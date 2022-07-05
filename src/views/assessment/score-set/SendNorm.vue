<template>
  <basic-container>
    <el-card shadow="never"
             class="onepage">
      <div slot="header">
        <div class="title">
          {{ yearName }}测评表内容预览
          <el-button v-if="showSendBtn"
                     size="small"
                     round
                     @click="send">
            立即下发
          </el-button>
        </div>
        <div v-if="showYearInfo"
             class="item">
          <b>开始时间</b> {{ yearStart }}
          <b>结束时间</b> {{ yearEnd }}
        </div>
        <div v-if="showSendInfo"
             class="item">
          <b>状态：</b> {{ sendState }}
          <b>下发时间：</b> {{ operTime }}
          <b>下发人：</b> {{ operUserName }}
        </div>
      </div>
      <el-table v-loading="$store.state.loading"
                element-loading-text="加载中，请稍后"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :data="standards"
                :span-method="arraySpanMethod"
                style="width: 100%"
                border
                stripe>
        <el-table-column prop="categoryName"
                         label="考核类别" />
        <el-table-column prop="normName"
                         label="考核内容" />
        <el-table-column prop="evaluation"
                         label="评价要点" />
      </el-table>
    </el-card>
  </basic-container>
</template>
<script>
import "@/styles/assessment-style.scss";
import { OPER_TYPE } from "@/util/assessment/constants";
export default {
  name: "SendNorm",
  data() {
    return {
      yearId: null,
      yearName: null,
      standards: [],
      sendState: null,
      operTime: null,
      operUserName: null,
      showSendBtn: false,
      showSendInfo: false,
      showYearInfo: false,
      yearStart: null,
      yearEnd: null,
      record: {
        yearId: null,
        operType: OPER_TYPE.SEND_NORM,
      },
    };
  },
  mounted() {
    this.yearId = this.$store.state.user.yearId;
    this.yearName = this.$store.state.user.yearName;
    this.record.yearId = this.$store.state.user.yearId;
    this.query();
    this.querySendData();
    this.queryYear();
  },
  methods: {
    query() {
      this.$store.commit("setLoading", true);
      this.$http.get("/config/standard").then((res) => {
        this.standards = res.data.data;
        this.handleTableData();
        this.$store.commit("setLoading", false);
      });
    },
    querySendData() {
      this.$http
        .get("/config/operData", {
          params: {
            yearId: this.yearId,
            operType: OPER_TYPE.SEND_NORM,
          },
        })
        .then((res) => {
          if (res.data.code == 0) {
            this.showSendBtn = false;
            this.showSendInfo = true;
            this.sendState = "已下发";
            this.operTime = res.data.data.operTime;
            this.operUserName = res.data.data.operUserName;
          } else {
            this.showSendBtn = true;
            this.showSendInfo = false;
          }
        });
    },
    queryYear() {
      this.$http
        .get("/year/data", {
          params: {
            yearId: this.yearId,
          },
        })
        .then((res) => {
          if (res.data.code == 0) {
            this.showYearInfo = true;
            this.yearStart = res.data.data.yearStart;
            this.yearEnd = res.data.data.yearEnd;
          } else {
            this.showYearInfo = false;
          }
        });
    },
    send() {
      this.$confirm("确定要下发" + this.yearName + "测评表吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http.post("/config/sendNorm", this.record).then((res) => {
          if (res.data.code == 0) {
            this.$message.success(res.data.message);
            this.querySendData();
          } else {
            this.$message.error(res.data.message);
          }
        });
      });
    },
    handleTableData() {
      let spanData = [];
      let rowNum = 0;
      let data = this.standards;
      let newData = [];
      data.forEach((item, i, data) => {
        if (spanData.length) {
          rowNum =
            spanData[spanData.length - 1].row +
            data[i - 1].standardNorms.length;
        }
        spanData.push({
          row: rowNum,
          index: item.standardNorms.length,
        });
        if (item.standardNorms && item.standardNorms.length) {
          item.standardNorms.forEach((subItem) => {
            newData.push({
              categoryId: item.categoryId,
              categoryName:
                item.categoryName + "（" + item.categoryScore + "分)",
              normName: subItem.normName + "（" + subItem.normScore + "分)",
              evaluation: subItem.evaluation,
            });
          });
        }
      });
      this.spanData = spanData;
      this.standards = newData;
    },
    arraySpanMethod({ rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        let obj = [0, 0];
        this.spanData.some((v) => {
          if (rowIndex === v.row) {
            obj = [v.index, 1];
          }
        });
        return obj;
      }
    },
  },
};
</script>