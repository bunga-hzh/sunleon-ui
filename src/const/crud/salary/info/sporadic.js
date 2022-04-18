export const option = {
  align: 'center',
  border: true,
  index: true,
  indexLabel: '序号',
  searchMenuSpan: 4,
  menuWidth: 160,
  labelWidth: 160,
  searchSpan: 6,
  column: [{
      label: '部门名称',
      prop: 'bmmc',
      search: true,
      type: 'select'
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
      label: '加班费、值班费等',
      prop: 'jbfzbfd',
      width: 120,
    },
    {
      label: '劳务费',
      prop: 'lwf',
    },
    {
      label: '各种津贴费',
      prop: 'gzjtf',
    },
    {
      label: '各种奖励费',
      prop: 'gzjlf',
    },
    {
      label: '课题费',
      prop: 'ktf',
    },
    {
      label: '高温费',
      prop: 'gwf',
    },
    {
      label: '饭贴',
      prop: 'ft',
    },
    {
      label: '一次性奖励',
      prop: 'ycxjl',
    },
    {
      label: '增发能级',
      prop: 'zfnj',
    },
    {
      label: '其他',
      prop: 'qt',
    },
    {
      label: '合计',
      prop: 'hj',
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
      label: '加班费、值班费等',
      prop: 'jbfzbfd',
      width: 120,
    },
    {
      label: '劳务费',
      prop: 'lwf',
    },
    {
      label: '各种津贴费',
      prop: 'gzjtf',
      width: 120,
    },
    {
      label: '各种奖励费',
      prop: 'gzjlf',
      width: 120,
    },
    {
      label: '课题费',
      prop: 'ktf',
    },
    {
      label: '高温费',
      prop: 'gwf',
    },
    {
      label: '饭贴',
      prop: 'ft',
    },
    {
      label: '一次性奖励',
      prop: 'ycxjl',
      width: 120,
    },
    {
      label: '增发能级',
      prop: 'zfnj',
    },
    {
      label: '其他',
      prop: 'qt',
    },
    {
      label: '合计',
      prop: 'hj',
    },
  ]
}
