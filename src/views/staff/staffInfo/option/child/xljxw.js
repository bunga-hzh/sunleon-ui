export const option = {
  align: 'center',
  border: true,
  menuWidth: 200,
  labelWidth: 150,
  searchLabelWidth: 120,
  viewBtn: true,
  column: [{
      label: "教职工ID",
      prop: "staffId",
      addDisplay: false,
      editDisplay: false,
      viewDisplay: false,
      hide: true,
    },
    {
      label: "姓名",
      prop: "xm",
      search: true,
      slotForm: true,
      formslot: true,
      rules: [{
        required: true,
        message: "请选择 用户",
        trigger: "change"
      }],
    },
    {
      label: "工号",
      prop: "gh",
      search: true,
      addDisabled: true,
      editDisabled: true,
      width: 120,
      rules: [{
        required: true,
        message: "请输入 工号",
        trigger: "change"
      }],
    },
    {
      label: "所属部门",
      prop: "deptId",
      search: true,
      type: 'tree',
      dicUrl: 'admin/dept/tree',
      props: {
        label: "name",
        value: "id",
        children: "children"
      },
      addDisabled: true,
      editDisabled: true,
      width: 120,
      rules: [{
        required: true,
        message: "请选择 部门",
        trigger: "change"
      }],
    },
    {
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
