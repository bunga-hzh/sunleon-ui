<template>
  <div style="report_container">
    <basic-container>
      <div class="top_box">
        <div id="bmrs">
          <span>各年龄段人数分布</span>
        </div>
        <div id="jslx">
          <span>教师类型比例</span>
        </div>
        <div>
          <div class="count_box">
            <span>全校教师人数</span>
            <span class="count">156</span>
          </div>
          <div class="sex_box">
            <div class="boy">
              <div class="boy_box">
                <img src="https://s1.ax1x.com/2022/03/14/bOwNT0.png" alt="" />
              </div>
              <span class="blue">94</span>
            </div>
            <div class="girl">
              <div>
                <img src="https://s1.ax1x.com/2022/03/14/bOwtwq.png" alt="" />
              </div>
              <span class="red">62</span>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom_box">
        <div id="xlfb">
          <span>学历人数分布</span>
        </div>
        <div id="nlfb">
          <span>部门人数分析</span>
        </div>
      </div>
    </basic-container>
  </div>
</template>

<script>
import { Chart } from "@antv/g2";

export default {
  name: "Report",
  data() {
    return {
      ageData: [
        { type: "25-29 岁", value: 53, percent: 0.24 },
        { type: "30-39 岁", value: 62, percent: 0.28 },
        { type: "40-49 岁", value: 33, percent: 0.14 },
        { type: "50-59 岁", value: 15, percent: 0.06 },
        { type: "60 岁以上", value: 15, percent: 0.06 },
      ],
      teacherTypeData: [
        { type: "外聘教师", value: 0.34 },
        { type: "非外聘教师", value: 0.66 },
      ],
      educationData: [
        { type: "博士", value: 12 },
        { type: "硕士", value: 21 },
        { type: "研究生", value: 32 },
        { type: "本科", value: 123 },
      ],
      deptData: [
        { type: "书记校长室", value: 2, percent: 0.007 },
        { type: "行政管理中心", value: 14, percent: 0.047 },
        { type: "人力资源部", value: 27, percent: 0.09 },
        { type: "财务部", value: 6, percent: 0.02 },
        { type: "教学运行中心", value: 45, percent: 0.15 },
        { type: "教师发展中心", value: 36, percent: 0.12 },
        { type: "学生发展中心", value: 47, percent: 0.06 },
        { type: "信息管控中心", value: 54, percent: 0.16 },
        { type: "服务保障中心", value: 69, percent: 0.23 },
      ],
    };
  },
  methods: {
    deptChar(id, data) {
      const chart = new Chart({
        container: id,
        autoFit: true,
        height: 300,
        padding: [60, 10, 50, 10],
      });
      chart.data(data);
      chart.scale("value", {
        alias: "销售额(万)",
      });

      chart.axis("type", {
        tickLine: {
          alignTick: false,
        },
      });
      chart.axis("value", false);

      chart
        .interval()
        .position("type*value")
        .color("type", ["#7f8da9", "#fec514", "#db4c3c", "#daf0fd"]);
      chart.interaction("element-active");

      // 添加文本标注
      data.forEach((item) => {
        chart
          .annotation()
          .text({
            position: [item.type, item.value],
            content: item.value,
            style: {
              textAlign: "center",
            },
            offsetY: -30,
          })
          .text({
            position: [item.type, item.value],
            content: (item.percent * 100).toFixed(0) + "%",
            style: {
              textAlign: "center",
            },
            offsetY: -12,
          });
      });
      chart.render();
    },
    teacherTypeChart(id, data) {
      const chart = new Chart({
        container: id,
        autoFit: true,
        height: 300,
        padding: [0, 10, 30, 10],
      });
      chart.data(data);

      chart.coordinate("theta", {
        radius: 0.75,
      });
      chart.tooltip({
        showMarkers: false,
      });

      const interval = chart
        .interval()
        .adjust("stack")
        .position("value")
        .color("type", ["#063d8a", "#1770d6", "#47abfc", "#38c060"])
        .style({ opacity: 0.4 })
        .state({
          active: {
            style: (element) => {
              const shape = element.shape;
              return {
                matrix: Util.zoom(shape, 1.1),
              };
            },
          },
        })
        .label("type", (val) => {
          const opacity = val === "四线及以下" ? 1 : 0.5;
          return {
            offset: -30,
            style: {
              opacity,
              fill: "white",
              fontSize: 12,
              shadowBlur: 2,
              shadowColor: "rgba(0, 0, 0, .45)",
            },
            content: (obj) => {
              return obj.type + "\n" + obj.value + "%";
            },
          };
        });

      chart.interaction("element-single-selected");

      chart.render();
    },
    educationChart(id, data) {
      const chart = new Chart({
        container: id,
        autoFit: true,
        height: 400,
        padding: [30, 30, 50, 60],
      });
      chart.data(data);
      chart.scale({
        value: {
          max: 200,
          min: 0,
          alias: "人数",
        },
      });
      chart.axis("type", {
        title: null,
        tickLine: null,
        line: null,
      });

      chart.axis("value", {
        label: null,
        title: {
          offset: 30,
          style: {
            fontSize: 12,
            fontWeight: 300,
          },
        },
      });
      chart.legend(false);
      chart.coordinate().transpose();
      chart
        .interval()
        .position("type*value")
        .size(26)
        .label("value", {
          style: {
            fill: "#8d8d8d",
          },
          offset: 10,
        });
      chart.interaction("element-active");
      chart.render();
    },
    ageChart(id, data) {
      const chart = new Chart({
        container: id,
        autoFit: true,
        height: 400,
        padding: [60, 10, 50, 10],
      });
      chart.data(data);
      chart.scale("value", {
        alias: "销售额(万)",
      });

      chart.axis("type", {
        tickLine: {
          alignTick: false,
        },
      });
      chart.axis("value", false);

      chart
        .interval()
        .position("type*value")
        .color("type", ["#7f8da9", "#fec514", "#db4c3c", "#daf0fd"]);
      chart.interaction("element-active");

      // 添加文本标注
      data.forEach((item) => {
        chart
          .annotation()
          .text({
            position: [item.type, item.value],
            content: item.value,
            style: {
              textAlign: "center",
            },
            offsetY: -30,
          })
          .text({
            position: [item.type, item.value],
            content: (item.percent * 100).toFixed(0) + "%",
            style: {
              textAlign: "center",
            },
            offsetY: -12,
          });
      });
      chart.render();
    },
  },
  mounted() {
    this.deptChar("bmrs", this.ageData);
    this.teacherTypeChart("jslx", this.teacherTypeData);
    this.educationChart("xlfb", this.educationData);
    this.ageChart("nlfb", this.deptData);
  },
};
</script>

