export const option = {
  align: 'center',
  border: true,
  index: true,
  indexLabel: '序号',
  searchMenuSpan: 4,
  addBtn: false,
  column: [{
      label: '体系名称',
      prop: 'txmc',
      search: true,
    },
    {
      label: '适用岗位',
      prop: 'sygw',
      search: true,
      searchslot: true,
      formslot: true,
      slot: true,
    },
    {
      label: '使用状态',
      prop: 'syzt',
      search: true,
      searchslot: true,
      formslot: true,
      slot: true,
    },
    {
      label: '描述',
      prop: 'ms',
    },
  ]
}
export const childOption = {
  align: 'center',
  border: true,
  index: true,
  indexLabel: '序号',
  addBtn: false,
  menu: false,
  selection: true,
  column: [{
      label: '字段名称',
      prop: 'zdbh',
    },
    {
      label: '工资项名称',
      prop: 'gzxmc',
    },
    {
      label: '项目分类',
      prop: 'xmfl',
    },
    {
      label: '增减项',
      prop: 'zjx',
    },
    {
      label: '描述',
      prop: 'ms',
    },
  ]
}
