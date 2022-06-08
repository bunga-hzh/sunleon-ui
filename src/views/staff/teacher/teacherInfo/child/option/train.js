const is_type = [{
  label: '是',
  value: "1",
}, {
  label: '否',
  value: "2",
}]

export const option = {
  align: 'center',
  border: true,
  menuWidth: 160,
  labelWidth: 140,
  addBtn: true,
  column: [
    // {
    //   label: "学习起始时间",
    //   prop: 'xxqssj',
    //   type: 'date',
    //   valueFormat: 'yyyy-MM-dd',
    // },
    // {
    //   label: "学习终止时间",
    //   prop: 'xxzzsj',
    //   type: 'date',
    //   valueFormat: 'yyyy-MM-dd',
    // },
    {
      label: "学习起止时间",
      prop: "xxqssj",
      type: "daterange",
      format: 'yyyy-MM-dd',
      valueFormat: 'yyyy-MM-dd',
      startPlaceholder: '学习起始时间',
      endPlaceholder: '学习终止时间',
      slot: true,
      width: 160,
      span: 24,
      rules: [{
        required: true,
        message: '请选择 学习起止时间'
      }]
    },
    {
      label: "培训班名称",
      prop: 'pxbmc',
      rules: [{
        required: true,
        message: '请输入 培训班名称',
        trigger: "blur",
      }]
    },
    {
      label: "培训学时",
      prop: 'pxxs',
      rules: [{
        required: true,
        message: '请输入 培训学时',
        trigger: "blur",
      }]
    },
    {
      label: "培训类别",
      prop: 'pxlb',
      rules: [{
        required: true,
        message: '请输入 培训类别',
        trigger: "blur",
      }]
    },
    {
      label: "主办单位",
      prop: 'zbdw',
      rules: [{
        required: true,
        message: '请输入 主办单位',
        trigger: "blur",
      }]
    },
    {
      label: "参加出国出境",
      prop: 'cjcgcj',
      rules: [{
        required: true,
        message: '请输入 参加出国出境',
        trigger: "blur",
      }]
    },
    {
      label: "是否学历学位晋升",
      prop: 'sfxlxwjs',
      type: "radio",
      props: {
        label: "label",
        value: 'value'
      },
      dicData: is_type,
      rules: [{
        required: true,
        message: '请选择 是否学历学位晋升',
        trigger: "change",
      }]
    },
  ]
}
