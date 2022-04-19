export const option = {
  align: 'center',
  border: true,
  index: true,
  indexLabel: '序号',
  searchMenuSpan: 4,
  addBtn: false,
  editBtn: false,
  delBtn: false,
  column: [{
      label: '编码',
      prop: 'bm',
      search: true,
    },
    {
      label: '类型名称',
      prop: 'lxmc',
      search: true,
    },
    {
      label: '发放时间',
      prop: 'ffsj',
    },
    {
      label: '描述',
      prop: 'ms',
    },
  ]
}

export const optionChild = {
  align: 'center',
  border: true,
  index: true,
  indexLabel: '序号',
  searchMenuSpan: 4,
  editBtn: false,
  delBtn: false,
  columnBtn: false,
  column: [{
      label: '工资项名称',
      prop: 'gzxmc',
    },
    {
      label: '工资项类型',
      prop: 'gzxlx',
    },
    {
      label: '描述',
      prop: 'ms',
    },
  ]
}
