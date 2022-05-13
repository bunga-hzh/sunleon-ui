export const organiseinspectOption = {
  align: 'center',
  border: true,
  menuWidth: 120,
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
