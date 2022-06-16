export const option = {
  align: 'center',
  border: true,
  menuWidth: 100,
  labelWidth: 160,
  viewBtn: true,
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
