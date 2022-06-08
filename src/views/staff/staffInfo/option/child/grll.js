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
    // {
    //   label: "起始时间",
    //   prop: 'qssj',
    //   type: 'date',
    //   valueFormat: 'yyyy-MM-dd',
    // },
    // {
    //   label: "终止时间",
    //   prop: 'zzsj',
    //   type: 'date',
    //   valueFormat: 'yyyy-MM-dd',
    // },
    {
      label: "起止时间",
      prop: "qssj",
      type: "daterange",
      format: 'yyyy-MM-dd',
      valueFormat: 'yyyy-MM-dd',
      startPlaceholder: '起始时间',
      endPlaceholder: '终止时间',
      slot: true,
      width: 160,
      rules: [{
        required: true,
        message: '请选择 入学时间-毕业时间'
      }]
    },
    {
      label: "所在单位",
      prop: 'szdw',
      rules: [{
        required: true,
        message: '请输入 所在单位',
        trigger: "blur",
      }]
    },
    {
      label: "职务",
      prop: 'zw',
      rules: [{
        required: true,
        message: '请输入 职务',
        trigger: "blur",
      }]
    },
    {
      label: "聘任时限",
      prop: 'prsx',
      type: "number",
      rules: [{
        required: true,
        message: '请输入 聘任时限',
        trigger: "blur",
      }]
    },
    {
      label: "单位所在省份",
      prop: 'dwszsf',
      rules: [{
        required: true,
        message: '请输入 单位所在省份',
        trigger: "blur",
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
      label: "上传电子证明",
      prop: 'scdzzm',
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
