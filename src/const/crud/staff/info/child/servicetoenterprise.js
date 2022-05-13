export const servicetoenterpriseOption = {
  align: 'center',
  border: true,
  menuWidth: 120,
  labelWidth: 160,
  column: [{
      label: "起始时间",
      prop: 'qssj',
      type: 'date',
      valueFormat: 'yyyy-MM-dd',
    },
    {
      label: "终止时间",
      prop: 'zzjs',
      type: 'date',
      valueFormat: 'yyyy-MM-dd',
    },
    {
      label: "事由",
      prop: 'sy',
    },
    {
      label: "总金额",
      prop: 'zje',
    },
    {
      label: "备注",
      prop: 'bz',
      type: 'textarea',
      span: 24,
    },
  ]
}
