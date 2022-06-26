export default {
  size:'small',
  gutter:80,
  submitBtn:false,
  emptyBtn:false,
  labelWidth:140,
  column: [
    {
      label: '合同编号',
      prop:'htbh',
      disabled:true,
      span:12
    },
    {
      label: '合同金额(元)',
      prop:'htje',
      rules: [{
        required: true,
        message: "请输入",
        trigger: "blur"
      }],
      span:12
    },
    {
      label: '是否质保金',
      prop: 'zbj',
      value:0,
      type: "radio",
      dicData:[{
        label: '否',
        value: 0
      }, {
        label: '是',
        value: 1
      }]
    },
    {
      label: '交付日期',
      prop:'jfrq',
      type:'date',
      span:12
    },
    {
      label: '签订地点',
      prop:'qddd',
      span:12
    },
    {
      label: '电话',
      prop:'dhhm',
      span:12
    },
    {
      label: '电子邮箱',
      prop:'dzyx',
      span:12
    },
    {
      label: '首付款项比例',
      prop:'sfkbl',
      span:12
    },
    {
      label: '首付款金额',
      type:'number',
      prop:'sfkje',
      span:12
    },
    {
      label: '国家质量标准号',
      prop:'gjzlbzh',
      span:12
    },
    {
      label: '保质期(月)',
      prop:'bzqy',
      span:12,
    },
    {
      label: '违约比例',
      prop:'wybl',
      span:12
    },
    {
      label: '违约金额',
      prop:'wyje',
      span:12,
    },
    {
      label: '乙方违约延迟天数',
      prop:'yfwyycts',
      span:12,
    },
    {
      label: '甲方违约延迟天数',
      prop:'jfwyycts',
      span:12,
    }
  ]
}
