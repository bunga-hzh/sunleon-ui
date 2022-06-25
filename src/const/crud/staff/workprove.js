export const option = {
  align: 'center',
  border: true,
  index: true,
  indexLabel: '序号',
  menuWidth: 260,
  searchSpan: 8,
  labelWidth: 120,
  viewBtn: true,
  column: [{
      label: "姓名",
      prop: "xm",
      search: true,
      slotForm: true,
      rules: [{
        required: true,
        message: "请输入 姓名",
        trigger: "blur"
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
        trigger: "blur"
      }],
    },
    {
      label: "部门",
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
        trigger: "blur"
      }],
    },
    {
      label: '人员分类',
      prop: 'rylb',
      search: true,
      type: 'select',
      dicUrl: '/admin/dict/type/rylb_type',
      props: {
        "label": "label",
        "value": "value"
      },
      rules: [{
        required: true,
        message: "请选择 人员分类",
        trigger: "blur"
      }],
    },
    {
      label: '证明类型',
      prop: 'proveType',
      search: true,
      type: 'select',
      dicUrl: '/admin/dict/type/prove_type',
      props: {
        "label": "label",
        "value": "value"
      },
      rules: [{
        required: true,
        message: "请选择 证明类型",
        trigger: "blur"
      }],
    },
    {
      label: '生成时间',
      prop: 'createTime',
      addDisplay: false,
      editDisabled: true,
      width: 150,
      rules: [{
        required: true,
        message: "请输入 生成时间",
        trigger: "blur"
      }],
    },
    {
      label: '事由',
      prop: 'sy',
      type: 'textarea',
      span: 24,
      rules: [{
        required: true,
        message: "请输入 事由",
        trigger: "blur"
      }],
    }
  ]
}
