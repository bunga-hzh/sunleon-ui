export const option = {
  align: 'center',
  border: true,
  menuWidth: 160,
  labelWidth: 130,
  addBtn: true,
  column: [{
      label: "专业技术资格名称",
      prop: 'zyjszgmc',
    },
    {
      label: "取得资格途径码",
      prop: 'qdzgtjm',
    },
    {
      label: "取得资格时间",
      prop: 'qdzgsj',
      type: 'date',
      valueFormat: 'yyyy-MM-dd',
    },
    {
      label: "任职资格名称码",
      prop: 'rzzgmcm',
    },
    {
      label: "首次聘任时间",
      prop: 'scprsj',
      type: 'date',
      valueFormat: 'yyyy-MM-dd',
    },
    {
      label: "聘任起始日期",
      prop: 'prsqsj',
      type: 'date',
      valueFormat: 'yyyy-MM-dd',
    },
    {
      label: "聘任终止日期",
      prop: 'przzsj',
      type: 'date',
      valueFormat: 'yyyy-MM-dd',
    },
    {
      label: "聘任情况码",
      prop: 'prqkm',
    },
    {
      label: "上传电子证件",
      prop: 'scdzzj',
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
