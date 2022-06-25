export const option = {
  align: 'center',
  border: true,
  menuWidth: 200,
  labelWidth: 160,
  viewBtn: true,
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
      rules: [{
        required: true,
        message: "请输入 起始时间-终止时间",
        trigger: "blur"
      }],
    },
    {
      label: "事由",
      prop: 'sy',
      rules: [{
        required: true,
        message: "请输入 事由",
        trigger: "blur"
      }],
    },
    {
      label: "总金额",
      prop: 'zje',
      type: 'number',
      rules: [{
        required: true,
        message: "请输入 总金额",
        trigger: "blur"
      }],
    },
    {
      label: "备注",
      prop: 'bz',
      type: 'textarea',
      span: 24,
    },
  ]
}
