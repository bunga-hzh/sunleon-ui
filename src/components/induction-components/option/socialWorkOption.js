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
            label: '起始时间',
            prop: 'kssj',
            type: 'date',
            format:'yyyy年MM月dd日',
            valueFormat:'yyyy-MM-dd',
          },
          {
            label: '终止时间',
            prop: 'jssj',
            type: 'date',
            format:'yyyy年MM月dd日',
            valueFormat:'yyyy-MM-dd',
          },
          {
            label: '任职组织',
            prop: 'rzzz'
          },
          {
            label: '组织类型',
            prop: 'rzlx',
            type:'select',
            props:{
              label:'label',
              value:'value'
            },
            dicFormatter:(data)=>{
              return data.data.items;
            },
            dicUrl:`/admin/dict/type_with_dict_id/zzlx_type`
          },
          {
            label: '兼职职务',
            prop: 'jjzw'
          },
          {
            label: '是否取酬',
            prop: 'sfqx',
            type: 'radio',
            border:true,
            dicData: [
              {
                label: '是',
                value: 0
              },
              {
                label: '否',
                value: 1
              }
            ]
          },
        ]
      }
    }
  ]
}
