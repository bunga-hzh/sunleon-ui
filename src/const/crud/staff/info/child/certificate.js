export const certificateOption = {
  align: 'center',
  border: true,
  menuWidth: 160,
  labelWidth: 160,
  addBtn: true,
  column: [{
      label: "职业工种",
      prop: 'zygz',
    },
    {
      label: "职业等级",
      prop: 'zydj',
    },
    {
      label: "颁证机构",
      prop: 'bzjg',
    },
    {
      label: "职业资格证书编号",
      prop: 'zyzgzsbh',
    },
    {
      label: "证书颁发日期",
      prop: 'zsbfrq',
      type: 'date',
      valueFormat: 'yyyy-MM-dd',
    },
  ]
}
