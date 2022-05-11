export default {
  submitText: '保存',
  size:'medium',
  emptyBtn:false,
  column: [
    {
      label: '',
      labelWidth: 0,
      prop: 'dynamic',
      type: 'dynamic',
      span: 24,
      children: {
        align: 'center',
        headerAlign: 'center',
        column: [
          {
            label: '起始时间',
            prop: "kssj",
            type:'date',
            format:'yyyy年MM月dd日',
            valueFormat:'yyyy-MM-dd',
          },
          {
            label: '终止时间',
            prop: "jssj",
            type:'date',
            format:'yyyy年MM月dd日',
            valueFormat:'yyyy-MM-dd',
          },
          {
            label: '事由',
            prop: "sy",
          },
          {
            label: '总金额',
            prop: "zje",
          },
          {
            label: '备注',
            prop: "bz",
          },
        ]
      }
    }
  ]
}
