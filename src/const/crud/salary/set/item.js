export const option = {
  align: 'center',
  border: true,
  index: true,
  indexLabel: '序号',
  searchMenuSpan: 4,
  menuWidth: 240,
  column: [{
      label: '编号',
      prop: 'bh',
      search: true,
      searchSpan: 7,
    },
    {
      label: '工资项名称',
      prop: 'gzxmc',
      search: true,
      searchLabelWidth: 120,
      searchSpan: 7,
    },
    {
      label: '项目分类',
      prop: 'xmfl',
      search: true,
      searchSpan: 7,
      searchslot: true,
      formslot: true,
    },
    {
      label: '增减项',
      prop: 'zjx',
      search: true,
      searchSpan: 7,
      searchslot: true,
      formslot: true,
      slot: true,
    },
    {
      label: '工资标准（元）',
      prop: 'gzbz',
    },
    {
      label: '使用状态',
      prop: 'syzt',
      search: true,
      searchSpan: 7,
      searchslot: true,
      formslot: true,
      slot: true,
    },
    {
      label: '描述',
      prop: 'ms',
      formslot: true,
    }
  ]
}
