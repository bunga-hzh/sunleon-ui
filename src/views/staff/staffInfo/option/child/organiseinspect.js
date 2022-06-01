export const option = {
  align: 'center',
  border: true,
  menuWidth: 200,
  labelWidth: 130,
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
      label: "考察事由",
      prop: 'kcsy',
      rules: [{
        required: true,
        message: '请输入 考察事由',
        trigger: "blur",
      }]
    },
    {
      label: "考察日期",
      prop: 'kcrq',
      type: 'date',
      valueFormat: 'yyyy-MM-dd',
      rules: [{
        required: true,
        message: '请输入 考察日期',
        trigger: "blur",
      }]
    },
    {
      label: "备注",
      prop: 'bz',
      type: 'textarea',
      span: 24,
    },
  ]
}
