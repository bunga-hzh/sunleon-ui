export const option = {
  submitText: '添加',
  detail: false,
  group: [{
    label: '年度考核信息',
    column: [{
        label: "姓名",
        prop: "xm",
        disabled: true,
      },
      {
        label: "身份证号",
        prop: "sfzjh",
        disabled: true,
      },
      {
        label: "考核年度",
        prop: "khnd",
        type: "number",
      },
      {
        label: "考核结果",
        prop: "khjg",
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
