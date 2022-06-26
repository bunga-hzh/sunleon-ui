export default {
  size:'small',
  gutter:80,
  submitBtn:false,
  emptyBtn:false,
  labelWidth:140,
  column: [
    {
      label: '供应商名称',
      prop:'gysqc',
      span:12,
      rules: [{
        required: true,
        message: "请输入",
        trigger: "blur"
      }],
    },
    {
      label: '统一社会信用代码',
      prop:'tyshyxdm',
      span:12
    },
    {
      label: '供应商企业性质',
      prop:'gysqyxz',
      span:12,
      type: 'select',
      dicUrl: '/admin/dict/type/gysqyxz_type',
    },
    {
      label: '法人代表',
      prop:'frdb',
      span:12
    },
    {
      label: '联系人',
      prop:'lxr',
      span:12
    },
    {
      label: '联系方式',
      prop:'lxfs',
      span:12
    },
    {
      label: '联系地址',
      prop:'lxdz',
      span:12
    },
    {
      label: '电子邮箱',
      prop:'dzyx',
      span:12
    },
    {
      label: '开户行',
      prop:'khh',
      span:12
    },
    {
      label: '银行账号',
      prop:'yhzh',
      span:12
    },
  ]
}
