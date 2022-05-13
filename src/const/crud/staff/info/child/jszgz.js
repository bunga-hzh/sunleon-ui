export const jszgzOption = {
  align: 'center',
  border: true,
  menuWidth: 120,
  labelWidth: 160,
  column: [{
      label: "资格证种类",
      prop: 'zgzzl',
    },
    {
      label: "资格证号码",
      prop: 'zgzhm',
    },
    {
      label: "任教学科",
      prop: 'rjxk',
    },
    {
      label: "发证机关",
      prop: 'fzjg',
    },
    {
      label: "证书颁发日期",
      prop: 'zsbfrq',
      type: 'date',
      valueFormat: 'yyyy-MM-dd',
    },
  ]
}
