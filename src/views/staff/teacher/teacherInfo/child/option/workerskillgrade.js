export const option = {
  align: 'center',
  border: true,
  menuWidth: 160,
  labelWidth: 160,
  addBtn: true,
  column: [{
      label: "工人技术等级名称",
      prop: 'grjsdjmc',
    },
    {
      label: "工人技术职务名称",
      prop: 'grjszwmc',
    },
    {
      label: "取得技术职务时间",
      prop: 'qdjszwsj',
      type: 'date',
      valueFormat: 'yyyy-MM-dd',
    },
    {
      label: "批准技术职务单位名称",
      prop: 'pzjszwdwmc',
    },
    {
      label: "证书编号",
      prop: 'zsbh',
    },
    {
      label: "工人工种码",
      prop: 'grgzm',
    },
    {
      label: "上传电子证件",
      prop: 'szdczj',
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
