export const option = {
  submitText: '添加',
  detail: false,
  labelWidth: 110,
  group: [{
    label: '处分信息',
    column: [{
        label: "处分类别",
        prop: "cflb",
      },
      {
        label: "处分原因",
        prop: "cfyy",
      },
      {
        label: "处分记录描述",
        prop: "cfjlms",
      },
      {
        label: "处分单位名称",
        prop: "cfdwmc",
      },
      {
        label: "处分日期",
        prop: "cfrq",
        type: "date",
        valueFormat: "yyyy-MM-dd",
      },
      {
        label: "处分撤销日期",
        prop: "cfcxrq",
        type: "date",
        valueFormat: "yyyy-MM-dd",
      },
      {
        label: "处分撤销原因",
        prop: "cfcxyy",
        type: "textarea",
        span: 24,
      },
    ]
  }]
}
