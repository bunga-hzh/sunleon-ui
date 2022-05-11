export default {
  submitText: '完成',
  size:'medium',
  emptyBtn:false,
  column: [
    {
      label: "姓名",
      labelWidth: 180,
      prop: "userName",
      span: 12,
      maxlength: 6,
      minlength: 2,
      rules: [{
        required: true,
        message: "请输入姓名",
        trigger: "blur"
      }],
    },
    {
      label: "入职时间",
      prop: "rzsj",
      labelWidth: 180,
      type: 'datetimerange',
      format: 'yyyy-MM-dd',
      valueFormat: 'yyyy-MM-dd',
      span: 12,
      rules: [{
        required: true,
        message: "请选择时间",
        trigger: "blur"
      }],
    },
    {
      label: "合同起止时间",
      labelWidth: 180,
      prop: "htqzsj",
      type: 'datetimerange',
      format: 'yyyy-MM-dd',
      valueFormat: 'yyyy-MM-dd',
      span: 12,
      rules: [{
        required: true,
        message: "请选择时间",
        trigger: "blur"
      }],
    },
    {
      label: "试用起止时间",
      prop: "syqzsj",
      labelWidth: 180,
      type: 'datetimerange',
      format: 'yyyy-MM-dd',
      valueFormat: 'yyyy-MM-dd',
      span: 12,
      rules: [{
        required: true,
        message: "请选择时间",
        trigger: "blur"
      }],
    },
    {
      label: "见习起止时间",
      prop: "jxqzsj",
      labelWidth: 180,
      type: 'datetimerange',
      format: 'yyyy-MM-dd',
      valueFormat: 'yyyy-MM-dd',
      span: 12,
      rules: [{
        required: true,
        message: "请选择时间",
        trigger: "blur"
      }],
    }
  ]
}
