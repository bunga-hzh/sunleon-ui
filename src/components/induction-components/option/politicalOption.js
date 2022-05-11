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
            label: '政治面貌',
            prop:'zzmm',
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
            label: '参加党派时间',
            prop:'cjdpsj',
            type: 'date',
            format:'yyyy年MM月dd日',
            valueFormat:'yyyy-MM-dd',
          },
          {
            label: '介绍人',
            prop:'jsr'
          },
          {
            label: '转正时间',
            prop:'zzsj',
            type:'date',
            format:'yyyy年MM月dd日',
            valueFormat:'yyyy-MM-dd',
          },
        ]
      }
    }
  ]
}
