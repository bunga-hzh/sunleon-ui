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
            label: '职业工种',
            prop:'zygz'
          },
          {
            label: '职业等级',
            prop:'zydj'
          },
          {
            label: '颁证机构',
            prop:'pzjg'
          },
          {
            label: '证书编号',
            prop:'zsbh'
          },
          {
            label: '取得时间',
            prop:'qdsj',
            type:'date',
            format:'yyyy年MM月dd日',
            valueFormat:'yyyy-MM-dd',
          }
        ]
      }
    }
  ]
}
