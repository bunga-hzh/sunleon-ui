<template>
  <div class="engage_container">
    <basic-container>
      <avue-crud
        :option="option"
        :search.sync="search"
        :data="data"
        :page.sync="page"
      >
      </avue-crud>
    </basic-container>
  </div>
</template>

<script>
export default {
  name: "TableEngage",
  data() {
    return {
      page: {
        total: 1000,
        currentPage: 1,
        pageSize: 10,
      },
      // 数据源
      data: [
        {
          jobId: "20220202",
          name: "张三",
          jobName: "专任教师",
          level: "教授",
          pay: "未知",
          reason: "无",
          dep: "部门一",
          period: "2021/02-2022/02",
          remark: "无",
        },
      ],
      option: {
        searchMenuSpan: 6,
        column: [
          {
            label: "工号",
            prop: "jobId",
            search: true,
          },
          {
            label: "姓名",
            prop: "name",
            search: true,
          },
          {
            label: "聘任名称",
            prop: "jobName",
          },
          {
            label: "专家级别",
            prop: "level",
          },
          {
            label: "待遇",
            prop: "pay",
          },
          {
            label: "原因",
            prop: "reason",
          },
          {
            label: "聘任部门",
            prop: "dep",
            search: true,
          },
          {
            searchLabelWidth: 120,
            label: "聘任时间段",
            prop: "period",
            type: "datetime",
            searchSpan: 18,
            searchRange: true,
            search: true,
            width: 200,
          },
          {
            label: "备注",
            prop: "remark",
          },
        ],
      },
      // 搜索的表单对象
      search: {},
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
