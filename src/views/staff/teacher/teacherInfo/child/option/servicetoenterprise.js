export const option = {
  align: 'center',
  border: true,
  menuWidth: 160,
  labelWidth: 160,
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
      label: "起始时间-终止时间",
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
        message: '请选择起始时间-终止时间'
      }]
    },
    {
      label: "事由",
      prop: 'sy',
    },
    {
      label: "总金额",
      prop: 'zje',
      type: 'number',
    },
    {
      label: "备注",
      prop: 'bz',
      type: 'textarea',
      span: 24,
    },
  ]
}
