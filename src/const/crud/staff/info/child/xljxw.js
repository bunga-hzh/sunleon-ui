export const xljxwOption = {
  align: 'center',
  border: true,
  menuWidth: 160,
  column: [{
      label: "学历",
      prop: 'xlm',
    },
    {
      label: "入学时间",
      prop: 'rxsj',
      type: 'date',
      valueFormat: 'yyyy-MM-dd',
    },
    {
      label: "毕业时间",
      prop: 'bysj',
      type: 'date',
      valueFormat: 'yyyy-MM-dd',
      rules: [{
        required: true,
        message: "请输入毕业时间",
        trigger: "blur"
      }],
    },
    {
      label: "学校",
      prop: 'xx',
    },
    {
      label: "专业/系",
      prop: 'sxzym',
    },
    {
      label: "所获学位",
      prop: 'hdxwm',
    },
    {
      label: "学习形式",
      prop: 'xxxsm',
      props: {
        label: "label",
        value: 'value'
      },
      dicUrl: '/admin/dict/type/learning_from',
    },
    {
      label: "证明人",
      prop: 'zmr',
    },
    {
      label: "备注",
      prop: 'bz',
      type: 'textarea',
      span: 24,
    },
  ]
}
