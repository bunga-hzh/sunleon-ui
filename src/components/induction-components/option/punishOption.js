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
            label: '处分类别',
            prop:'cflb'
          },
          {
            label: '处分名称',
            prop:'cfmc'
          },
          {
            label: '受处分时间',
            prop:'scfsj',
            type:'date',
            format:'yyyy年MM月dd日',
            valueFormat:'yyyy-MM-dd',
          },
          {
            label: '处分原因',
            prop:'cdyy',
          },
          {
            label: '撤销处分时间',
            prop:'cxcfsj',
            type:'date',
            format:'yyyy年MM月dd日',
            valueFormat:'yyyy-MM-dd',
          },
          {
            label: '监察机关直接给予',
            prop:'jjjgzjgy'
          },
        ]
      }
    }
  ]
}
