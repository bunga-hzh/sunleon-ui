<template>
  <basic-container>
    <remind-page :role-id="'syzc'"
                 :assess-type="assessType"
                 :random="random"
                 @parentChange="changeSend" />
    <el-card v-if="send"
             shadow="never"
             class="onepage">
      <div slot="header">
        <div class="title">
          {{ yearName }}中层干部考评自评互评
        </div>
      </div>
      <el-table v-loading="$store.state.loading"
                :element-loading-text="loadingText"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :data="standards"
                :span-method="arraySpanMethod"
                style="width: 100%"
                border
                max-height="500">
        <el-table-column prop="categoryName"
                         label="考核类别"
                         width="90"
                         fixed />
        <el-table-column prop="normNameScore"
                         label="考核内容"
                         width="150"
                         fixed />
        <el-table-column prop="evaluation"
                         label="评价要点"
                         width="200"
                         fixed />
        <el-table-column v-for="item in middleUsers"
                         :key="item.userId"
                         :label="item.userName"
                         align="center">
          <template slot-scope="scope">
            <el-input v-if="scope.row.categoryId != 999999"
                      v-model="item.scores[scope.$index].score"
                      class="text-center"
                      @input="((val)=>{checkInput(item, val, scope.row, scope.$index)})" />
            <div v-else
                 align="center">
              {{ item.scores[scope.$index].score }}
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-button v-prevent-re-click
                 type="primary"
                 class="m_t_20"
                 @click="save(2)">
        提交评分
      </el-button>
      <el-button v-prevent-re-click
                 class="m_t_20"
                 @click="save(1)">
        暂存评分
      </el-button>
    </el-card>
  </basic-container>
</template>
<script>
import "@/styles/assessment-style.scss";
import RemindPage from "./component/RemindPage";
import { ASSESS_TYPE, ASSESS_STATE } from "@/util/assessment/constants";
import microvan from "@/util/assessment/microvan";
export default {
  name: "Each",
  components: {
    RemindPage,
  },
  data() {
    return {
      yearId: null,
      yearName: null,
      assessType: ASSESS_TYPE.ZCZPHP,
      standards: [],
      middleUsers: [],
      send: false,
      loadingText: "",
      random: null,
    };
  },
  watch: {
    middleUsers: {
      handler: function () {
        this.computeScore();
      },
      deep: true,
    },
  },
  mounted() {
    this.yearId = this.$store.state.user.yearId;
    this.yearName = this.$store.state.user.yearName;
    this.query();
    this.queryMiddleUsers();
  },
  methods: {
    changeSend(send) {
      this.send = send;
    },
    query() {
      this.loadingText = "加载中，请稍后";
      this.$store.commit("setLoading", true);
      this.$http.get("/config/assessStandard").then((res) => {
        this.standards = res.data.data;
        this.handleTableData();
      });
    },
    queryMiddleUsers() {
      this.$store.commit("setLoading", true);
      this.$http
        .get("/assess/middleUsers", {
          params: {
            yearId: this.yearId,
            deptId: this.$store.state.user.deptId,
            assessType: this.assessType,
          },
        })
        .then((res) => {
          this.middleUsers = res.data.data;
          this.$store.commit("setLoading", false);
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
            const obj = {
              categoryId: item.categoryId,
              normId: subItem.oid,
              normName: subItem.normName,
              normScore: subItem.normScore,
              evaluation: subItem.evaluation,
            };
            if (item.categoryId === 999999) {
              obj.categoryName = "合计总分";
            } else {
              obj.categoryName =
                item.categoryName + "（" + item.categoryScore + "分)";
              obj.normNameScore =
                subItem.normName + "（" + subItem.normScore + "分)";
            }
            newData.push(obj);
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
    checkInput(item, val, row, index) {
      if (microvan.isNotEmpty(val)) {
        val = val.replace(/[^\d.]/g, "");
        item.scores[index].score = Number(val);
        if (val > row.normScore) {
          this.$message.error(
            row.normName + "最多可输入" + row.normScore + "分"
          );
          item.scores[index].score = row.normScore;
        }
      } else {
        item.scores[index].score = 0;
      }
    },
    save(state) {
      let checkRes = this.checkScores();
      if (checkRes.length == 0) {
        let title = "确定要暂存自评互评评分吗？";
        if (state == 2) {
          title = "确定要提交自评互评评分吗？提交后将无法修改";
        }
        this.$confirm(title, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          this.loadingText = "处理中，请稍后";
          this.$store.commit("setLoading", true);
          this.$http
            .post("/assess/save", {
              yearId: this.yearId,
              assessType: this.assessType,
              assessUsers: this.middleUsers,
              state: state,
            })
            .then((res) => {
              this.$store.commit("setLoading", false);
              if (res.data.code == 0) {
                this.$message.success(res.data.message);
                if (state === ASSESS_STATE.SUBMIT) {
                  this.random = Math.random();
                  this.send = false;
                } else {
                  this.queryMiddleUsers();
                }
              } else {
                this.$message.error(res.data.message);
              }
            });
        });
      } else {
        this.$message.error(checkRes.join(",") + "的总分不能为0");
        return false;
      }
    },
    computeScore() {
      let _this = this;
      _this.middleUsers.forEach((item) => {
        let total = 0;
        item.scores.forEach(function (subItem, index) {
          if (index < item.scores.length - 1) {
            total = total + Number(subItem.score);
          } else {
            subItem.score = total;
            total = 0;
          }
        });
      });
    },
    checkScores() {
      var resArr = [];
      this.middleUsers.forEach((item) => {
        const score = item.scores[item.scores.length - 1].score;
        if (score === 0) {
          resArr.push(item.userName);
        }
      });
      return resArr;
    },
  },
};
</script>