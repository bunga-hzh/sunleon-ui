export const option = {
  align: 'center',
  border: true,
  menuWidth: 160,
  labelWidth: 130,
  addBtn: true,
  column: [{
      label: "社会兼职起始日期",
      prop: 'shjzqsrq',
      type: 'date',
      valueFormat: 'yyyy-MM-dd',
    },
    {
      label: "社会兼职终止日期",
      prop: 'shjzzzrq',
      type: 'date',
      valueFormat: 'yyyy-MM-dd',
    },
    {
      label: "任职组织",
      prop: 'rzzz',
    },
    {
      label: "组织类型",
      prop: 'zzlx',
    },
    {
      label: "兼职职务",
      prop: 'jzzw',
    },
    {
      label: "是否取酬",
      prop: 'sfqc',
      type: "radio",
      props: {
        label: "label",
        value: 'value'
      },
      dicUrl: '/admin/dict/type/is_type',
    },
  ]
}
