export const data = [{
  jobId: "20220202",
  name: "张三",
  jobName: "专任教师",
  level: "教授",
  pay: "未知",
  reason: "无",
  dep: "部门一",
  period: "2021/02-2022/02",
  remark: "无",
}, ]

export const option = {
  border: true,
  searchMenuSpan: 6,
  align: 'center',
  column: [{
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
}
