<template>
  <div>
    <el-table v-loading="$store.state.loading"
              :element-loading-text="loadingText"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)"
              :data="teacherUsers"
              style="width: 100%"
              border
              stripe
              max-height="500">
      <el-table-column prop="deptName"
                       label="部门"
                       align="center" />
      <el-table-column prop="userName"
                       label="人员"
                       align="center" />
      <el-table-column prop="userType"
                       label="类别"
                       align="center" />
      <el-table-column prop="score"
                       label="A/B/C/D级"
                       align="center">
        <template slot-scope="scope">
          <el-select v-model="teacherUsers[scope.$index].score">
            <el-option v-for="item in grades"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value" />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="note"
                       label="备注"
                       align="center" />
    </el-table>
    <div class="page_note">
      注意：<b class="green">{{ scale.deptName }}</b>，<b class="blue">{{ userTypeName }}</b>人员共<b class="red">{{ scale.total }}</b>人，
      A级上限是总人数的<b class="red">{{ scale.aMax }}%</b>(最多<b class="red">{{ scale.totalA }}</b>人)，下限是<b class="red">{{ scale.aMin }}%</b>；
      B级上限是总人数的<b class="red">{{ scale.bMax }}%</b>，下限是<b class="red">{{ scale.bMin }}%</b>；
      C级上限是总人数的<b class="red">{{ scale.cMax }}%</b>，下限是<b class="red">{{ scale.cMin }}%</b>；
      D级上限是总人数的<b class="red">{{ scale.dMax }}%</b>，下限是<b class="red">{{ scale.dMin }}%</b>；
    </div>
    <div v-if="scale.total > 0">
      <el-button v-if="canSubmit"
                 v-prevent-re-click
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
    </div>
  </div>
