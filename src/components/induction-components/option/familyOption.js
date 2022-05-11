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
            label: '称谓',
            prop: 'cw'
          },
          {
            label: '姓名',
            prop: 'xm'
          },
          {
            label: '出生年月',
            prop: 'csrq',
            type:'date',
            format:'yyyy年MM月dd日',
            valueFormat:'yyyy-MM-dd',
          },
          {
            label: '政治面貌',
            prop: 'zzmm',
            type:'select',
            props:{
              label:'label',
              value:'value'
            },
            dicFormatter:(data)=>{
              return data.data.items;
            },
            dicUrl:`/admin/dict/type_with_dict_id/politics_type`
          },
          {
            label: '工作单位及职务',
            prop: 'gzdw'
          },
          {
            label: '联系方式',
            prop: 'lxfs'
          },
        ]
      }
    }
  ]
}
