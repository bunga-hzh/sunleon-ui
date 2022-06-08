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
  menuWidth: 200,
  labelWidth: 160,
  searchSpan: 8,
  searchLabelWidth: 120,
  viewBtn: true,
  column: [{
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
      label: "岗位类别",
      prop: "gwlbm",
      type: "select",
      props: {
        label: "label",
        value: 'value'
      },
      dicUrl: '/admin/dict/type/post_type',
    },
    {
      label: "岗位名称",
      prop: "gwmc",
      type: 'select'
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
      label: "岗位等级",
      prop: "gwdjm",
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
      type: "number",
      width: 120,
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
    },
    {
      label: "是否为内设机构领导",
      prop: "sfwnsjgld",
      type: "radio",
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
  ]
}
