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
            label: '类别',
            prop: 'lb',
          },
          {
            label: '护照号',
            prop: 'hzh'
          },
          {
            label: '签发地点',
            prop: 'qfdd'
          },
          {
            label: '签发日期',
            prop: 'qfrq',
            type: 'date',
            format:'yyyy年MM月dd日',
            valueFormat:'yyyy-MM-dd',
          },
          {
            label: '有效期至',
            prop: 'xxq',
            type: 'date',
            format:'yyyy年MM月dd日',
            valueFormat:'yyyy-MM-dd',
          },
          {
            label: '签发机关',
            prop: 'qfjg'
          }
        ]
      }
    }
  ]
}
