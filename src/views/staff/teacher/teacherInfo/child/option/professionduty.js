export const option = {
  align: 'center',
  border: true,
  menuWidth: 160,
  labelWidth: 130,
  addBtn: true,
  column: [
    // {
    //   label: "聘任起始日期",
    //   prop: 'prqsrq',
    //   type: 'date',
    //   valueFormat: 'yyyy-MM-dd',
    // },
    // {
    //   label: "聘任终止日期",
    //   prop: 'przzrq',
    //   type: 'date',
    //   valueFormat: 'yyyy-MM-dd',
    // },
    {
      label: "聘任起止日期",
      prop: "prqsrq",
      type: "daterange",
      format: 'yyyy-MM-dd',
      valueFormat: 'yyyy-MM-dd',
      startPlaceholder: '聘任起始时间',
      endPlaceholder: '聘任终止时间',
      slot: true,
      width: 160,
      span: 24,
      rules: [{
        required: true,
        message: '请选择聘任起止日期'
      }]
    },
    {
      label: "专业技术资格名称",
      prop: 'zyjszgmc',
    },
    {
      label: "取得资格途径码",
      prop: 'qdzgtjm',
    },
    {
      label: "取得资格时间",
      prop: 'hdzgsj',
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
      label: "聘任情况",
      prop: 'prqkm',
      type: 'select',
      dicData: [{
          label: '在聘',
          value: 0
        },
        {
          label: '不在聘',
          value: 1
        },
        {
          label: '高职低聘',
          value: 2
        }
      ]
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