</template>
<script>
import "@/styles/assessment-style.scss";
import { ASSESS_TYPE, ASSESS_STATE } from "@/util/assessment/constants";
export default {
  name: "StaffItem",
  props: {
    userType: { type: Number, default: null },
  },
  data() {
    return {
      yearId: null,
      yearName: null,
      assessType: ASSESS_TYPE.ZCPYG,
      teacherUsers: [],
      scale: {
        deptId: null,
        deptName: null,
        scaleA: null,
        scaleB: null,
        scaleC: null,
        scaleD: null,
        total: null,
        totolA: 0,
      },
      count: {
        total: null,
        aPer: 0,
        bPer: 0,
        cPer: 0,
        dPer: 0,
        totalA: 0,
        totalC: 0,
        totalD: 0,
      },
      grades: [
        {
          value: 1,
          label: "A级",
        },
        {
          value: 2,
          label: "B级",
        },
        {
          value: 3,
          label: "C级",
        },
        {
          value: 4,
          label: "D级",
        },
      ],
      loadingText: "",
      random: null,
      userTypeName: "",
      canSubmit: false,
    };
  },
  watch: {
    userType: {
      immediate: true,
      handler(userType) {
        this.userType = userType;
        switch (userType) {
          case 1:
            this.userTypeName = "在职在编";
            break;
          case 2:
            this.userTypeName = "编外运行";
            break;
          case 3:
            this.userTypeName = "行政外聘";
            break;
        }
      },
    },
    teacherUsers: {
      handler: function () {
        this.computeScore();
      },
      deep: true,
    },
  },
  mounted() {
    this.yearId = this.$store.state.user.yearId;
    this.yearName = this.$store.state.user.yearName;
    this.deptId = this.$store.state.user.deptId;
    this.deptName = this.$store.state.user.deptName;
    this.query();
  },
  methods: {
    query() {
      this.loadingText = "加载中，请稍后";
      this.$store.commit("setLoading", true);
      this.$http
        .get("/assess/teacherUsers", {
          params: {
            yearId: this.yearId,
            deptId: this.deptId,
            assessType: this.assessType,
            userType: this.userType,
          },
        })
        .then((res) => {
          this.teacherUsers = res.data.data;
          this.scale.deptId = this.deptId;
          this.scale.deptName = this.deptName;
          this.queryScale();
          this.queryCanSubmit();
        });
    },
    queryScale() {
      this.$http
        .get("/config/scaleData", {
          params: {
            yearId: this.yearId,
            deptId: this.scale.deptId,
          },
        })
        .then((res) => {
          this.scale.aMin = res.data.data.aMin;
          this.scale.aMax = res.data.data.aMax;

          this.scale.bMin = res.data.data.bMin;
          this.scale.bMax = res.data.data.bMax;
          this.scale.cMin = res.data.data.cMin;
          this.scale.cMax = res.data.data.cMax;
          this.scale.dMin = res.data.data.dMin;
          this.scale.dMax = res.data.data.dMax;
          this.scale.total = this.teacherUsers.length;
          if (this.scale.aMax && this.scale.total) {
            this.scale.totalA = Math.ceil(
              (this.scale.total * this.scale.aMax) / 100
            );
          }
          this.computeScore();
          this.$store.commit("setLoading", false);
        });
    },
    queryCanSubmit() {
      this.$http
        .get("/assess/queryCanSubmit", {
          params: {
            yearId: this.yearId,
            deptId: this.scale.deptId,
          },
        })
        .then((res) => {
          if (res.data.code == 0) {
            this.canSubmit = true;
          }
        });
    },
    computeScore() {
      let a = 0,
        b = 0,
        c = 0,
        d = 0;
      this.teacherUsers.forEach((element) => {
        switch (element.score) {
          case 1:
            a++;
            break;
          case 2:
            b++;
            break;
          case 3:
            c++;
            break;
          case 4:
            d++;
            break;
        }
      });
      this.count.aPer = Math.round((a / this.scale.total) * 100);
      this.count.totalA = a;
      this.count.bPer = Math.round((b / this.scale.total) * 100);
      this.count.cPer = Math.round((c / this.scale.total) * 100);
      this.count.totalC = c;
      this.count.dPer = Math.round((d / this.scale.total) * 100);
      this.count.totalD = d;
      this.count.total = a + b + c + d;
    },
    save(state) {
      let title = "暂存";
      if (state == 2) {
        title = "提交";
      }
      if (this.count.total !== this.scale.total) {
        this.$message.error("请将所有人评价完全后点击" + title);
        return false;
      }
      let via = true;
      let htm = [];
      if (this.count.aPer < this.scale.aMin) {
        via = false;
        htm.push(
          "<b>A级</b>下限是总人数的<b class='green'>" +
            this.scale.aMin +
            "%</b>，您选了<b class='red'>" +
            this.count.aPer +
            "%</b>"
        );
      } else if (this.count.aPer > this.scale.aMax) {
        let total = Math.ceil((this.scale.total * this.scale.aMax) / 100);
        if (this.count.totalA <= total) {
          via = true;
        } else {
          via = false;
          htm.push(
            "<b>A级</b>上限是总人数的<b class='green'>" +
              this.scale.aMax +
              "%</b>，您选了<b class='red'>" +
              this.count.aPer +
              "%</b>"
          );
        }
      }
      if (this.count.bPer < this.scale.bMin) {
        via = false;
        htm.push(
          "<b>B级</b>下限是总人数的<b class='green'>" +
            this.scale.bMin +
            "%</b>，您选了<b class='red'>" +
            this.count.bPer +
            "%</b>"
        );
      } else if (this.count.bPer > this.scale.bMax) {
        via = false;
        htm.push(
          "<b>B级</b>上限是总人数的<b class='green'>" +
            this.scale.bMax +
            "%</b>，您选了<b class='red'>" +
            this.count.bPer +
            "%</b>"
        );
      }
      if (this.count.cPer < this.scale.cMin) {
        via = false;
        htm.push(
          "<b>C级</b>下限是总人数的<b class='green'>" +
            this.scale.cMin +
            "%</b>，您选了<b class='red'>" +
            this.count.cPer +
            "%</b>"
        );
      } else if (this.count.cPer > this.scale.cMax) {
        let total = Math.ceil((this.scale.total * this.scale.cMax) / 100);
        if (this.count.totalC <= total) {
          via = true;
        } else {
          via = false;
          htm.push(
            "<b>C级</b>上限是总人数的<b class='green'>" +
              this.scale.cMax +
              "%</b>，您选了<b class='red'>" +
              this.count.cPer +
              "%</b>"
          );
        }
      }
      if (this.count.dPer < this.scale.dMin) {
        via = false;
        htm.push(
          "<b>D级</b>下限是总人数的<b class='green'>" +
            this.scale.dMin +
            "%</b>，您选了<b class='red'>" +
            this.count.dPer +
            "%</b>"
        );
      } else if (this.count.dPer > this.scale.dMax) {
        let total = Math.ceil((this.scale.total * this.scale.dMax) / 100);
        if (this.count.totalD <= total) {
          via = true;
        } else {
          via = false;
          htm.push(
            "<b>D级</b>上限是总人数的<b class='green'>" +
              this.scale.dMax +
              "%</b>，您选了<b class='red'>" +
              this.count.dPer +
              "</b>%"
          );
        }
      }
      if (via) {
        let title = "确定要暂存对员工的评价吗";
        if (state == 2) {
          title = "确定要提交对员工的评价吗？提交后将无法修改";
        }
        this.$confirm(title, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          this.loadingText = "处理中，请稍后";
          this.$store.commit("setLoading", true);
          this.$http
            .post("/assess/saveTeacher", {
              yearId: this.yearId,
              assessType: this.assessType,
              assessTeachers: this.teacherUsers,
              state: state,
            })
            .then((res) => {
              this.$store.commit("setLoading", false);
              if (res.data.code == 0) {
                this.$message.success(res.data.message);
                if (state === ASSESS_STATE.SUBMIT) {
                  this.$emit("changeRandom", Math.random());
                  this.$emit("parentChange", false);
                } else {
                  this.query();
                }
              } else {
                this.$message.error(res.data.message);
              }
            });
        });
      } else {
        this.$alert(htm.join("；<br>"), "系统提示", {
          dangerouslyUseHTMLString: true,
        });
      }
    },
  },
};
</script>