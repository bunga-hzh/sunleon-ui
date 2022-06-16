export const option = {
  align: 'center',
  border: true,
  menuWidth: 100,
  labelWidth: 160,
  viewBtn: true,
  addBtn: false,
  editBtn: false,
  delBtn: false,
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
    },
    {
      label: "专业技术资格名称",
      prop: 'zyjszgmc',
    },
    {
      label: "取得资格途径",
      prop: 'qdzgtjm',
    },
    {
      label: "取得资格时间",
      prop: 'hdzgsj',
      type: 'date',
      valueFormat: 'yyyy-MM-dd',
    },
    {
      label: "任职资格名称",
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
      dicUrl: "/admin/dict/type/hire_type",
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
      hide: true,
    },
  ]
}
