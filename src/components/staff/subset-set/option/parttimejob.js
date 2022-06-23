const is_type = [{
  label: '是',
  value: "1",
}, {
  label: '否',
  value: "2",
}]

export const option = {
  align: 'center',
  border: true,
  menuWidth: 200,
  labelWidth: 160,
  viewBtn: true,
  column: [
    // {
    //   label: "社会兼职起始日期",
    //   prop: 'shjzqsrq',
    //   type: 'date',
    //   valueFormat: 'yyyy-MM-dd',
    // },
    // {
    //   label: "社会兼职终止日期",
    //   prop: 'shjzzzrq',
    //   type: 'date',
    //   valueFormat: 'yyyy-MM-dd',
    // },
    {
      label: "社会兼职起止时间",
      prop: "shjzqsrq",
      type: "daterange",
      format: 'yyyy-MM-dd',
      valueFormat: 'yyyy-MM-dd',
      startPlaceholder: '社会兼职起始日期',
      endPlaceholder: '社会兼职终止日期',
      slot: true,
      width: 160,
      rules: [{
        required: true,
        message: "请输入 社会兼职起止时间",
        trigger: "blur"
      }],
    },
    {
      label: "任职组织",
      prop: 'rzzz',
      rules: [{
        required: true,
        message: "请输入 任职组织",
        trigger: "blur"
      }],
    },
    {
      label: "组织类型",
      prop: 'zzlx',
      type: 'select',
      props: {
        label: 'label',
        value: 'value'
      },
      dicUrl: '/admin/dict/type/zzlx_type',
      rules: [{
        required: true,
        message: "请选择 任职组织",
        trigger: "blur"
      }],
    },
    {
      label: "兼职职务",
      prop: 'jzzw',
      rules: [{
        required: true,
        message: "请输入 兼职职务",
        trigger: "blur"
      }],
    },
    {
      label: "是否取酬",
      prop: 'sfqc',
      type: "radio",
      props: {
        label: "label",
        value: 'value'
      },
      dicData: is_type,
      rules: [{
        required: true,
        message: "请选择 是否取酬",
        trigger: "blur"
      }],
    },
  ]
}
