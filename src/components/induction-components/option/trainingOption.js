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
            label: '学习起始时间',
            prop:'xxkssj',
            type: 'date',
            format:'yyyy年MM月dd日',
            valueFormat:'yyyy-MM-dd',
          },
          {
            label: '学习终止时间',
            prop:'xxjssj',
            type: 'date',
            format:'yyyy年MM月dd日',
            valueFormat:'yyyy-MM-dd',
          },
          {
            label: '培训班名称',
            prop:'pxbmc'
          },
          {
            label: '培训学时',
            prop:'pxxs'
          },
          {
            label: '培训类别',
            prop:'pxlb'
          },
          {
            label: '主办单位',
            prop:'zbdw'
          },
          {
            label: '参加出国出境',
            prop:'cjcgcj'
          },
          {
            label: '是否学历学位晋升',
            prop:'sfxwjs',
            type:'radio',
            dicData:[{
              label:'是',
              value:'0'
            },{
              label:'否',
              value:'1'
            }]
          },
        ]
      }
    }
  ]
}
