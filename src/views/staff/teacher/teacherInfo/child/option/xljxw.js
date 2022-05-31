export const option = {
  align: 'center',
  border: true,
  menuWidth: 160,
  addBtn: true,
  labelWidth: 160,
  column: [{
      label: "学历",
      prop: 'xlm',
      type: "select",
      dicUrl: "/admin/dict/type/education_type",
      rules: [{
        required: true,
        message: "请选择学历",
        trigger: "change"
      }],
    },
    {
      label: "学校",
      prop: 'xx',
      rules: [{
        required: true,
        message: '请输入 学校',
        trigger: "blur"
      }]
    },
    // {
    //   label: "入学时间",
    //   prop: 'rxsj',
    //   type: 'date',
    //   valueFormat: 'yyyy-MM-dd',
    // },
    // {
    //   label: "毕业时间",
    //   prop: 'bysj',
    //   type: 'date',
    //   valueFormat: 'yyyy-MM-dd',
    //   rules: [{
    //     required: true,
    //     message: "请输入毕业时间",
    //     trigger: "blur"
    //   }],
    // },
    {
      label: "入学时间-毕业时间",
      prop: "rxsj",
      type: "daterange",
      format: 'yyyy-MM-dd',
      valueFormat: 'yyyy-MM-dd',
      startPlaceholder: '入学时间',
      endPlaceholder: '毕业时间',
      slot: true,
      width: 160,
      span: 24,
      rules: [{
        required: true,
        message: '请选择入学时间-毕业时间'
      }]
    },
    {
      label: "专业/系",
      prop: 'sxzym',
      rules: [{
        required: true,
        message: '请输入 专业/系',
        trigger: "blur",
      }]
    },
    {
      label: "所获学位",
      prop: 'hdxwm',
      rules: [{
        required: true,
        message: '请输入 所获学位',
        trigger: "blur",
      }]
    },
    {
      label: "学习形式",
      prop: 'xxxsm',
      type: 'select',
      props: {
        label: "label",
        value: 'value'
      },
      dicUrl: '/admin/dict/type/learning_from',
      rules: [{
        required: true,
        message: '请输入 所获学位',
        trigger: "change",
      }]
    },
    {
      label: "证明人",
      prop: 'zmr',
      rules: [{
        required: true,
        message: '请输入 证明人',
        trigger: "blur",
      }]
    },
    {
      label: "备注",
      prop: 'bz',
      type: 'textarea',
      span: 24,
      labelTip: '除全日制外应备注',
    },
  ]
}
