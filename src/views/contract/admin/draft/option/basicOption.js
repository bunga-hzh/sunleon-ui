export default {
  size:'small',
  gutter:80,
  labelWidth:120,
  submitBtn:false,
  emptyBtn:false,
  column: [
    {
      label: '合同名称',
      prop:'htmc',
      span:12,
      rules: [{
        required: true,
        message: "请输入",
        trigger: "blur"
      }],
    },
    {
      label: '招标编号',
      prop:'zbbh',
      span:12
    },
    {
      label: '采购方式',
      prop:'cgfs',
      span:12,
      rules: [{
        required: true,
        message: "请选择",
        trigger: "change"
      }],
      type:'select',
      dicUrl: '/admin/dict/type/purchase_type',
    },
    {
      label: '签订部门',
      prop:'qdbm',
      span:12,
      props: {
        label: 'name',
        value: 'id'
      },
      rules: [{
        required: true,
        message: "请选择",
        trigger: "change"
      }],
      filter:true,
      type: 'tree',
      dicUrl: '/act/jpGwgl/tree'
    },
    {
      label: '资金负责人',
      prop:'xfxmfzr',
      span:12,
      rules: [{
        required: true,
        message: "请选择",
        trigger: "change"
      }],
      remote: true,
      cascader:['zjly'],
      type:'tree',
      props:{
        label:'zjfzrName',
        value:'id'
      },
      dicMethod:'get',
      dicUrl:`/act/htGlJb/fzr`,
    },
    {
      label: '资金来源',
      prop:'zjly',
      rules: [{
        required: true,
        message: "请选择",
        trigger: "change"
      }],
      props:{
        label:'zjfzrName',
        value:'id'
      },
      span:12,
      filter:true,
      type: 'select',
      dicUrl: '/act/htGlZj/my/select?userId={{key}}',
    },
    {
      label: '签订日期',
      prop:'qdsj',
      type:'date',
      span:12
    },
    {
      label: '合同份数',
      prop:'htfs',
      rules: [{
        required: true,
        message: "请输入",
        trigger: "blur"
      }],
      type:'number',
      span:12
    },

  ]
}
