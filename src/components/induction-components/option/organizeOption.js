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
            label: '考察（考核）事由',
            prop:'kcsy'
          },
          {
            label: '考察（考核）时间',
            prop:'kcsj',
            type: 'date',
            format:'yyyy年MM月dd日',
            valueFormat:'yyyy-MM-dd',
          },
          {
            label: '备注',
            prop:'bz'
          },
        ]
      }
    }
  ]
}
