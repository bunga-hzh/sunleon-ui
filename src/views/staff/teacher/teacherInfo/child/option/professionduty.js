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
      rules: [{
        required: true,
        message: '请输入 专业技术资格名称',
        trigger: "blur",
      }]
    },
    {
      label: "取得资格途径",
      prop: 'qdzgtjm',
      rules: [{
        required: true,
        message: '请输入 取得资格途径',
        trigger: "blur",
      }]
    },
    {
      label: "取得资格时间",
      prop: 'hdzgsj',
      type: 'date',
      valueFormat: 'yyyy-MM-dd',
      rules: [{
        required: true,
        message: '请输入 取得资格时间',
      }]
    },
    {
      label: "任职资格名称",
      prop: 'rzzgmcm',
      rules: [{
        required: true,
        message: '请输入 任职资格名称',
        trigger: "blur",
      }]
    },
    {
      label: "首次聘任时间",
      prop: 'scprsj',
      type: 'date',
      valueFormat: 'yyyy-MM-dd',
      rules: [{
        required: true,
        message: '请输入 首次聘任时间',
        trigger: "blur",
      }]
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
      ],
      rules: [{
        required: true,
        message: '请输入 聘任情况',
        trigger: "blur",
      }]
    },
    {
      label: "上传电子证件",
      prop: 'scdzzj',
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
