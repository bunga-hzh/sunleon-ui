export const option = {
  align: 'center',
  border: true,
  index: true,
  indexLabel: '序号',
  searchMenuSpan: 4,
  menuWidth: 240,
  searchSpan: 7,
  addBtn: false,
  editBtn: false,
  delBtn: false,
  column: [{
      label: '月份',
      prop: 'yf',
      search: true,
      type: 'month',
    },
    {
      label: '表格名称',
      prop: 'bgmc',
      search: true,
    },
    {
      label: '生成时间',
      prop: 'scsj',
      type: 'date'
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
  menu: false,
  addBtn: false,
  columnBtn: false,
  column: [{
      label: '业务年度',
      prop: 'ywnd',
    },
    {
      label: '月份',
      prop: 'yf',
    },
    {
      label: '部门名称',
      prop: 'bmmc',
    },
    {
      label: '工号',
      prop: 'gh',
    },
    {
      label: '姓名',
      prop: 'xm',
    },
    {
      label: '身份证号',
      prop: 'sfzjh',
    },
    {
      label: '人员分类',
      prop: 'ryfl',
    },
    {
      label: '发放事由',
      prop: 'ffsy',
    },
    {
      label: '发放奖励',
      prop: 'ffjl',
    },
    {
      label: '发放金额',
      prop: 'ffje',
    },
    {
      label: '发放原因',
      prop: 'ffyy',
    },
    {
      label: '备注',
      prop: 'bz',
    },
  ]
}
