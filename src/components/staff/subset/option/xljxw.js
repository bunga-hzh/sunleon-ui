export const option = {
  align: 'center',
  border: true,
  menuWidth: 100,
  labelWidth: 160,
  viewBtn: true,
  addBtn: false,
  editBtn: false,
  delBtn: false,
  column: [{
      label: "学历",
      prop: 'xlm',
      type: "select",
      dicUrl: "/admin/dict/type/education_type",
    },
    {
      label: "学校",
      prop: 'xx',
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
    },
    {
      label: "专业/系",
      prop: 'sxzym',
    },
    {
      label: "所获学位",
      prop: 'hdxwm',
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
    },
    {
      label: "证明人",
      prop: 'zmr',
    },
    {
      label: "备注",
      prop: 'bz',
      type: 'textarea',
      span: 24,
    },
  ]
}
