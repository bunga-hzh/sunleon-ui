export const option = {
  align: 'center',
  border: true,
  menuWidth: 160,
  labelWidth: 160,
  addBtn: true,
  column: [{
      label: "职业工种",
      prop: 'zygz',
      rules: [{
        required: true,
        message: '请输入 职业工种',
        trigger: "blur",
      }]
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
      rules: [{
        required: true,
        message: '请输入 职业等级',
        trigger: "blur",
      }]
    },
    {
      label: "颁证机构",
      prop: 'bzjg',
      rules: [{
        required: true,
        message: '请输入 颁证机构',
        trigger: "blur",
      }]
    },
    {
      label: "资格证书编号",
      prop: 'zyzgzsbh',
      rules: [{
        required: true,
        message: '请输入 资格证书编号',
        trigger: "blur",
      }]
    },
    {
      label: "证书颁发日期",
      prop: 'zsbfrq',
      type: 'date',
      valueFormat: 'yyyy-MM-dd',
      rules: [{
        required: true,
        message: '请输入 证书颁发日期',
        trigger: "blur",
      }]
    },
  ]
}