<style lang="scss" scoped>
.top_box {
  display: flex;
  justify-content: space-evenly;
  box-sizing: border-box;
  > div {
    margin: 0 10px;
    flex: 1;
    height: 300px;
    border: 1px solid #eee;
    position: relative;
    span {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      font-size: 14px;
      font-family: Base;
      color: rgb(51, 51, 51);
      font-weight: bold;
    }
    .count_box {
      width: 100%;
      height: 150px;
      position: relative;
      border-bottom: #eee solid 1px;
      .count {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 72px;
        color: rgb(255, 203, 71);
      }
    }
    .sex_box {
      width: 100%;
      height: 150px;
      display: flex;
      > div {
        flex: 1;
        height: 100%;
        position: relative;
        div {
          width: 80px;
          height: 80px;
          margin: 10px auto;
        }
        > span {
          position: absolute;
          left: 50%;
          bottom: 10px;
          transform: translateX(-50%);
          font-size: 36px;
        }
      }
      > div:nth-child(1) {
        border-right: #eee solid 1px;
      }
    }
  }
}

.blue {
  color: #1296db !important;
}
.red {
  color: #d81e06 !important;
}

.bottom_box {
  display: flex;
  justify-content: space-evenly;
  box-sizing: border-box;
  margin-top: 20px;
  span {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 14px;
    font-family: Base;
    color: rgb(51, 51, 51);
    font-weight: bold;
  }
  div:nth-child(1) {
    position: relative;
    margin: 0 10px;
    flex: 1;
    height: 400px;
    border: 1px solid #eee;
  }
  div:nth-child(2) {
    position: relative;
    margin: 0 10px;
    flex: 3;
    height: 400px;
    border: 1px solid #eee;
  }
}
</style>
