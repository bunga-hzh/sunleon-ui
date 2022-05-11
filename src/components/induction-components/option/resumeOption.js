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
            label: "起始时间",
            prop: 'grllqssj',
            type: 'date'
          },
          {
            label: "终止时间",
            prop: 'grllzzsj',
            type: 'date'
          },
          {
            label: "所在单位",
            prop: 'grllszdw',
          },
          {
            label: "职务",
            prop: 'grllzw'
          },
          {
            label: "单位所在省份",
            prop: 'grlldwszsf'
          },
          {
            label: '电子证件',
            prop:'prdzzj',
            type: 'upload'
          }
        ]
      }
    }
  ]
}
