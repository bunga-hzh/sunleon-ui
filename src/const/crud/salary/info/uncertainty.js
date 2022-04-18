export const option = {
  align: 'center',
  border: true,
  index: true,
  indexLabel: '序号',
  searchMenuSpan: 4,
  menuWidth: 160,
  searchSpan: 7,
  column: [{
      label: '业务年度',
      prop: 'ywnd',
      search: 'true',
      type: 'year'
    },
    {
      label: '月份',
      prop: 'yf',
      search: 'true',
      type: 'month',
    },
    {
      label: '部门名称',
      prop: 'bmmc',
      search: true,
      type: 'select',
    },
    {
      label: '职工编码',
      prop: 'zgbh',
      search: true,
    },
    {
      label: '姓名',
      prop: 'xm',
      search: true,
    },
    {
      label: '证件号码',
      prop: 'zjhm',
      search: true,
    },
    {
      label: '发放事由',
      prop: 'ffsy',
      type: 'select',
      search: true,
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

export const reportDic = [{
    label: '按月统计',
    value: '1',
  },
  {
    label: '按年统计',
    value: '2',
  }
]

export const reportOption = {
  align: 'center',
  border: true,
  index: true,
  indexLabel: '序号',
  menu: false,
  addBtn: false,
  columnBtn: false,
  refreshBtn: false,
  searchBtn: false,
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
      label: '职工编码',
      prop: 'zgbh',
    },
    {
      label: '姓名',
      prop: 'xm',
    },
    {
      label: '证件号码',
      prop: 'zjhm',
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
