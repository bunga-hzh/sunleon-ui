export const option = {
  align: 'center',
  border: true,
  menuWidth: 160,
  addBtn: true,
  column: [{
      label: "考察事由",
      prop: 'kcsy',
    },
    {
      label: "考核日期",
      prop: 'kcrq',
      type: 'date',
      valueFormat: 'yyyy-MM-dd',
    },
    {
      label: "备注",
      prop: 'bz',
      type: 'textarea',
      span: 24,
    },
  ]
}
