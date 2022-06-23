export const option = {
  align: 'center',
  border: true,
  menuWidth: 200,
  labelWidth: 160,
  viewBtn: true,
  column: [{
      label: "资格证种类",
      prop: 'zgzzl',
      rules: [{
        required: true,
        message: "请输入 资格证种类",
        trigger: "blur"
      }],
    },
    {
      label: "资格证号码",
      prop: 'zgzhm',
      rules: [{
        required: true,
        message: "请输入 资格证号码",
        trigger: "blur"
      }],
    },
    {
      label: "任教学科",
      prop: 'rjxk',
      rules: [{
        required: true,
        message: "请输入 任教学科",
        trigger: "blur"
      }],
    },
    {
      label: "发证机关",
      prop: 'fzjg',
      rules: [{
        required: true,
        message: "请输入 发证机关",
        trigger: "blur"
      }],
    },
    {
      label: "证书颁发日期",
      prop: 'zsbfrq',
      type: 'date',
      valueFormat: 'yyyy-MM-dd',
      rules: [{
        required: true,
        message: "请输入 证书颁发日期",
        trigger: "blur"
      }],
    },
  ]
}
