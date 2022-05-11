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
            label: '资格种类',
            prop:'zgzl'
          },
          {
            label: '资格证号码',
            prop:'zgzm'
          },
          {
            label: '任教学科',
            prop:'rjxk'
          },
        ]
      }
    }
  ]
}
