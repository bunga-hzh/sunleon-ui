export const option = {
  align: 'center',
  border: true,
  menuWidth: 160,
  labelWidth: 160,
  addBtn: true,
  column: [{
      label: "工人技术等级名称",
      prop: 'grjsdjmc',
      type: 'select',
      dicData: [{
        value: 0,
        label: '初级技术工人'
      }]
    },
    {
      label: "工人技术职务名称",
      prop: 'grjszwmc',
      type: 'select',
      dicData: [{
        value: 0,
        label: '中级技术工人'
      }]
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
    },
  ]
}
