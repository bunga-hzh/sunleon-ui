export const leaderOption = {
  align: 'center',
  border: true,
  menuWidth: 160,
  labelWidth: 100,
  addBtn: true,
  column: [{
      label: "部门",
      prop: 'bm',
    },
    {
      label: "职务名称",
      prop: 'zwmc',
    },
    {
      label: "任职方式",
      prop: 'rzfsm',
    },
    {
      label: "任免职文号",
      prop: 'rmzwh',
    },
    {
      label: "职务级别",
      prop: 'zwjbm',
    },
    {
      label: "任本职级时间",
      prop: 'rbzjsj',
      type: 'date',
      valueFormat: 'yyyy-MM-dd',
    },
    {
      label: "领导任职文件",
      prop: "ldrzwj",
      type: 'upload',
      propsHttp: {
        url: 'url',
        name: 'name',
        res: 'data'
      },
      tip: '只能上传jpg/png格式，且不超过500kb',
      action: '/imgupload'
    },
  ]
}
