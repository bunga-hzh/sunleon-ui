export const officeOption = {
  submitText: '添加',
  labelWidth: 150,
  detail: false,
  column: [{
      label: "部门（处室）",
      prop: "bm",
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
      label: "岗位聘任年月",
      prop: "gwprny",
      type: "date",
      valueFormat: 'yyyy-MM-dd',
    },
    {
      label: "岗位聘任年限",
      prop: "gwprnx",
      type: 'number',
    },
    {
      label: "实际工作年限",
      prop: "sjgzny",
      type: 'number',
    },
    {
      label: "进入本单位工作时间",
      prop: "jrbdwgzsj",
      type: "date",
      valueFormat: 'yyyy-MM-dd',
    },
    {
      label: "岗位等级",
      prop: "gwdjm",
    },
    {
      label: "校内职务",
      prop: "xnzw",
    },
    {
      label: "参加工作时间",
      prop: "cjgzsj",
      type: "date",
      valueFormat: 'yyyy-MM-dd',
    },
    {
      label: "任现职务时间",
      prop: "xrzwsj",
      type: "date",
      valueFormat: 'yyyy-MM-dd',
    },
    {
      label: "用工形式",
      prop: "ygxs",
    },
    {
      label: "所属教研组",
      prop: "ssjyz",
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
    },
    {
      label: "试用期限",
      prop: "syqx",
    },
    {
      label: "专业技术职务",
      prop: "zyjszw",
    },
    {
      label: "专业技术等级",
      prop: "zyjsdj",
    },
    {
      label: "是否为内设机构领导",
      prop: "sfwjgld",
      type: "radio",
      props: {
        label: "label",
        value: 'value'
      },
      dicUrl: '/admin/dict/type/is_type',
    },
    {
      label: "是否残疾人",
      prop: "sfcjr",
      type: "radio",
      props: {
        label: "label",
        value: 'value'
      },
      dicUrl: '/admin/dict/type/is_type',
    },
    {
      label: "是否留学回国",
      prop: "sflxhg",
      type: "radio",
      props: {
        label: "label",
        value: 'value'
      },
      dicUrl: '/admin/dict/type/is_type',
    },
    {
      label: "是否为应届毕业生",
      prop: "sfwyjbys",
      type: "radio",
      props: {
        label: "label",
        value: 'value'
      },
      dicUrl: '/admin/dict/type/is_type',

    },
    {
      label: "减员材料上传",
      prop: "jyclsc",
      type: 'upload',
      propsHttp: {
        url: 'url',
        name: 'name',
        res: 'data'
      },
      tip: '只能上传jpg/png格式，且不超过500kb',
      action: '/imgupload',
      span: 24,
    },
  ]
}
