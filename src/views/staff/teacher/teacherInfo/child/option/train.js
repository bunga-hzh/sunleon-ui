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
  column: [{
      label: "学习起始时间",
      prop: 'xxqssj',
      type: 'date',
      valueFormat: 'yyyy-MM-dd',
    },
    {
      label: "学习终止时间",
      prop: 'xxzzsj',
      type: 'date',
      valueFormat: 'yyyy-MM-dd',
    },
    {
      label: "培训班名称",
      prop: 'pxbmc',
    },
    {
      label: "培训学时",
      prop: 'pxxs',
    },
    {
      label: "培训类别",
      prop: 'pxlb',
    },
    {
      label: "主办单位",
      prop: 'zbdw',
    },
    {
      label: "参加出国出境",
      prop: 'cjcgcj',
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
    },
  ]
}
