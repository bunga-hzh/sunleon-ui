export const option = {
  align: 'center',
  border: true,
  index: true,
  indexLabel: '序号',
  searchMenuSpan: 4,
  menuWidth: 240,
  searchSpan: 6,
  addBtn: false,
  editBtn: false,
  delBtn: false,
  column: [{
      label: 'ID',
      prop: 'id',
      hide: true,
    },
    {
      label: '名称',
      prop: 'mc',
      search: true,
    },
    {
      label: '月份',
      prop: 'yf',
      search: true,
      type: 'month',
    },
    {
      label: '备注',
      prop: 'bz',
    }
  ]
}

export const optionChild = {
  align: 'center',
  border: true,
  index: true,
  indexLabel: '序号',
  searchMenuSpan: 8,
  menuWidth: 240,
  searchSpan: 8,
  column: [{
      label: '部门名称',
      prop: 'bmmc',
      search: true,
    },
    {
      label: '工号',
      prop: 'gh',
      search: true,
    },
    {
      label: '姓名',
      prop: 'xm',
      search: true,
    },
    {
      label: '身份证号',
      prop: 'sfzjh',
      search: true,
    },
    {
      label: '人员分类',
      prop: 'ryfl',
      search: true,
      type: 'select',
    },
  ]
}
