const is_type = [{
  label: '是',
  value: "1",
}, {
  label: '否',
  value: "2",
}]

export const option = {
  align: 'center',
  border: true,
  menuWidth: 140,
  labelWidth: 160,
  searchSpan: 8,
  searchLabelWidth: 120,
  viewBtn: true,
  addBtn: false,
  delBtn: false,
  editBtn: false,
  column: [{
      label: "id",
      prop: "id",
      addDisplay: false,
      editDisplay: false,
      viewDisplay: false,
      hide: true,
    },
    {
      label: "所属部门",
      prop: "deptId",
      width: 120,
      type: 'tree',
      dicUrl: 'admin/dept/tree',
      props: {
        label: "name",
        value: "id",
        children: "children"
      },
      rules: [{
        required: true,
        message: "请选择 所属部门",
        trigger: "blur"
      }],
      search: true,
      editDisabled: true,
      cascader: ['gwmc'],
    },
    {
      label: "姓名",
      prop: "xm",
      search: true,
      editDisabled: true,
      rules: [{
        required: true,
        message: "请选择 用户",
        trigger: "blur"
      }],
    },
    {
      label: "教职工ID",
      prop: "staffId",
      addDisplay: false,
      editDisplay: false,
      viewDisplay: false,
      hide: true,
    },
    {
      label: "工号",
      prop: "gh",
      search: true,
      editDisabled: true,
      width: 120,
      rules: [{
        required: true,
        message: "请输入 工号",
        trigger: "blur"
      }],
    },
    {
      label: "岗位类别",
      prop: "gwlbm",
      type: "select",
      props: {
        label: "label",
        value: 'value'
      },
      dicUrl: '/admin/dict/type/post_type',
      disabled: true,
      rules: [{
        required: true,
        message: "请选择 岗位类别",
        trigger: "blur"
      }],
      dicFlag: false,
    },
    {
      label: "岗位名称",
      prop: "gwmc",
      type: "select",
      searchMultiple: true,
      searchFilterable: true,
      filterable: true,
      filter: true,
      props: {
        label: "name",
        value: "id",
      },
      dicUrl: '/staff/zzjgcommon/postByDeptId/{{key}}',
      rules: [{
        required: true,
        message: "请选择 岗位名称",
        trigger: "blur"
      }],
      disabled: false,
      cascader: ['gwlbm'],
      slot: true,
    },
    {
      label: "人员类别",
      prop: "rylb",
      type: "select",
      props: {
        label: "label",
        value: 'value'
      },
      dicUrl: '/admin/dict/type/rylb_type',
    },
    {
      label: "岗位等级",
      prop: "gwdjm",
    },
    {
      label: "岗位聘任年月",
      prop: "gwprny",
      type: "date",
      valueFormat: 'yyyy-MM-dd',
      width: 120,
    },
    {
      label: "岗位聘任年限",
      prop: "gwprnx",
      type: 'number',
      width: 120,
    },
    {
      label: "参加工作时间",
      prop: "cjgzsj",
      type: "date",
      valueFormat: 'yyyy-MM-dd',
      width: 120,
    },
    {
      label: "实际工作年限",
      prop: "cjgzny",
      type: 'number',
      width: 120,
    },
    {
      label: "进入本单位工作时间",
      prop: "jrbdwgzsj",
      type: "date",
      valueFormat: 'yyyy-MM-dd',
      width: 130,
    },
    {
      label: "校内职务",
      prop: "xnzw",
    },
    {
      label: "聘任时限",
      prop: "prsx",
      type: 'number',
    },
    {
      label: "任现职务时间",
      prop: "rxzwsj",
      type: "date",
      valueFormat: 'yyyy-MM-dd',
      width: 120,
    },
    {
      label: "用工形式",
      prop: "ygxs",
    },
    {
      label: "所属教研组",
      prop: "ssjyz",
      width: 120,
    },
    {
      label: "教龄",
      prop: "jl",
      type: 'number',
    },
    {
      label: "减员时间",
      prop: "jysj",
      type: "date",
      valueFormat: 'yyyy-MM-dd',
    },
    {
      label: "人员录聘来源",
      prop: "rylply",
      width: 120,
    },
    {
      label: "试用期限",
      prop: "syqx",
    },
    {
      label: "专业技术职务",
      prop: "xrzyjszw",
      width: 120,
    },
    {
      label: "专业技术等级",
      prop: "zyjsdj",
      width: 120,
      span: 24,
    },
    {
      label: "是否为内设机构领导",
      prop: "sfwnsjgld",
      type: "radio",
      border: true,
      props: {
        label: "label",
        value: 'value'
      },
      dicData: is_type,
      width: 140,
    },
    {
      label: "是否残疾人",
      prop: "sfcjr",
      type: "radio",
      border: true,
      props: {
        label: "label",
        value: 'value'
      },
      dicData: is_type,
      width: 120,
    },
    {
      label: "是否留学回国",
      prop: "sflxhg",
      type: "radio",
      border: true,
      props: {
        label: "label",
        value: 'value'
      },
      dicData: is_type,
      width: 120,
    },
    {
      label: "是否为应届毕业生",
      prop: "sfyjbys",
      type: "radio",
      border: true,
      props: {
        label: "label",
        value: 'value'
      },
      dicData: is_type,
      width: 140,
    },
    {
      label: "减员材料上传",
      prop: "jyclsc",
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
  ],
  rowEdit: (row, index) => {
    console.log(row, '调用了')
  },
}
