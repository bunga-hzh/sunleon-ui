export const option = {
  submitText: '添加',
  detail: false,
  labelWidth: 130,
  group: [{
    label: '奖励信息',
    collapse: false,
    column: [{
        label: "奖励名称",
        prop: "jlmc",
      },
      {
        label: "荣誉奖励级别",
        prop: "jljbm",
      },
      {
        label: "奖励类别",
        prop: "jllbm",
      },
      {
        label: "荣誉和奖励原因",
        prop: "jlyy",
      },
      {
        label: "奖励时间",
        prop: "jlsj",
        type: "date",
        valueFormat: "yyyy-MM-dd",
      },
      {
        label: "奖励单位",
        prop: "jldw",
      },
      {
        label: "备注",
        prop: "bz",
        type: "textarea",
        span: 24,
      },
    ]
  }]
}
