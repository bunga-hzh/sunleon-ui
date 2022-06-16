export const option = {
  align: 'center',
  border: true,
  menuWidth: 100,
  labelWidth: 160,
  viewBtn: true,
  addBtn: false,
  editBtn: false,
  delBtn: false,
  column: [{
      label: "考察事由",
      prop: 'kcsy',
    },
    {
      label: "考察日期",
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
