export const option = {
  align: 'center',
  border: true,
  menuWidth: 200,
  labelWidth: 140,
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
    // {
    //   label: "聘任起始日期",
    //   prop: 'prqsrq',
    //   type: 'date',
    //   valueFormat: 'yyyy-MM-dd',
    // },
    // {
    //   label: "聘任终止日期",
    //   prop: 'przzrq',
    //   type: 'date',
    //   valueFormat: 'yyyy-MM-dd',
    // },
    {
      label: "聘任起止日期",
      prop: "prqsrq",
      type: "daterange",
      format: 'yyyy-MM-dd',
      valueFormat: 'yyyy-MM-dd',
      startPlaceholder: '聘任起始时间',
      endPlaceholder: '聘任终止时间',
      slot: true,
      width: 160,
      rules: [{
        required: true,
        message: '请选择聘任起止日期'
      }]
    },
    {
      label: "专业技术资格名称",
      prop: 'zyjszgmc',
      rules: [{
        required: true,
        message: '请输入 专业技术资格名称',
        trigger: "blur",
      }]
    },
    {
      label: "取得资格途径",
      prop: 'qdzgtjm',
      rules: [{
        required: true,
        message: '请输入 取得资格途径',
        trigger: "blur",
      }]
    },
    {
      label: "取得资格时间",
      prop: 'hdzgsj',
      type: 'date',
      valueFormat: 'yyyy-MM-dd',
      rules: [{
        required: true,
        message: '请输入 取得资格时间',
      }]
    },
    {
      label: "任职资格名称",
      prop: 'rzzgmcm',
      rules: [{
        required: true,
        message: '请输入 任职资格名称',
        trigger: "blur",
      }]
    },
    {
      label: "首次聘任时间",
      prop: 'scprsj',
      type: 'date',
      valueFormat: 'yyyy-MM-dd',
      rules: [{
        required: true,
        message: '请输入 首次聘任时间',
        trigger: "blur",
      }]
    },
    {
      label: "聘任情况",
      prop: 'prqkm',
      type: 'select',
      dicUrl: "/admin/dict/type/hire_type",
      rules: [{
        required: true,
        message: '请输入 聘任情况',
        trigger: "blur",
      }]
    },
    {
      label: "上传电子证件",
      prop: 'scdzzj',
      type: 'upload',
      limit: 1,
      fileSize: 5120,
      propsHttp: {
        url: 'url',
        name: 'originalName',
        res: 'data'
      },
      tip: '不超过5M',
      action: '/admin/sys-file/upload',
      span: 24,
      hide: true,
    },
  ]
}
