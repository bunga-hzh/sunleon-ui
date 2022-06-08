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
      prop: "bm",
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
      label: "职务名称",
      prop: 'zwmc',
      rules: [{
        required: true,
        message: '请输入 职务名称',
        trigger: "blur",
      }]
    },
    {
      label: "任职方式",
      prop: 'rzfsm',
      type: "select",
      dicUrl: "/admin/dict/type/appointment_type",
      rules: [{
        required: true,
        message: '请选择 任职方式',
        trigger: "blur",
      }]
    },
    {
      label: "任免职文号",
      prop: 'rmzwh',
      rules: [{
        required: true,
        message: '请输入 任免职文号',
        trigger: "blur",
      }]
    },
    {
      label: "职务级别",
      prop: 'zwjbm',
      rules: [{
        required: true,
        message: '请输入 职务级别',
        trigger: "blur",
      }]
    },
    {
      label: "任本职级时间",
      prop: 'rbzjsj',
      type: 'date',
      valueFormat: 'yyyy-MM-dd',
      rules: [{
        required: true,
        message: '请输入 任本职级时间',
        trigger: "blur",
      }]
    },
    {
      label: "任本职务时间",
      prop: 'rbzwsj',
      type: 'date',
      valueFormat: 'yyyy-MM-dd',
      rules: [{
        required: true,
        message: '请输入 任本职务时间',
        trigger: "blur",
      }]
    },
    {
      label: "领导任职文件",
      prop: "ldrzwj",
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
