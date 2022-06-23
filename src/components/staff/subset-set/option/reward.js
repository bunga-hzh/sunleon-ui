export const option = {
  align: 'center',
  border: true,
  menuWidth: 200,
  labelWidth: 160,
  viewBtn: true,
  column: [{
      label: "奖励名称",
      prop: "jlmc",
      rules: [{
        required: true,
        message: "请输入 奖励名称",
        trigger: "blur"
      }],
    },
    {
      label: "荣誉奖励级别",
      prop: "jljbm",
      rules: [{
        required: true,
        message: "请输入 荣誉奖励级别",
        trigger: "blur"
      }],
    },
    {
      label: "奖励类别",
      prop: "jllbm",
      rules: [{
        required: true,
        message: "请输入 奖励类别",
        trigger: "blur"
      }],
    },
    {
      label: "荣誉和奖励原因",
      prop: "jlyy",
      width: 120,
      rules: [{
        required: true,
        message: "请输入 荣誉和奖励原因",
        trigger: "blur"
      }],
    },
    {
      label: "奖励时间",
      prop: "jlsj",
      type: "date",
      valueFormat: "yyyy-MM-dd",
      rules: [{
        required: true,
        message: "请输入 奖励时间",
        trigger: "blur"
      }],
    },
    {
      label: "奖励单位",
      prop: "jldw",
      rules: [{
        required: true,
        message: "请输入 奖励单位",
        trigger: "blur"
      }],
    },
    {
      label: "备注",
      prop: "bz",
      type: "textarea",
      span: 24,
    },
  ]
}
