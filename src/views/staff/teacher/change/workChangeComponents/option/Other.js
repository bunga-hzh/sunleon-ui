export const option = {
  align: 'center',
  border: true,
  searchSpan: 8,
  index: true,
  labelWidth: 150,
  menuWidth: 200,
  viewBtn: true,
  column: [{
      label: "姓名",
      prop: "xm",
      search: true,
      formslot: true,
      editDisabled: true,
      rules: [{
        required: true,
        message: '请输入 姓名',
        trigger: 'blur'
      }]
    },
    {
      label: "工号",
      prop: "gh",
      search: true,
      addDisabled: true,
      editDisabled: true,
      rules: [{
        required: true,
        message: '请输入 工号',
        trigger: 'blur'
      }]
    },
    {
      label: "所属部门",
      prop: "deptId",
      search: true,
      addDisabled: true,
      editDisabled: true,
      type: 'tree',
      dicUrl: 'admin/dept/tree',
      props: {
        label: "name",
        value: "id",
        children: "children"
      },
      rules: [{
        required: true,
        message: '请选择 所属部门',
        trigger: 'blur'
      }]
    },
    {
      label: "异动时间",
      prop: "ydsj",
      type: 'date',
      valueFormat: "yyyy-MM-dd",
      rules: [{
        required: true,
        message: '请输入 异动时间',
        trigger: 'blur'
      }]
    },
    {
      label: "备注",
      prop: "bz",
      type: 'textarea',
      span: 24,
    },
  ],
}
