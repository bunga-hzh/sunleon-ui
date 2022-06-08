export const option = {
  align: 'center',
  border: true,
  menuWidth: 160,
  addBtn: true,
  column: [{
      label: "考察事由",
      prop: 'kcsy',
      rules: [{
        required: true,
        message: '请输入 考察事由',
        trigger: "blur",
      }]
    },
    {
      label: "考察日期",
      prop: 'kcrq',
      type: 'date',
      valueFormat: 'yyyy-MM-dd',
      rules: [{
        required: true,
        message: '请输入 考察日期',
        trigger: "blur",
      }]
    },
    {
      label: "备注",
      prop: 'bz',
      type: 'textarea',
      span: 24,
    },
  ]
}
