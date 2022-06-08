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
      label: "资格证种类",
      prop: 'zgzzl',
      rules: [{
        required: true,
        message: '请输入 资格证种类',
        trigger: "blur",
      }]
    },
    {
      label: "资格证号码",
      prop: 'zgzhm',
      rules: [{
        required: true,
        message: '请输入 资格证号码',
        trigger: "blur",
      }]
    },
    {
      label: "任教学科",
      prop: 'rjxk',
      rules: [{
        required: true,
        message: '请输入 任教学科',
        trigger: "blur",
      }]
    },
    {
      label: "发证机关",
      prop: 'fzjg',
      rules: [{
        required: true,
        message: '请输入 发证机关',
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
