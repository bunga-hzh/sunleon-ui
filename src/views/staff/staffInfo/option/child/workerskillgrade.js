export const option = {
  align: 'center',
  border: true,
  menuWidth: 200,
  labelWidth: 180,
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
      label: "职业技术等级名称",
      prop: 'zyjsdjmc',
      type: 'select',
      dicUrl: '/admin/dict/type/profession_type',
      rules: [{
        required: true,
        message: '请输入 职业技术等级名称',
        trigger: "blur",
      }]
    },
    {
      label: "职业技术职务名称",
      prop: 'zyjszwmc',
      type: 'select',
      dicData: [{
        value: 0,
        label: '中级技术工人'
      }],
      rules: [{
        required: true,
        message: '请输入 职业技术职务名称',
        trigger: "blur",
      }]
    },
    {
      label: "取得技术职务时间",
      prop: 'qdjszwsj',
      type: 'date',
      valueFormat: 'yyyy-MM-dd',
      rules: [{
        required: true,
        message: '请选择 取得技术职务时间',
        trigger: "blur",
      }]
    },
    {
      label: "批准技术职务单位名称",
      prop: 'pzjszwdwmc',
      rules: [{
        required: true,
        message: '请输入 批准技术职务单位名称',
        trigger: "blur",
      }]
    },
    {
      label: "证书编号",
      prop: 'zsbh',
      rules: [{
        required: true,
        message: '请输入 证书编号',
        trigger: "blur",
      }]
    },
    {
      label: "工人工种",
      prop: 'grgzm',
      rules: [{
        required: true,
        message: '请输入 工人工种',
        trigger: "blur",
      }]
    },
    {
      label: "上传电子证件",
      prop: 'szdczj',
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
