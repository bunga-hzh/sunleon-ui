<template>
  <basic-container>
    <el-card shadow="never"
             class="onepage">
      <div slot="header">
        <div class="title">
          {{ yearName }}{{ deptName }}绩效考核进度
        </div>
      </div>
      <el-row :gutter="20">
        <el-col v-if="showAll"
                :span="6">
          <el-card>
            <div>
              <div align="center">
                <span>党政领导评中层完成率</span>
              </div>
              <div id="dzldChart"
                   class="chart_cont" />
              <div class="chart_tit">
                {{ toPer(per.dzld * 100) }}%
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col v-if="showAll"
                :span="6">
          <el-card>
            <div>
              <div align="center">
                <span>分管领导评中层完成率</span>
              </div>
              <div id="fgldChart"
                   class="chart_cont" />
              <div class="chart_tit">
                {{ toPer(per.fgld * 100) }}%
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <div class="cursor"
                 @click="changeAllChart(5)">
              <div align="center">
                <span>中层评员工完成率</span>
              </div>
              <div id="ygChart"
                   class="chart_cont" />
              <div class="chart_tit">
                {{ toPer(per.yg * 100) }}%
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <div class="cursor"
                 @click="changeAllChart(3)">
              <div align="center">
                <span>自评互评完成率</span>
              </div>
              <div id="zphpChart"
                   class="chart_cont" />
              <div class="chart_tit">
                {{ toPer(per.zphp * 100) }}%
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col v-if="!showAll"
                :span="6">
          <el-card>
            <div class="cursor"
                 @click="changeAllChart(4)">
              <div align="center">
                <span>群众测评完成率</span>
              </div>
              <div id="qzcpChart"
                   class="chart_cont" />
              <div class="chart_tit">
                {{ toPer(per.qzcp * 100) }}%
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col v-if="!showAll"
                :span="6">
          <el-card>
            <div>
              <div align="center">
                <span>考核核登记表完成率</span>
              </div>
              <div id="khdjChart"
                   class="chart_cont" />
              <div class="chart_tit">
                {{ toPer(per.khdj * 100) }}%
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row v-if="showAll"
              :gutter="20">
        <el-col :span="6">
          <el-card>
            <div class="cursor"
                 @click="changeAllChart(4)">
              <div align="center">
                <span>群众测评完成率</span>
              </div>
              <div id="qzcpChart"
                   class="chart_cont" />
              <div class="chart_tit">
                {{ toPer(per.qzcp * 100) }}%
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="18">
          <el-card>
            <div>
              <div align="center">
                <span>各部门{{ title }}完成率对比</span>
              </div>
              <div id="allChart"
                   class="chart_all" />
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </basic-container>
</template>
<style scoped lang="scss">
.el-row {
  margin-bottom: 20px;
}
.chart_cont {
  height: 249px;
}
.chart_all {
  height: 270px;
}
.chart_tit {
  color: #67c23a;
  text-align: center;
}
</style>
<script>
import "@/styles/assessment-style.scss";
import { ASSESS_TYPE } from "@/util/assessment/constants";
import { Chart } from "@antv/g2";
export default {
  name: "Schedule",
  data() {
    return {
      yearId: null,
      yearName: null,
      deptId: null,
      deptName: null,
      allDepts: [],
      dzldChart: null,
      dzldData: [],
      fgldChart: null,
      fgldData: [],
      ygChart: null,
      ygData: [],
      zphpChart: null,
      zphpData: [],
      qzcpChart: null,
      qzcpData: [],
      khdjChart: null,
      khdjData: [],
      title: null,
      allChart: null,
      allData: [],
      per: {
        dzld: null,
        fgld: null,
        yg: null,
        zphp: null,
        qzcp: null,
        khdj: null,
      },
      showAll: false,
    };
  },
  mounted() {
    this.yearId = this.$store.state.user.yearId;
    this.yearName = this.$store.state.user.yearName;
    let roleIds = this.$store.state.user.roleIds;
    if (
      roleIds.indexOf("1") >= 0 ||
      roleIds.indexOf("6") >= 0 ||
      roleIds.indexOf("8") >= 0
    ) {
      this.deptId = null;
      this.deptName = "全校";
      this.showAll = true;
    } else {
      this.deptId = this.$store.state.user.deptId;
      this.deptName = this.$store.state.user.deptName;
    }
    this.query();
    if (this.showAll) {
      this.queryAllChartData(ASSESS_TYPE.ZCPYG);
    }
  },
  methods: {
    toPer(val) {
      return val.toFixed(0);
    },
    loadAllDept() {
      this.$http.get("/dept/all").then((res) => {
        if (res.data.code == 0) {
          this.allDepts = res.data.data;
        }
      });
    },
    query() {
      this.$http
        .get("/count/schedule", {
          params: {
            yearId: this.yearId,
            deptId: this.deptId,
          },
        })
        .then((res) => {
          if (res.data.code == 0) {
            if (this.showAll) {
              let dzldYData = new Object();
              dzldYData.type = "已完成";
              dzldYData.value = res.data.data.dzldPer;
              this.per.dzld = res.data.data.dzldPer;
              this.dzldData.push(dzldYData);
              let dzldNData = new Object();
              dzldNData.type = "未完成";
              dzldNData.value = 1 - res.data.data.dzldPer;
              this.dzldData.push(dzldNData);
              this.drawDzldChart();

              let fgldYData = new Object();
              fgldYData.type = "已完成";
              fgldYData.value = res.data.data.fgldPer;
              this.per.fgld = res.data.data.fgldPer;
              this.fgldData.push(fgldYData);
              let fgldNData = new Object();
              fgldNData.type = "未完成";
              fgldNData.value = 1 - res.data.data.fgldPer;
              this.fgldData.push(fgldNData);
              if (this.fgldChart) {
                this.fgldChart.destroy();
              }
              this.drawFgldChart();
            }

            let ygYData = new Object();
            ygYData.type = "已完成";
            ygYData.value = res.data.data.ygPer;
            this.per.yg = res.data.data.ygPer;
            this.ygData.push(ygYData);
            let ygNData = new Object();
            ygNData.type = "未完成";
            ygNData.value = 1 - res.data.data.ygPer;
            this.ygData.push(ygNData);
            if (this.ygChart) {
              this.ygChart.destroy();
            }
            this.drawYgChart();

            let zphpYData = new Object();
            zphpYData.type = "已完成";
            zphpYData.value = res.data.data.zphpPer;
            this.per.zphp = res.data.data.zphpPer;
            this.zphpData.push(zphpYData);
            let zphpNData = new Object();
            zphpNData.type = "未完成";
            zphpNData.value = 1 - res.data.data.zphpPer;
            this.zphpData.push(zphpNData);
            if (this.zphpChart) {
              this.zphpChart.destroy();
            }
            this.drawZphpChart();

            let qzcpYData = new Object();
            qzcpYData.type = "已完成";
            qzcpYData.value = res.data.data.qzcpPer;
            this.per.qzcp = res.data.data.qzcpPer;
            this.qzcpData.push(qzcpYData);
            let qzcpNData = new Object();
            qzcpNData.type = "未完成";
            qzcpNData.value = 1 - res.data.data.qzcpPer;
            this.qzcpData.push(qzcpNData);
            if (this.qzcpChart) {
              this.qzcpChart.destroy();
            }
            this.drawQzcpChart();

            if (!this.showAll) {
              let khdjYData = new Object();
              khdjYData.type = "已完成";
              khdjYData.value = res.data.data.khdjPer;
              this.per.khdj = res.data.data.khdjPer;
              this.khdjData.push(khdjYData);
              let khdjNData = new Object();
              khdjNData.type = "未完成";
              khdjNData.value = 1 - res.data.data.khdjPer;
              this.khdjData.push(khdjNData);
              if (this.khdjChart) {
                this.khdjChart.destroy();
              }
              this.drawKhdjChart();
            }
          }
        });
    },
    changeAllChart(assessType) {
      if (this.showAll) {
        this.queryAllChartData(assessType);
      }
    },
    queryAllChartData(assessType) {
      if (this.allChart) {
        this.allChart.destroy();
      }
      switch (assessType) {
        case 2:
          this.title = "分管领导评中层";
          break;
        case 3:
          this.title = "自评互评";
          break;
        case 4:
          this.title = "群众测评";
          break;
        case 5:
          this.title = "中层评员工";
          break;
      }
      this.$http
        .get("/count/scheduleCom", {
          params: {
            yearId: this.yearId,
            assessType: assessType,
          },
        })
        .then((res) => {
          if (res.data.code == 0) {
            this.allData = res.data.data;
            this.drawAllChart();
          }
        });
    },
    drawDzldChart: function () {
      this.dzldChart = new Chart({
        container: "dzldChart",
        autoFit: true,
        padding: "auto",
        appendPadding: [10, 0, 0, 0],
      });
      this.dzldChart.data(this.dzldData);

      this.dzldChart.coordinate("theta", {
        radius: 0.75,
      });
      this.dzldChart.tooltip({
        showMarkers: false,
      });

      this.dzldChart
        .interval()
        .adjust("stack")
        .position("value")
        .color("type", ["#67C23A", "#409EFF"]);

      this.dzldChart.legend(false);
      this.dzldChart.tooltip(false);

      this.dzldChart.interaction("element-single-selected");
      this.dzldChart.render();
    },
    drawFgldChart() {
      this.fgldChart = new Chart({
        container: "fgldChart",
        autoFit: true,
        padding: "auto",
        appendPadding: [10, 0, 0, 0],
      });
      this.fgldChart.data(this.fgldData);

      this.fgldChart.coordinate("theta", {
        radius: 0.75,
      });
      this.fgldChart.tooltip({
        showMarkers: false,
      });

      this.fgldChart
        .interval()
        .adjust("stack")
        .position("value")
        .color("type", ["#67C23A", "#409EFF"]);

      this.fgldChart.legend(false);
      this.fgldChart.tooltip(false);

      this.fgldChart.interaction("element-single-selected");
      this.fgldChart.render();
    },
    drawYgChart() {
      this.ygChart = new Chart({
        container: "ygChart",
        autoFit: true,
        padding: "auto",
        appendPadding: [10, 0, 0, 0],
      });
      this.ygChart.data(this.ygData);

      this.ygChart.coordinate("theta", {
        radius: 0.75,
      });
      this.ygChart.tooltip({
        showMarkers: false,
      });

      this.ygChart
        .interval()
        .adjust("stack")
        .position("value")
        .color("type", ["#67C23A", "#409EFF"]);

      this.ygChart.legend(false);
      this.ygChart.tooltip(false);

      this.ygChart.interaction("element-single-selected");
      this.ygChart.render();
    },
    drawZphpChart() {
      this.zphpChart = new Chart({
        container: "zphpChart",
        autoFit: true,
        padding: "auto",
        appendPadding: [10, 0, 0, 0],
      });
      this.zphpChart.data(this.zphpData);

      this.zphpChart.coordinate("theta", {
        radius: 0.75,
      });
      this.zphpChart.tooltip({
        showMarkers: false,
      });

      this.zphpChart
        .interval()
        .adjust("stack")
        .position("value")
        .color("type", ["#67C23A", "#409EFF"]);

      this.zphpChart.legend(false);
      this.zphpChart.tooltip(false);

      this.zphpChart.interaction("element-single-selected");
      this.zphpChart.render();
    },
    drawQzcpChart() {
      this.qzcpChart = new Chart({
        container: "qzcpChart",
        autoFit: true,
        padding: "auto",
        appendPadding: [10, 0, 0, 0],
      });
      this.qzcpChart.data(this.qzcpData);

      this.qzcpChart.coordinate("theta", {
        radius: 0.75,
      });
      this.qzcpChart.tooltip({
        showMarkers: false,
      });

      this.qzcpChart
        .interval()
        .adjust("stack")
        .position("value")
        .color("type", ["#67C23A", "#409EFF"]);

      this.qzcpChart.legend(false);
      this.qzcpChart.tooltip(false);

      this.qzcpChart.interaction("element-single-selected");
      this.qzcpChart.render();
    },
    drawKhdjChart() {
      this.khdjChart = new Chart({
        container: "khdjChart",
        autoFit: true,
        padding: "auto",
        appendPadding: [10, 0, 0, 0],
      });
      this.khdjChart.data(this.khdjData);

      this.khdjChart.coordinate("theta", {
        radius: 0.75,
      });
      this.khdjChart.tooltip({
        showMarkers: false,
      });

      this.khdjChart
        .interval()
        .adjust("stack")
        .position("value")
        .color("type", ["#67C23A", "#409EFF"]);

      this.khdjChart.legend(false);
      this.khdjChart.tooltip(false);

      this.khdjChart.interaction("element-single-selected");
      this.khdjChart.render();
    },
    drawAllChart() {
      this.allChart = new Chart({
        container: "allChart",
        autoFit: true,
        padding: "auto",
        appendPadding: [30, 0, 0, 0],
      });
      this.allChart.data(this.allData);

      this.allChart.axis("type", {
        tickLine: {
          alignTick: false,
        },
      });
      this.allChart.axis("value", false);

      this.allChart.tooltip({
        showTitle: false,
      });

      this.allChart
        .interval()
        .position("type*value")
        .tooltip("type*value", (type, value) => {
          return {
            name: type,
            value: value * 100 + "%",
          };
        });
      this.allChart.interaction("element-active");

      this.allData.forEach((item) => {
        this.allChart.annotation().text({
          position: [item.type, item.value],
          content: (item.value * 100).toFixed(0) + "%",
          style: {
            textAlign: "center",
          },
          offsetY: -12,
        });
      });
      this.allChart.render();
    },
  },
};
</script>