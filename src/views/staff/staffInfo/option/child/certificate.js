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
