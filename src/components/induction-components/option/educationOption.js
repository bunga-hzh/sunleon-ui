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
            label: '学历',
            prop: "xl",
            type: "select",
            dicUrl: "/admin/dict/type/education_type",
            rules: [{
              required: true,
              message: "请选择学历",
              trigger: "change"
            }],
          },
          {
            label: '入学时间',
            prop: "rxsj",
            type:'date',
            format:'yyyy-MM-dd',
            valueFormat:'yyyy-MM-dd',
            rules: [{
              required: true,
              message: "请选择时间",
              trigger: "change"
            }],
          },
          {
            label: '学习形式',
            prop: "xxls",
            rules: [{
              required: true,
              message: "请输入学习形式",
              trigger: "blur"
            }],
          },
          {
            label: '学制',
            prop: "xz",
            rules: [{
              required: true,
              message: "请输入学制",
              trigger: "blur"
            }],
          },
          {
            label: '毕业时间',
            prop: "bysj",
            type:'date',
            format:'yyyy-MM-dd',
            valueFormat:'yyyy-MM-dd',
            rules: [{
              required: true,
              message: "请选择时间",
              trigger: "change"
            }],
          }
        ]
      }
    }
  ]
}
