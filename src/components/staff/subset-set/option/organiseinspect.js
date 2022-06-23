export const option = {
  align: 'center',
  border: true,
  menuWidth: 200,
  labelWidth: 160,
  viewBtn: true,
  column: [{
      label: "考察事由",
      prop: 'kcsy',
      rules: [{
        required: true,
        message: "请输入 考察事由",
        trigger: "blur"
      }],
    },
    {
      label: "考察日期",
      prop: 'kcrq',
      type: 'date',
      valueFormat: 'yyyy-MM-dd',
      rules: [{
        required: true,
        message: "请输入 考察日期",
        trigger: "blur"
      }],
    },
    {
      label: "备注",
      prop: 'bz',
      type: 'textarea',
      span: 24,
      rules: [{
        required: true,
        message: "请输入 备注",
        trigger: "blur"
      }],
    },
  ]
}
