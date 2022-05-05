export const option = {
  align: 'center',
  border: true,
  index: true,
  indexLabel: '序号',
  searchMenuSpan: 4,
  labelWidth: 120,
  column: [{
      label: '姓名',
      prop: 'xm',
      search: true,
      editDisabled: true,
    },
    {
      label: '工号',
      prop: 'gh',
      search: true,
      addDisabled: true,
      editDisabled: true,
    },
    {
      label: '所属部门',
      prop: 'ssbm',
      search: true,
      type: 'select',
      addDisabled: true,
      editDisabled: true,
    },
    {
      label: '创建时间',
      prop: 'cjsj',
    },
  ]
}
