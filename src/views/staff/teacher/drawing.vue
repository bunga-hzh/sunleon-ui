<!--
  npm i @antv/data-set
-->
<template>
  <div class="portrait_container">
    <basic-container>
      <div class="basic_box">
        <div id="chart_box"></div>
        <div class="data_box">
          <div v-for="item in listData" :key="item.id">
            <span>{{item.title}}</span>
            <a>{{item.score}}</a>
          </div>
        </div>
      </div>
    </basic-container>
  </div>
</template>

<script>
import DataSet from "@antv/data-set";
import { Chart } from "@antv/g2";

export default {
  name: "Portrait",
  data() {
    return {
      jsszhxData: [
        { item: "课时", 我的数据: 70, 单位平均值: 30 },
        { item: "课时得分", 我的数据: 60, 单位平均值: 70 },
        { item: "专业证书", 我的数据: 50, 单位平均值: 60 },
        { item: "培训", 我的数据: 40, 单位平均值: 50 },
        { item: "科研", 我的数据: 60, 单位平均值: 70 },
      ],
      listData: [
        { id: 1, title: '课时', score: 70 },
        { id: 2, title: '科研', score: 60 },
        { id: 3, title: '培训', score: 50 },
        { id: 4, title: '专业证书', score: 40 },
        { id: 5, title: '测评得分', score: 30 },
      ]
    };
  },
  methods: {
    jsszhxChart(id, data) {
      const { DataView } = DataSet;
      const dv = new DataView().source(data);
      dv.transform({
        type: "fold",
        fields: ["我的数据", "单位平均值"], // 展开字段集
        key: "user", // key字段
        value: "score", // value字段
      });

      const chart = new Chart({
        container: id,
        autoFit: true,
        height: 500,
      });
      chart.data(dv.rows);
      chart.scale("score", {
        min: 0,
        max: 80,
      });
      chart.coordinate("polar", {
        radius: 0.8,
      });
      chart.tooltip({
        shared: true,
        showCrosshairs: true,
        crosshairs: {
          line: {
            style: {
              lineDash: [4, 4],
              stroke: "#333",
            },
          },
        },
      });
      chart.axis("item", {
        line: null,
        tickLine: null,
        grid: {
          line: {
            style: {
              lineDash: null,
            },
          },
        },
      });
      chart.axis("score", {
        line: null,
        tickLine: null,
        grid: {
          line: {
            type: "line",
            style: {
              lineDash: null,
            },
          },
        },
      });

      chart.line().position("item*score").color("user").size(2);
      chart
        .point()
        .position("item*score")
        .color("user")
        .shape("circle")
        .size(4)
        .style({
          stroke: "#fff",
          lineWidth: 1,
          fillOpacity: 1,
        });
      chart.area().position("item*score").color("user");
      chart.render();
    },
  },
  mounted(){
    this.jsszhxChart('chart_box', this.jsszhxData)
  }
};
</script>

<style lang="scss" scoped>
.basic_box {
  height: 500px;
  // background-color: #eee;
  display: flex;
  #chart_box {
    flex: 2;
    height: 100%;
  }
  .data_box {
    flex: 1;
    height: 100%;
    background-color: #CAFFFD;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    div{
      flex: 1;
      border: rgb(255, 255, 255) solid 1px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 60px;
      span{
        font-size: 28px;
        color: rgb(150, 150, 150);
      }
      a{
        display: inline-block;
        width: 80px;
        height: 80px;
        border: 1px solid #eee;
        background-color: #49F4FF;
        font-size: 48px;
        color: #ffffff;
        text-align: center;
        line-height: 80px;
      }
    }
  }
}
</style>
