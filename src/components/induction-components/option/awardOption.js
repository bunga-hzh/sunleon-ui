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
            label: '奖励类别',
            prop:'jllb'
          },
          {
            label: '奖励名称',
            prop:'jlmc'
          },
          {
            label: '奖励时间',
            prop:'jlsj',
            type: 'date'
          },
          {
            label: '奖励单位',
            prop:'jldw'
          }
        ]
      }
    }
  ]
}
