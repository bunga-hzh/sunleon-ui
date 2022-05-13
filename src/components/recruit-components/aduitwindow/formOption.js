
export const MaterialFormOption = {
    labelWidth: 110,
    submitText: '审核通过',
    submitBtn:true,
    emptyBtn:false,
    column: [
      {
        detail:true,
        label: '应聘者名称',
        prop: "name",
        span: 24,
        row: true,
        disabled:true
      },
      {
        detail:true,
        label: '佐证材料附件',
        prop:'resourcesList',
        span: 24,
        type: 'upload',
        disabled:true,
        propsHttp: {
          url:'url',
          name:'name',
          res: 'data'
        },
      },
      {
        detail:true,
        label: '补充时间',
        prop:'cjsj',
        span: 24,
        disabled: true
      },
      // {
      //   label: '有无犯罪记录',
      //   prop:'fzjl',
      //   span: 24,
      //   detail:true,
      //   disabled: true,
      //   type:'radio',
      //   dicData:[{
      //     label:'否',
      //     value:'0'
      //   },{
      //     label:'是',
      //     value:'1'
      //   }]
      // },
      {
        label: '审核意见',
        prop:'remark',
        span: 24,
        type:'textarea'
      }
    ]
  };
