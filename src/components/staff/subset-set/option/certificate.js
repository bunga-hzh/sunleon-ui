export const option = {
  align: 'center',
  border: true,
  menuWidth: 100,
  labelWidth: 160,
  viewBtn: true,
  column: [{
      label: "职业工种",
      prop: 'zygz',
    },
    {
      label: "职业等级",
      prop: 'zydj',
      type: "select",
      props: {
        label: "label",
        value: 'value'
      },
      dicUrl: '/admin/dict/type/profession_type',
    },
    {
      label: "颁证机构",
      prop: 'bzjg',
    },
    {
      label: "资格证书编号",
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
