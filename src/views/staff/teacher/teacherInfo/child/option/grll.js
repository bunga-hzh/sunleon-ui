export const option = {
  align: 'center',
  border: true,
  menuWidth: 160,
  labelWidth: 100,
  addBtn: true,
  column: [
    // {
    //   label: "起始时间",
    //   prop: 'qssj',
    //   type: 'date',
    //   valueFormat: 'yyyy-MM-dd',
    // },
    // {
    //   label: "终止时间",
    //   prop: 'zzsj',
    //   type: 'date',
    //   valueFormat: 'yyyy-MM-dd',
    // },
    {
      label: "起止时间",
      prop: "qssj",
      type: "daterange",
      format: 'yyyy-MM-dd',
      valueFormat: 'yyyy-MM-dd',
      startPlaceholder: '起始时间',
      endPlaceholder: '终止时间',
      slot: true,
      width: 160,
      span: 24,
      rules: [{
        required: true,
        message: '请选择入学时间-毕业时间'
      }]
    },
    {
      label: "所在单位",
      prop: 'szdw',
    },
    {
      label: "职务",
      prop: 'zw',
    },
    {
      label: "单位所在省份",
      prop: 'dwszsf',
    },
    {
      label: "证明人",
      prop: 'zmr',
    },
    {
      label: "上传电子证明",
      prop: 'scdzzm',
      type: 'upload',
      limit: 1,
      fileSize: 5120,
      propsHttp: {
        url: 'res_id',
        name: 'originalName',
        res: 'data'
      },
      tip: '不超过5M',
      action: '/admin/sys-file/upload',
      span: 24,
    },
  ]
}
