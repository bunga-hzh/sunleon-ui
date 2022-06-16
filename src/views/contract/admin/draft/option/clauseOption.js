export default {
  size:'small',
  gutter:80,
  submitBtn:false,
  emptyBtn:false,
  labelWidth:130,
  column: [
    {
      label: '',
      labelWidth: 0,
      prop: 'htGlTkList',
      type: 'dynamic',
      span: 24,
      children: {
        align: 'center',
        headerAlign: 'center',
        column: [
          {
            label: '条款内容',
            prop:'tkxx'
          }
        ]
      }
    }
  ]
}
